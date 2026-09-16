# Barrio Bisquertt

Sitio público estático de Barrio Bisquertt, construido con Astro 7. Publica directorio de comercios, historias, noticias, eventos, patrimonio y categorías para visitantes, vecinos y organizaciones. Las páginas se generan desde JSON validado en src/content.config.ts; no hay backend propio, base de datos, cuentas ni API de aplicación.

## Arquitectura breve

data/ contiene el mirror Webflow, CSV y evidencia visual originales. scripts/migrate-content.mjs transforma esas fuentes a src/content/, src/data/generated/ y public/assets/. src/pages/ compone páginas con componentes Astro y src/lib/site.ts fija identidad, medios y orden editorial. La migración escribe archivos y no forma parte del runtime público. El formulario del pie permanece deshabilitado si no se configura PUBLIC_CONTACT_FORM_ENDPOINT; si se configura, el navegador envía email directamente al receptor externo.

## Inicio rápido

Requiere Node/npm compatibles con Astro 7; el repositorio no fija versión de Node. Según package.json y lockfile:

- npm ci
- npm run dev
- npm run build
- npm run preview

npm run migrate:content regenera contenido y activos desde data/; ejecútelo solo tras revisar el contrato y compare el diff. No se requiere base de datos. No hay script de tests propio ni despliegue versionado.

## Documentación

[docs/README.md](docs/README.md) es el índice IA First: producto, arquitectura, datos, rutas, integraciones, seguridad, operación, deuda, riesgos y guía para agentes. [docs/DISCREPANCIAS_Y_DECISIONES.md](docs/DISCREPANCIAS_Y_DECISIONES.md) conserva conflictos y decisiones editoriales; [docs/MAPA_RUTAS.md](docs/MAPA_RUTAS.md) describe el mirror histórico, no las rutas garantizadas por Astro.

## Estado conocido

La réplica base funciona como sitio estático. Hosting, TLS, endpoint real de contacto y monitoreo productivo no están determinados desde este repositorio. La ruta /auditoria se genera públicamente y muestra metadatos de migración. Los cuerpos HTML migrados se insertan en páginas de detalle; revisar su procedencia antes de publicar cambios. El código y el build son la fuente final de verdad para cualquier modificación.
