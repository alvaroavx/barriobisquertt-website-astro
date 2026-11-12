# Desarrollo local

Última revisión documental: 2026-10-21. Estado: comandos inferidos de package.json; la verificación ejecutada consta en 12-testing.md.

Requisitos: Node >= 22.12.0 (.nvmrc y engines), dependencias de package-lock.json; para migrar, fuentes locales en data/. No DB, Redis, cola ni servicio backend. Instalación reproducible sugerida por lockfile: npm ci. Comandos declarados: npm run dev (servidor 0.0.0.0), npm run build (dist/), npm run check / npm test (build + scripts/check-site.mjs), npm run preview (sirve build) y npm run migrate:content (reescribe JSON/manifiestos/activos).

Flujo editorial seguro: localizar entrada en src/content/<colección>/ y su source.csv/source.html; revisar DISCREPANCIAS_Y_DECISIONES.md; editar según decisión; comprobar esquema; ejecutar npm run check; verificar ruta, imagen, enlaces y HTML. Si cambia la fuente o regla de transformación, revisar script y salida generada juntas. No ejecutar migración como simple consulta: copia/escribe cientos de archivos. El formulario local queda inactivo sin PUBLIC_CONTACT_FORM_ENDPOINT.

Troubleshooting: fallo de esquema → src/content.config.ts y JSON indicado; imagen vacía → asset-map.json y imageSrc(); ruta ausente → getStaticPaths y slug del JSON; discrepancia visual → capturas en docs/capturas/fase-3 y mirror en data/. Las operaciones de hosting y receptor externo no están documentadas.
