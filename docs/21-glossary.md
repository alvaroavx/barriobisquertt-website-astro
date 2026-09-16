# Glosario

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

| Término | Significado | Evidencia |
|---|---|---|
| Mirror | Copia local HTML/activos del sitio Webflow original | data/descarga-barrio-bisquertt/, migrate-content.mjs |
| CSV CMS | Export tabular de colecciones Webflow | data/contents/, migrate-content.mjs |
| Content Collection | Conjunto JSON validado por Astro | src/content.config.ts |
| Slug | Segmento de URL/archivo por entrada | JSON, getStaticPaths() |
| route | URL pública guardada en entrada | baseCmsSchema, vistas |
| canonicalGroup | Agrupación editorial de duplicados; no redirección | site.ts/script/JSON |
| draft/archived | Indicadores heredados del CSV; no filtro runtime | baseCmsSchema, script, páginas |
| validationStatus | Estado de validación de fuente/activos al migrar | script y esquema |
| asset-map | Inventario generado de activos y rutas públicas | src/data/generated/asset-map.json |
| RSVP | Enlace externo opcional de evento | eventos schema/vista |
| SERCOTEC | Entidad citada en contenido y pie institucional; no integración técnica | Footer.astro |
