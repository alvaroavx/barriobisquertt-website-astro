# Interfaces HTTP

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.

No hay API REST/GraphQL/SOAP, websocket, webhook entrante ni handler servidor. Astro genera documentos GET estáticos en inventory/endpoints.md; no corresponde inventar JSON, códigos de aplicación o auth. Se genera dist/404.html (noindex), sitemap.xml y robots.txt; que el host sirva 404.html con estado 404 y las cabeceras dependen del host.

Pie envía POST a FormSubmit (PUBLIC_CONTACT_FORM_ENDPOINT; con JS usa la variante /ajax/ y respuesta JSON). Entrada: email requerido, `_subject`, `_template`, honeypot `_honey`. Sin auth; retención según FormSubmit (ver 08-integrations.md). /auditoria ya no se genera.

Slugs dinámicos salen de JSON, no de los 62 HTML del mirror. MAPA_RUTAS.md describe fuente histórica, no acredita redirects .html.
