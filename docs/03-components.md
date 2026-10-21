# Componentes y fronteras

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.

| Ubicación | Entrada → responsabilidad → salida | Dependencias/datos | Riesgo |
|---|---|---|---|
| scripts/migrate-content.mjs | CSV/HTML → decisiones y activos → JSON/manifiestos | fs/path, todas las colecciones | Alto: sobrescribe generados |
| src/content.config.ts | JSON → validación Zod → colecciones | Astro | Medio: contrato build |
| src/lib/site.ts | datos/URLs → identidad, orden y helpers → vistas | páginas/componentes | Medio: orden manual |
| src/pages/ | colecciones → índices/detalles/Home/404/sitemap.xml → HTML/XML | getCollection, componentes | Medio: HTML editorial |
| src/layouts/BaseLayout.astro | props → HTML, canonical, OG/Twitter, JSON-LD, skip-link, noIndex | Header/Footer/SiteScripts/CSS | Medio: metadatos en todas las páginas |
| src/components/Header/Footer/ContentCard.astro | config/props → interfaz | navigation.ts, site.ts | Medio: POST externo |
| src/components/Gallery/VideoEmbed/MapEmbed.astro | medios → galería/iframes | URLs externas | Medio: privacidad/disponibilidad |
| src/components/SiteScripts.astro | DOM → menú/lightbox (`<dialog>`)/video ambiental/guarda formulario | atributos data-* | Medio: sin tests de interacción |
| src/styles/ | tokens/fuentes → presentación | public/fonts | Bajo |
| src/data/generated/ | migración → trazabilidad | sin consumidor runtime tras retirar /auditoria | Bajo |
| scripts/check-site.mjs | dist/ → aserciones de SEO, h1, enlaces y recursos | npm run check | Bajo: heurístico por regex |

/auditoria (src/pages/auditoria.astro) fue eliminada en 2026-10; check-site.mjs falla si vuelve a generarse. src/data/generated/raw/ es evidencia de migración; no se halló consumo runtime, sin concluir que sea prescindible.

Ruta: src/pages/; esquema: src/content.config.ts; transformación: migrate-content.mjs; contenido: data/ y src/content/; navegación/contacto: navigation.ts; orden/helpers: site.ts; diseño: src/styles/. Revisar ambos lados del contrato al cambiar un campo.
