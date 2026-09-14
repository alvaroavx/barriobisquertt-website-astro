# Instrucciones del proyecto

## Antes de modificar

Lee `README.md`, `docs/README.md`, `docs/MAPA_RUTAS.md`, `docs/DISCREPANCIAS_Y_DECISIONES.md` y el documento del área. Para código, revisa `src/content.config.ts`, `src/lib/site.ts` y la página o componente afectado antes de asumir comportamiento.

## Límites implementados

- Las páginas públicas son estáticas; no inventar backend, autenticación o API.
- `scripts/migrate-content.mjs` transforma fuentes hacia `src/content/` y `src/data/generated/`; revisar ambos lados antes de alterar el contrato.
- El contacto depende de `PUBLIC_CONTACT_FORM_ENDPOINT`; si no existe, el pie declara el canal deshabilitado.

## Documentacion oficial

- `data/` es la fuente de informacion consumida para reconstruir el sitio: mirror, CSV, pantallazos, PDFs y activos originales.
- `docs/` es la carpeta oficial para documentar el sitio, la arquitectura, decisiones, inventarios, rutas, discrepancias, planes e informes de trabajo.
- Todo archivo Markdown generado o mantenido por agentes debe vivir en `docs/`, excepto `README.md` y `AGENTS.md`.
- La documentacion debe mantenerse sincronizada con el codigo. Cada cambio que altere arquitectura, rutas, contenido, datos, assets, scripts, comandos, validaciones o decisiones tecnicas debe actualizar tambien los documentos afectados en `docs/`.
- No documentar decisiones silenciosas: si hay una correccion editorial, descarte de contenido, cambio de ruta, redireccion, asset no resuelto o discrepancia entre fuentes, registrar el hecho en la documentacion correspondiente.
