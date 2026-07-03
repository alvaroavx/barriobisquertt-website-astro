import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'data');
const mirrorRoot = path.join(
  sourceRoot,
  'descarga-barrio-bisquertt',
  'barrio-bisquertt-mirror',
);
const contentsRoot = path.join(sourceRoot, 'contents');
const publicMirrorRoot = path.join(
  root,
  'public',
  'assets',
  'barrio-bisquertt',
  'mirror',
);
const generatedRoot = path.join(root, 'src', 'data', 'generated');
const contentRoot = path.join(root, 'src', 'content');

const assetExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
  '.ico',
  '.mp4',
  '.webm',
  '.otf',
  '.ttf',
  '.woff',
  '.woff2',
]);

const csvFiles = {
  authors: 'Barrio Bisquertt - Authors - 69172c960e54b69c53ea0427.csv',
  historias: 'Barrio Bisquertt - Blog Posts - 6925dd0d77c0e42bcdb6b5c9.csv',
  categorias: 'Barrio Bisquertt - Categories - 69172c960e54b69c53ea0428.csv',
  directorio: 'Barrio Bisquertt - Directorios - 6924aecd136ab7a582d99a90.csv',
  eventos: 'Barrio Bisquertt - Eventos - 69174cede1985cb20a757f61.csv',
  noticias: 'Barrio Bisquertt - Noticias - 69172c960e54b69c53ea0429.csv',
  patrimonio: 'Barrio Bisquertt - Patrimonios - 6925e43555b58e030615dd1b.csv',
};

const publicCategorySlugs = new Set([
  'barrio-bisquertt',
  'cultura',
  'cursos',
  'sustentabilidad',
  'sustentabilidad-2',
]);

const skippedCategorySlugs = new Set([
  'anfitriones-bisquertt',
  'fiesta',
  'nature',
  'photography',
  'relaxation',
  'travel',
  'vacation',
]);

const canonicalGroupsByRoute = new Map([
  ['/', 'home'],
  ['/?57c7d2a2_page=1', 'home'],
  ['/?57c7d2a2_page=2', 'home'],
  ['/categories/sustentabilidad', 'categoria-sustentabilidad'],
  ['/categories/sustentabilidad-2', 'categoria-sustentabilidad'],
  [
    '/noticias/una-apuesta-a-futuro-economia-circular-y-servicios-sustentables',
    'noticia-economia-circular',
  ],
  [
    '/noticias/una-apuesta-a-futuro-economia-circular-y-servicios-sustentables-2',
    'noticia-economia-circular',
  ],
  [
    '/noticias/nace-barrio-bisquertt-una-experiencia-excepcional-en-rengo',
    'nace-barrio-bisquertt',
  ],
  [
    '/post/nace-barrio-bisquertt-una-experiencia-excepcional-en-rengo-80e1e',
    'nace-barrio-bisquertt',
  ],
]);

const htmlByCollection = {
  directorio: (slug) => `directorio/${slug}.html`,
  historias: (slug) => `post/${slug}.html`,
  noticias: (slug) => `noticias/${slug}.html`,
  eventos: (slug) => `eventos/${slug}.html`,
  patrimonio: (slug) => `patrimonio/${slug}.html`,
  categorias: (slug) => `categories/${slug}.html`,
};

const routeByCollection = {
  directorio: (slug) => `/directorio/${slug}`,
  historias: (slug) => `/post/${slug}`,
  noticias: (slug) => `/noticias/${slug}`,
  eventos: (slug) => `/eventos/${slug}`,
  patrimonio: (slug) => `/patrimonio/${slug}`,
  categorias: (slug) => `/categories/${slug}`,
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(value);
      value = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(value);
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      value = '';
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  const headers = rows.shift() || [];
  return rows.map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index] || ''])),
  );
}

async function readCsv(name) {
  const csvPath = path.join(contentsRoot, csvFiles[name]);
  const text = await fs.readFile(csvPath, 'utf8');
  return {
    source: path.relative(root, csvPath),
    rows: parseCsv(text.replace(/^\uFEFF/, '')),
  };
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function publicPathForMirrorRel(relativePath) {
  return `/assets/barrio-bisquertt/mirror/${relativePath}`;
}

function normalizeFileKey(value) {
  return value
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function decodeRepeated(value) {
  let current = value;
  for (let i = 0; i < 3; i += 1) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) break;
      current = decoded;
    } catch {
      break;
    }
  }
  return current;
}

function assetType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.ico'].includes(ext)) return 'image';
  if (['.mp4', '.webm'].includes(ext)) return 'video';
  if (['.otf', '.ttf', '.woff', '.woff2'].includes(ext)) return 'font';
  return 'asset';
}

function isAssetRef(value) {
  const clean = value.split(/[?#]/)[0];
  return assetExtensions.has(path.extname(clean).toLowerCase());
}

function routeFromHtmlRel(relativePath) {
  if (relativePath === 'index.html') return '/';
  if (relativePath.startsWith('index.html?')) {
    return `/?${relativePath.slice('index.html?'.length).replace(/\.html$/, '')}`;
  }
  return `/${relativePath.replace(/\.html$/, '')}`;
}

function boolValue(value) {
  return String(value).toLowerCase() === 'true';
}

function textOrNull(value) {
  const normalized = String(value || '').trim();
  return normalized.length > 0 ? normalized : null;
}

function splitMultimedia(value) {
  return String(value || '')
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);
}

function safeFileName(slug) {
  return `${slug}.json`;
}

function sourceHtmlFor(collection, slug) {
  const relative = htmlByCollection[collection](slug);
  return relative;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeJson(filePath, data) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function addUsedBy(assetRecord, route) {
  if (route && !assetRecord.usedBy.includes(route)) {
    assetRecord.usedBy.push(route);
  }
}

async function main() {
  const mirrorFiles = await walk(mirrorRoot);
  const localAssets = mirrorFiles
    .map((fullPath) => {
      const relative = toPosix(path.relative(mirrorRoot, fullPath));
      return { fullPath, relative, ext: path.extname(fullPath).toLowerCase() };
    })
    .filter((file) => assetExtensions.has(file.ext));

  const byRelative = new Map();
  const byBasename = new Map();
  const assetRecords = new Map();

  for (const asset of localAssets) {
    const publicPath = publicPathForMirrorRel(asset.relative);
    const record = {
      id: asset.relative,
      type: assetType(asset.relative),
      original: asset.relative,
      mirrorPath: toPosix(path.relative(root, asset.fullPath)),
      publicPath,
      status: 'resolved',
      usedBy: [],
    };
    assetRecords.set(asset.relative, record);
    byRelative.set(normalizeFileKey(asset.relative), asset.relative);
    byRelative.set(normalizeFileKey(decodeRepeated(asset.relative)), asset.relative);
    const base = path.posix.basename(asset.relative);
    const decodedBase = path.posix.basename(decodeRepeated(asset.relative));
    for (const key of new Set([base, decodedBase])) {
      const normalized = normalizeFileKey(key);
      if (!byBasename.has(normalized)) byBasename.set(normalized, []);
      byBasename.get(normalized).push(asset.relative);
    }

    const target = path.join(publicMirrorRoot, asset.relative);
    await ensureDir(path.dirname(target));
    await fs.copyFile(asset.fullPath, target);
  }

  function resolveAsset(original, route = null, htmlRelative = null) {
    const raw = String(original || '').trim();
    if (!raw) {
      return {
        original: raw,
        resolved: null,
        publicPath: null,
        status: 'empty',
      };
    }

    let resolvedRelative = null;
    const isExternal = /^https?:\/\//i.test(raw);

    if (!isExternal && htmlRelative) {
      const baseDir = path.posix.dirname(htmlRelative);
      const normalized = path.posix.normalize(path.posix.join(baseDir, raw.split(/[?#]/)[0]));
      const candidates = [normalized, decodeRepeated(normalized)].map(normalizeFileKey);
      for (const candidate of candidates) {
        if (byRelative.has(candidate)) {
          resolvedRelative = byRelative.get(candidate);
          break;
        }
      }
    }

    if (!resolvedRelative) {
      const withoutQuery = raw.split(/[?#]/)[0];
      const basename = path.posix.basename(decodeRepeated(withoutQuery));
      const matches = byBasename.get(normalizeFileKey(basename)) || [];
      if (matches.length === 1) {
        resolvedRelative = matches[0];
      } else if (matches.length > 1) {
        resolvedRelative = matches.find((item) => item.includes('/69172c960e54b69c53ea0443/')) || matches[0];
      }
    }

    if (resolvedRelative) {
      const record = assetRecords.get(resolvedRelative);
      addUsedBy(record, route);
      return {
        original: raw,
        resolved: record.mirrorPath,
        publicPath: record.publicPath,
        status: 'resolved',
      };
    }

    const id = `unresolved:${raw}`;
    if (!assetRecords.has(id)) {
      assetRecords.set(id, {
        id,
        type: isAssetRef(raw) ? assetType(raw.split(/[?#]/)[0]) : 'external',
        original: raw,
        mirrorPath: null,
        publicPath: null,
        status: isExternal ? 'external' : 'missing',
        usedBy: [],
      });
    }
    addUsedBy(assetRecords.get(id), route);

    return {
      original: raw,
      resolved: null,
      publicPath: null,
      status: isExternal ? 'external' : 'missing',
    };
  }

  const htmlFiles = mirrorFiles
    .filter((file) => file.endsWith('.html'))
    .map((fullPath) => toPosix(path.relative(mirrorRoot, fullPath)))
    .sort();

  const routes = [];
  const htmlAssetRefPattern =
    /(?:src|href|poster)=["']([^"']+)["']|url\((?:"([^"]+)"|'([^']+)'|([^)]+))\)/gi;

  for (const htmlRelative of htmlFiles) {
    const route = routeFromHtmlRel(htmlRelative);
    const htmlFullPath = path.join(mirrorRoot, htmlRelative);
    const html = await fs.readFile(htmlFullPath, 'utf8');
    const expectedAssets = [];
    let match;
    while ((match = htmlAssetRefPattern.exec(html))) {
      const value = match[1] || match[2] || match[3] || match[4] || '';
      const clean = value.trim().replace(/^['"]|['"]$/g, '');
      if (!isAssetRef(clean)) continue;
      const resolved = resolveAsset(clean, route, htmlRelative);
      expectedAssets.push(resolved);
    }
    routes.push({
      route,
      sourceHtml: toPosix(path.relative(root, htmlFullPath)),
      expectedAssets: expectedAssets.length,
      resolvedAssets: expectedAssets.filter((asset) => asset.status === 'resolved').length,
      canonicalGroup: canonicalGroupsByRoute.get(route) || null,
    });
  }

  const csvData = {};
  for (const key of Object.keys(csvFiles)) {
    csvData[key] = await readCsv(key);
    await writeJson(
      path.join(generatedRoot, 'raw', `${key}.json`),
      {
        source: csvData[key].source,
        rows: csvData[key].rows,
      },
    );
  }

  const skippedItems = [];
  const contentItems = [];

  function baseEntry(collection, row, slug, route, htmlRelative, csvSource) {
    const sourceHtmlPath = htmlRelative ? toPosix(path.relative(root, path.join(mirrorRoot, htmlRelative))) : null;
    const notes = [];
    if (boolValue(row.Draft) && sourceHtmlPath) notes.push('CSV draft=true but HTML is public in mirror');
    if (!sourceHtmlPath) notes.push('No public HTML source');
    return {
      id: row['Item ID'] || slug,
      slug,
      collectionId: textOrNull(row['Collection ID']),
      itemId: textOrNull(row['Item ID']),
      archived: boolValue(row.Archived),
      draft: boolValue(row.Draft),
      createdOn: textOrNull(row['Created On']),
      updatedOn: textOrNull(row['Updated On']),
      publishedOn: textOrNull(row['Published On']),
      route,
      source: {
        csv: csvSource,
        html: sourceHtmlPath,
      },
      canonicalGroup: canonicalGroupsByRoute.get(route) || null,
      validationNotes: notes,
    };
  }

  function finalizeEntry(entry, assets) {
    const missingAssets = assets.filter((asset) => asset.status === 'missing');
    if (!entry.source.html) entry.validationStatus = 'missing-html';
    else if (missingAssets.length > 0) entry.validationStatus = 'missing-assets';
    else if (entry.validationNotes.length > 0) entry.validationStatus = 'warning';
    else entry.validationStatus = 'valid';
    return entry;
  }

  async function writeContent(collection, slug, entry) {
    await writeJson(path.join(contentRoot, collection, safeFileName(slug)), entry);
  }

  function manifestItem(collection, entry, title, assets, video) {
    return {
      collection,
      slug: entry.slug,
      title,
      route: entry.route,
      sourceHtml: entry.source.html,
      sourceCsv: entry.source.csv,
      expectedImages: assets.filter((asset) => asset.original).map((asset) => asset.original),
      resolvedImages: assets.filter((asset) => asset.status === 'resolved').map((asset) => asset.publicPath),
      video,
      canonicalGroup: entry.canonicalGroup,
      validationStatus: entry.validationStatus,
      validationNotes: entry.validationNotes,
    };
  }

  for (const row of csvData.directorio.rows) {
    const slug = row.Slug;
    const route = routeByCollection.directorio(slug);
    const htmlRelative = sourceHtmlFor('directorio', slug);
    const mainImage = resolveAsset(row.Imagen, route, htmlRelative);
    const gallery = splitMultimedia(row.Multimedia).map((item) => resolveAsset(item, route, htmlRelative));
    const assets = [mainImage, ...gallery];
    const entry = finalizeEntry(
      {
        ...baseEntry('directorio', row, slug, route, htmlRelative, csvData.directorio.source),
        name: row.Name,
        address: textOrNull(row['Dirección']),
        description: textOrNull(row['Descripción']),
        phone: textOrNull(row['Teléfono']),
        link: textOrNull(row.Link),
        mainImage,
        gallery,
        video: textOrNull(row.Video),
      },
      assets,
    );
    await writeContent('directorio', slug, entry);
    contentItems.push(manifestItem('directorio', entry, entry.name, assets, entry.video));
  }

  for (const row of csvData.historias.rows) {
    const slug = row.Slug;
    const route = routeByCollection.historias(slug);
    const htmlRelative = sourceHtmlFor('historias', slug);
    const mainImage = resolveAsset(row['Main Image'], route, htmlRelative);
    const gallery = splitMultimedia(row.Multimedia).map((item) => resolveAsset(item, route, htmlRelative));
    const assets = [mainImage, ...gallery];
    const entry = finalizeEntry(
      {
        ...baseEntry('historias', row, slug, route, htmlRelative, csvData.historias.source),
        title: row.Name,
        excerpt: textOrNull(row['Breve Descripción']),
        bodyHtml: textOrNull(row['Post Body']),
        category: textOrNull(row.Categoria),
        instagram: textOrNull(row.Instagram),
        mainImage,
        gallery,
        video: textOrNull(row['Video link']),
      },
      assets,
    );
    await writeContent('historias', slug, entry);
    contentItems.push(manifestItem('historias', entry, entry.title, assets, entry.video));
  }

  for (const row of csvData.noticias.rows) {
    const slug = row.Slug;
    if (slug === 'through-the-mist') {
      skippedItems.push({
        collection: 'noticias',
        slug,
        title: row.Name,
        reason: 'Decision aprobada: CSV draft y sin HTML publico en mirror',
        sourceCsv: csvData.noticias.source,
      });
      continue;
    }
    const route = routeByCollection.noticias(slug);
    const htmlRelative = sourceHtmlFor('noticias', slug);
    const mainImage = resolveAsset(row['Main Image'], route, htmlRelative);
    const gallery = splitMultimedia(row.Multimedia).map((item) => resolveAsset(item, route, htmlRelative));
    const assets = [mainImage, ...gallery];
    const entry = finalizeEntry(
      {
        ...baseEntry('noticias', row, slug, route, htmlRelative, csvData.noticias.source),
        title: row.Name,
        description: textOrNull(row['Descripción']),
        bodyHtml: textOrNull(row.Texto),
        category: textOrNull(row.Categoria),
        authors: textOrNull(row.Autores),
        instagram: textOrNull(row.Instagram),
        link: textOrNull(row.Link),
        mainImage,
        gallery,
        video: textOrNull(row.Video),
      },
      assets,
    );
    await writeContent('noticias', slug, entry);
    contentItems.push(manifestItem('noticias', entry, entry.title, assets, entry.video));
  }

  for (const row of csvData.eventos.rows) {
    const slug = row.Slug;
    const route = routeByCollection.eventos(slug);
    const htmlRelative = sourceHtmlFor('eventos', slug);
    const mainImage = resolveAsset(row.Image, route, htmlRelative);
    const assets = [mainImage];
    const entry = finalizeEntry(
      {
        ...baseEntry('eventos', row, slug, route, htmlRelative, csvData.eventos.source),
        title: row.Name,
        startsAt: textOrNull(row['Fecha comienzo']),
        endsAt: textOrNull(row['Fecha termino']),
        location: textOrNull(row['Locación']),
        descriptionHtml: textOrNull(row['Descripción']),
        rsvpLink: textOrNull(row['RSVP Link']),
        mainImage,
        gallery: [],
        video: textOrNull(row.Video),
      },
      assets,
    );
    await writeContent('eventos', slug, entry);
    contentItems.push(manifestItem('eventos', entry, entry.title, assets, entry.video));
  }

  for (const row of csvData.patrimonio.rows) {
    const slug = row.slug;
    const route = routeByCollection.patrimonio(slug);
    const htmlRelative = sourceHtmlFor('patrimonio', slug);
    const mainImage = resolveAsset(row.Imagen, route, htmlRelative);
    const gallery = splitMultimedia(row.Multimedia).map((item) => resolveAsset(item, route, htmlRelative));
    const assets = [mainImage, ...gallery];
    const entry = finalizeEntry(
      {
        ...baseEntry('patrimonio', row, slug, route, htmlRelative, csvData.patrimonio.source),
        title: row.Nombre,
        bodyHtml: textOrNull(row.Body),
        category: textOrNull(row.Categoria),
        instagram: textOrNull(row['Instagram link']),
        mainImage,
        gallery,
        video: textOrNull(row['Video link']),
      },
      assets,
    );
    await writeContent('patrimonio', slug, entry);
    contentItems.push(manifestItem('patrimonio', entry, entry.title, assets, entry.video));
  }

  for (const row of csvData.categorias.rows) {
    const slug = row.Slug;
    if (skippedCategorySlugs.has(slug) || !publicCategorySlugs.has(slug)) {
      skippedItems.push({
        collection: 'categorias',
        slug,
        title: row.Name,
        reason: 'Decision aprobada: categoria solo CSV/demo sin HTML publico',
        sourceCsv: csvData.categorias.source,
      });
      continue;
    }
    const route = routeByCollection.categorias(slug);
    const htmlRelative = sourceHtmlFor('categorias', slug);
    const bannerImage = resolveAsset(row['Banner Image'], route, htmlRelative);
    const assets = [bannerImage];
    const entry = finalizeEntry(
      {
        ...baseEntry('categorias', row, slug, route, htmlRelative, csvData.categorias.source),
        name: row.Name,
        color: textOrNull(row.Color),
        bannerImage,
      },
      assets,
    );
    await writeContent('categorias', slug, entry);
    contentItems.push(manifestItem('categorias', entry, entry.name, assets, null));
  }

  for (const row of csvData.authors.rows) {
    skippedItems.push({
      collection: 'authors',
      slug: row.Slug,
      title: row.Name,
      reason: 'Decision aprobada: autores demo no se publican',
      sourceCsv: csvData.authors.source,
    });
  }

  const assetMap = [...assetRecords.values()].sort((a, b) => a.id.localeCompare(b.id));
  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceRoot: toPosix(path.relative(root, sourceRoot)),
    sourcePriority: {
      publicExistenceRouteOrderVisibleContent: 'mirror HTML',
      cmsStructureAndStructuredFields: 'CSV',
      visibleAssets: 'HTML references resolved against local files',
      artDirection: 'FASE 6 only',
      conflicts: 'DISCREPANCIAS_Y_DECISIONES.md',
    },
    routes,
    contentItems,
    skippedItems,
    totals: {
      routes: routes.length,
      contentItems: contentItems.length,
      skippedItems: skippedItems.length,
      assets: assetMap.length,
      resolvedAssets: assetMap.filter((asset) => asset.status === 'resolved').length,
      unresolvedAssets: assetMap.filter((asset) => asset.status === 'missing').length,
      externalAssets: assetMap.filter((asset) => asset.status === 'external').length,
    },
  };

  await writeJson(path.join(generatedRoot, 'asset-map.json'), assetMap);
  await writeJson(path.join(generatedRoot, 'content-manifest.json'), manifest);

  console.log(
    JSON.stringify(
      {
        contentItems: manifest.totals.contentItems,
        skippedItems: manifest.totals.skippedItems,
        routes: manifest.totals.routes,
        assets: manifest.totals.assets,
        unresolvedAssets: manifest.totals.unresolvedAssets,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
