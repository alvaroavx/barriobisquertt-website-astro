# Interfaces HTTP

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.

No hay API REST/GraphQL/SOAP, websocket, webhook entrante ni handler servidor. Astro genera documentos GET estáticos en inventory/endpoints.md; no corresponde inventar JSON, códigos de aplicación o auth. Se genera dist/404.html (noindex), sitemap.xml y robots.txt; que el host sirva 404.html con estado 404 y las cabeceras dependen del host.

Pie puede iniciar POST a PUBLIC_CONTACT_FORM_ENDPOINT. Entrada: email requerido por HTML. Respuesta, auth, CORS, retención y efectos del tercero: no determinados. /auditoria ya no se genera.

Slugs dinámicos salen de JSON, no de los 62 HTML del mirror. MAPA_RUTAS.md describe fuente histórica, no acredita redirects .html.
