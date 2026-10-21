import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const origin = 'https://barriobisquertt.cl';
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function localTargetExists(url) {
  const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
  const relative = pathname.replace(/^\/+/, '');
  if (!relative) return fs.existsSync(path.join(root, 'index.html'));
  return fs.existsSync(path.join(root, relative)) || fs.existsSync(path.join(root, relative, 'index.html'));
}

assert(fs.existsSync(root), 'dist/ no existe; ejecuta npm run build antes del chequeo.');

if (fs.existsSync(root)) {
  const files = walk(root);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const publicPages = htmlFiles.filter((file) => path.basename(file) !== '404.html');

  assert(publicPages.length >= 60, `Se esperaban al menos 60 páginas públicas; se encontraron ${publicPages.length}.`);
  assert(fs.existsSync(path.join(root, '404.html')), 'Falta dist/404.html.');
  assert(fs.existsSync(path.join(root, 'robots.txt')), 'Falta dist/robots.txt.');
  assert(fs.existsSync(path.join(root, 'sitemap.xml')), 'Falta dist/sitemap.xml.');
  assert(!fs.existsSync(path.join(root, 'auditoria', 'index.html')), 'La ruta técnica /auditoria sigue publicada.');

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const route = `/${path.relative(root, file).replaceAll(path.sep, '/')}`;
    assert(!html.includes('http://localhost'), `${route}: contiene una URL localhost.`);
    assert(/<html[^>]+lang="es-CL"/i.test(html), `${route}: falta lang="es-CL".`);
    assert((html.match(/<h1\b/gi) || []).length === 1, `${route}: debe contener exactamente un h1.`);
    assert(/<meta name="description" content="[^"]+"/i.test(html), `${route}: falta meta description.`);
    assert(/<link rel="canonical" href="https:\/\/barriobisquertt\.cl\//i.test(html), `${route}: canonical inválido.`);
    assert(/<meta property="og:title" content="[^"]+"/i.test(html), `${route}: falta og:title.`);
    assert(/<meta property="og:image" content="https:\/\//i.test(html), `${route}: og:image no es absoluta.`);
    assert(/<meta name="twitter:card" content="summary_large_image"/i.test(html), `${route}: falta Twitter Card.`);
    assert(/application\/ld\+json/i.test(html), `${route}: falta JSON-LD.`);

    for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
      const href = match[1];
      if (href.startsWith('//') || href.startsWith('/assets/') || href.startsWith('/fonts/')) continue;
      assert(localTargetExists(href), `${route}: enlace interno sin destino ${href}.`);
    }

    for (const match of html.matchAll(/(?:src|poster)="(\/[^"]+)"/g)) {
      assert(localTargetExists(match[1]), `${route}: recurso local inexistente ${match[1]}.`);
    }

    for (const match of html.matchAll(/href="(tel:[^"]+)"/g)) {
      assert(/^tel:\+?\d+$/.test(match[1]), `${route}: teléfono inválido ${match[1]}.`);
    }
  }

  const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
  assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), 'robots.txt no declara el sitemap canónico.');
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes(`<loc>${origin}/</loc>`), 'sitemap.xml no incluye la portada canónica.');
  assert(!sitemap.includes('/404'), 'sitemap.xml no debe incluir la página 404.');
}

if (failures.length) {
  console.error(`Chequeo del sitio falló con ${failures.length} problema(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Chequeo del sitio correcto: rutas, SEO base, enlaces y recursos locales validados.');
