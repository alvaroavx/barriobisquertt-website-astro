# Componentes y fronteras

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

| Ubicación | Entrada → responsabilidad → salida | Dependencias/datos | Riesgo |
|---|---|---|---|
| scripts/migrate-content.mjs | CSV/HTML → decisiones y activos → JSON/manifiestos | fs/path, todas las colecciones | Alto: sobrescribe generados |
| src/content.config.ts | JSON → validación Zod → colecciones | Astro | Medio: contrato build |
| src/lib/site.ts | datos/URLs → identidad, orden y helpers → vistas | páginas/componentes | Medio: orden manual |
| src/pages/ | colecciones → índices/detalles/Home/auditoría → HTML | getCollection, componentes | Medio: HTML editorial |
| src/layouts/BaseLayout.astro | props → HTML, canonical, metadatos | Header/Footer/SiteScripts/CSS | Medio: origen canonical |
| src/components/Header/Footer/ContentCard.astro | config/props → interfaz | navigation.ts, site.ts | Medio: POST externo |
| src/components/Gallery/VideoEmbed/MapEmbed.astro | medios → galería/iframes | URLs externas | Medio: privacidad/disponibilidad |
| src/components/SiteScripts.astro | DOM → menú/lightbox/guarda formulario | atributos data-* | Medio: sin tests |
| src/styles/ | tokens/fuentes → presentación | public/fonts | Bajo |
| src/data/generated/ | migración → trazabilidad | leído por /auditoria | Medio: exposición |

/auditoria sí se expone por src/pages/auditoria.astro aunque no figure en navegación. src/data/generated/raw/ es evidencia de migración; no se halló consumo runtime, sin concluir que sea prescindible.

Ruta: src/pages/; esquema: src/content.config.ts; transformación: migrate-content.mjs; contenido: data/ y src/content/; navegación/contacto: navigation.ts; orden/helpers: site.ts; diseño: src/styles/. Revisar ambos lados del contrato al cambiar un campo.
