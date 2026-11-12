# AGENTS.md

## Propósito del repositorio
Sitio público estático Astro de Barrio Bisquertt; seis colecciones editoriales. Sin backend, DB, autenticación ni API propia.

## Antes de trabajar
Leer README.md, docs/README.md, docs/02-architecture.md, docs/16-conventions.md, docs/17-technical-debt.md, docs/MAPA_RUTAS.md, docs/DISCREPANCIAS_Y_DECISIONES.md y documentación específica del área. Verificar el comportamiento sensible en código, esquema y build; la documentación orienta, no sustituye esa revisión.

## Arquitectura y directorios
data/ es fuente (mirror, CSV, PDFs y capturas). scripts/migrate-content.mjs transforma hacia src/content/, src/data/generated/ y public/assets/. src/content.config.ts define esquemas; src/pages/ genera rutas; src/components/ y src/layouts/ componen interfaz; src/lib/site.ts concentra orden/helpers; src/data/navigation.ts define menú/contacto. docs/ es documentación oficial.

## Reglas e invariantes
- Mantener páginas públicas estáticas salvo decisión arquitectónica explícita. No inventar backend/API/roles.
- Revisar fuente, script, JSON, esquema y consumidor antes de cambiar un campo o ruta. Las páginas de detalle se generan para las entradas existentes; draft/archived no se filtran en runtime.
- Sin PUBLIC_CONTACT_FORM_ENDPOINT el formulario debe declarar el canal deshabilitado.
- Preservar procedencia y registrar correcciones editoriales, descartes, rutas, redirecciones y activos no resueltos en docs/DISCREPANCIAS_Y_DECISIONES.md. No resolver duplicados silenciosamente.
- HTML editorial se inserta con set:html; tratar cambios de contenido como frontera de seguridad. No exponer secretos ni colocar credenciales en variables PUBLIC_.
- /auditoria fue retirada del artefacto público (scripts/check-site.mjs falla si reaparece). Los manifiestos de src/data/generated/ son trazabilidad interna; no publicarlos sin decisión explícita.
- BaseLayout emite canonical, Open Graph, Twitter Card y JSON-LD con astro.config `site`; sitemap.xml se genera desde las colecciones y robots.txt vive en public/.

## Testing, datos e integraciones
Validación mínima de cambios funcionales: npm run check (build + scripts/check-site.mjs: un h1, metadatos SEO, enlaces internos, recursos locales, sitemap/robots/404) y revisión de las rutas/medios afectados. No hay suite unitaria ni E2E. No hay DB ni migraciones SQL; npm run migrate:content escribe múltiples archivos y exige revisar diff. Google Maps, YouTube, Instagram y receptor opcional de contacto son dependencias externas de browser; verificar su contrato antes de modificarlos.

## Documentación y restricciones
Todo Markdown generado o mantenido por agentes vive en docs/, salvo README.md y AGENTS.md. Actualizar documentos afectados cuando cambie arquitectura, rutas, contenido, datos, activos, scripts, comandos, validaciones o decisiones. No asumir comportamiento por nombres o por docs históricas; verificar código y tests disponibles. No cambiar interfaces públicas sin analizar consumidores ni introducir patrones nuevos sin decisión explícita. Instrucciones locales AGENTS.md solo si existen y aplican al módulo.
