# Integraciones
| Sistema | Código | Datos/protocolo | Auth y errores |
|---|---|---|---|
| Google Maps | MapEmbed.astro/site.ts | iframe browser | terceros |
| YouTube | VideoEmbed.astro/Home | enlace/iframe | terceros |
| Instagram | Footer/vistas/site.ts | enlaces | terceros |
| Contacto | Footer.astro/navigation.ts/SiteScripts.astro/.env.production | FormSubmit, POST JSON (ajax) o HTML | sin auth; activación por correo; mensajes de envío/éxito/error en el pie |
| Webflow CSV/mirror | migrate-content.mjs/data/ | lectura filesystem offline | no aplica |

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.
