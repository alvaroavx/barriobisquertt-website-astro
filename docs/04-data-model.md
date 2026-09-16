# Modelo de datos de archivos

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio. Confianza: alta.

No hay DB, tablas, PK SQL, ORM, índices, migraciones ni transacciones. Astro carga JSON bajo src/content/ con Zod en src/content.config.ts. Cada archivo es entrada; id, slug y route son campos. No se vio unicidad propia explícita. Relaciones de categoría son texto.

| Colección (archivos) | Campos distintivos | Relación |
|---|---|---|
| directorio (20) | name,address,description,phone,link,medios | Historias pueden mencionarlo, sin FK |
| historias (16) | title,excerpt,bodyHtml,category,instagram,medios | category comparada con slug |
| noticias (7) | title,description,bodyHtml,category,authors,instagram,link,medios | authors texto; autores demo descartados |
| eventos (5) | title,startsAt,endsAt,location,descriptionHtml,rsvpLink,medios | fechas string; relación por location |
| patrimonio (2) | title,bodyHtml,category,instagram,medios | artículos |
| categorias (5) | name,color,bannerImage | sustentabilidad y sustentabilidad-2 |

Campos comunes: id,slug,collectionId,itemId,archived,draft,createdOn,updatedOn,publishedOn,route,source{csv,html},canonicalGroup,validationStatus,validationNotes. Medio: mainImage{original,resolved,publicPath,status}, gallery[], video. status acepta resolved/missing/external/empty; validationStatus valid/warning/missing-assets/missing-html. Fechas son strings nullable, sin validación temporal de esquema.

Manifiesto versionado: 55 entradas, 10 descartes, 473 activos resueltos, 0 faltantes, 1 advertencia. Snapshot, no monitoreo continuo. Manifiestos son derivados. Ver inventory/data-entities.md y diagrams/data-model.md.
