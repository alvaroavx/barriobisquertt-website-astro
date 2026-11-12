import { getCollection } from 'astro:content';
import { site } from '../lib/site';

export const prerender = true;

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character] || character);
}

export async function GET() {
  const collections = await Promise.all([
    getCollection('directorio'),
    getCollection('historias'),
    getCollection('noticias'),
    getCollection('eventos'),
    getCollection('patrimonio'),
    getCollection('categorias'),
  ]);
  const routes = new Set([
    '/',
    '/directorio',
    '/blog',
    '/noticias',
    '/patrimonio',
    ...collections.flat().map((entry) => entry.data.route),
  ]);
  const urls = [...routes]
    .sort()
    .map((route) => `  <url><loc>${escapeXml(new URL(route, site.url).toString())}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
