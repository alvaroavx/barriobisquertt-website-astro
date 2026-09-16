# Guía operativa para agentes

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

Antes de modificar: leer README.md, AGENTS.md, docs/README.md, docs/02-architecture.md, docs/16-conventions.md, docs/17-technical-debt.md y documento del área. Usar este mapa para orientarse; verificar comportamiento sensible en código y salida actual.

| Necesidad | Ubicación |
|---|---|
| Rutas públicas | src/pages/, inventory/endpoints.md |
| Contenido y esquema | src/content/, src/content.config.ts |
| Fuente y decisiones | data/, docs/DISCREPANCIAS_Y_DECISIONES.md |
| Transformación | scripts/migrate-content.mjs |
| Orden, URLs, helpers | src/lib/site.ts |
| Navegación/contacto | src/data/navigation.ts, src/components/Footer.astro |
| UI/interacción | src/components/, src/layouts/, src/styles/ |
| Pruebas actuales | package.json → build; no suite propia |
| Autenticación/API/DB | No existen en app actual |

Invariantes verificadas: toda página de detalle procede de su colección mediante getStaticPaths(); cambiar campos exige revisar esquema, script y JSON; el formulario debe permanecer deshabilitado cuando falta endpoint; duplicados/rutas históricas no deben resolverse sin registrar decisión; no exponer valores sensibles. Áreas delicadas: set:html, script de migración, /auditoria, BaseLayout canonical, orden editorial y relaciones textuales de categoría.

Checklist: [ ] identificar módulo [ ] revisar fuente y JSON [ ] revisar esquema/ruta/medios [ ] revisar exposición y seguridad [ ] revisar integraciones [ ] verificar build y salida [ ] registrar discrepancia/decisión [ ] actualizar docs. Si se añade backend o DB en futuro, actualizar este mapa; no inferir su existencia por la tarea recibida.
