# Integraciones

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.

| Sistema | Propósito | Protocolo/responsable | Configuración | Límite |
|---|---|---|---|---|
| Google Maps | mapa Home | iframe browser, MapEmbed.astro | URL fija en site.ts | timeout/retry ajenos |
| YouTube | hero/videos | enlaces/iframe browser, VideoEmbed.astro | URL contenido/Home | disponibilidad externa |
| Instagram | perfil/contenido | enlaces browser, site.ts/vistas | URL/handles | sin API/token |
| Contacto | recibir email del visitante | FormSubmit: fetch a https://formsubmit.co/ajax/<destino> desde SiteScripts.astro (POST HTML normal sin JS) | PUBLIC_CONTACT_FORM_ENDPOINT en .env.production → barriobisquerttrengo@gmail.com | requiere activación única por correo; sin auth; retención/privacidad según FormSubmit |
| Mirror Webflow/CSV | fuente offline | filesystem, migrate-content.mjs | data/ | sin llamada runtime |

Contrato FormSubmit usado: campos `email`, `_subject`, `_template=table` y honeypot `_honey`; respuesta JSON `{ success: "true" | "false", message }`. Mientras el destino no esté activado, FormSubmit responde success false y el pie muestra el mensaje de error. Tras activar, reemplazar el correo del endpoint por el alias aleatorio que entrega FormSubmit para no exponer la dirección en el HTML.

No se encontraron SMTP, OAuth, pagos, analítica, Sentry, storage cloud o colas. Menciones editoriales a instituciones no son integraciones. Ver inventory/integrations.md.
