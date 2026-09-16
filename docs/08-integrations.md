# Integraciones

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

| Sistema | Propósito | Protocolo/responsable | Configuración | Límite |
|---|---|---|---|---|
| Google Maps | mapa Home | iframe browser, MapEmbed.astro | URL fija en site.ts | timeout/retry ajenos |
| YouTube | hero/videos | enlaces/iframe browser, VideoEmbed.astro | URL contenido/Home | disponibilidad externa |
| Instagram | perfil/contenido | enlaces browser, site.ts/vistas | URL/handles | sin API/token |
| Contacto | recibir email | POST HTML browser, Footer.astro | PUBLIC_CONTACT_FORM_ENDPOINT | receptor/auth/errores/retención no determinados |
| Mirror Webflow/CSV | fuente offline | filesystem, migrate-content.mjs | data/ | sin llamada runtime |

No se encontraron SMTP, OAuth, pagos, analítica, Sentry, storage cloud o colas. Menciones editoriales a instituciones no son integraciones. Ver inventory/integrations.md.
