# Interfaces HTTP

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

No hay API REST/GraphQL/SOAP, websocket, webhook entrante ni handler servidor. Astro genera documentos GET estáticos en inventory/endpoints.md; no corresponde inventar JSON, códigos de aplicación o auth. 404 y cabeceras dependen del host.

Pie puede iniciar POST a PUBLIC_CONTACT_FORM_ENDPOINT. Entrada: email requerido por HTML. Respuesta, auth, CORS, retención y efectos del tercero: no determinados. /auditoria es GET público generado por src/pages/auditoria.astro pese a no figurar en navegación.

Slugs dinámicos salen de JSON, no de los 62 HTML del mirror. MAPA_RUTAS.md describe fuente histórica, no acredita redirects .html.
