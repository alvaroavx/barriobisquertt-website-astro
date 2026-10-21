# Pruebas y validación

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.

No hay archivos test/spec, framework de pruebas, coverage ni CI versionado. npm run build valida esquemas de Content Collections y generación estática. npm run check (alias npm test) ejecuta el build y luego scripts/check-site.mjs sobre dist/: al menos 60 páginas, 404.html, robots.txt y sitemap.xml presentes, /auditoria ausente, y por cada HTML lang="es-CL", exactamente un h1, meta description, canonical en https://barriobisquertt.cl, og:title, og:image absoluta, Twitter Card, JSON-LD, sin localhost, enlaces internos y src/poster locales existentes, y tel: normalizados. Es un chequeo heurístico por regex; no prueba interacciones browser, enlaces externos ni despliegue.

| Área | Unit | Integración | E2E | Cobertura aparente |
|---|---|---|---|---|
| Migración CSV/HTML/activos | Sin evidencia | Sin evidencia | Sin evidencia | Débil |
| Esquemas y rutas | Sin evidencia | Build Astro + check-site | Sin evidencia | Parcial |
| SEO base y enlaces internos | Sin evidencia | check-site.mjs | Sin evidencia | Parcial |
| Contacto externo | Sin evidencia | Sin evidencia | Sin evidencia | Sin evidencia |
| Menú/lightbox | Sin evidencia | Sin evidencia | Sin evidencia | Débil |
| Seguridad de HTML | Sin evidencia | Sin evidencia | Sin evidencia | Débil |
| Visual/responsive | Capturas históricas | Sin prueba automática | Sin evidencia | Parcial manual |

No existe porcentaje de cobertura medido. Validaciones recomendadas antes de publicar: npm run check, revisión de rutas de dist, enlaces/activos, comportamiento del formulario según variable, teclado/menú/lightbox, contraste de contenido con fuente, HTML malicioso de fixture. No confundir capturas históricas con gate automático.

## Verificación de esta auditoría

El 2026-09-16 se ejecutó `npm run build`: terminó correctamente y Astro informó 61 páginas estáticas. También se verificaron enlaces relativos de la documentación y `git diff --check`. Esto confirma compilación local, no funcionamiento de terceros ni producción.

El 2026-10-21 se ejecutó `npm run check` (Node 22.22.1): build correcto con 61 rutas (60 páginas públicas + 404, más sitemap.xml) y check-site.mjs sin fallos. Menú, lightbox `<dialog>` y control de video no se probaron en navegador.
