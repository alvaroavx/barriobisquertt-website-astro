# Arquitectura implementada

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio. Confianza: alta.

Un paquete Astro de generación estática. astro.config.mjs no configura SSR/adaptador. No hay capas separadas de dominio, servicio o repositorio. Límites reales: fuente offline → transformación → colecciones validadas → páginas/componentes → artefacto estático.

data/ CSV+mirror → migrate:content → src/content/ + src/data/generated/ + public/assets/ → content.config.ts → getCollection/getStaticPaths → src/pages/ → BaseLayout/componentes/site.ts → dist/.

| Entrada | Salida | Nota |
|---|---|---|
| npm run migrate:content | JSON, manifiestos y activos | CLI manual; escribe, no participa en runtime |
| npm run build | dist/ | Valida esquemas y genera HTML |
| npm run dev/preview | Servidor Astro local | No prueba producción |
| Browser GET | Páginas estáticas | src/pages/ |
| Browser POST | Receptor externo | Solo con PUBLIC_CONTACT_FORM_ENDPOINT |

Páginas conocen colecciones y helpers; componentes reciben props o importan navegación/site; BaseLayout compone cabecera, pie y JS. No se encontraron DB, jobs, colas, cron, transacciones ni API propia.

Decisiones confirmadas: colecciones por tipo, procedencia, orden explícito, categorías duplicadas, formulario deshabilitado sin destino. Inferido: paridad con mirror Webflow/CSV. Implementado (2026-10): sitemap.xml (src/pages/sitemap.xml.ts), robots.txt (public/), 404.html y `site` en astro.config. Contradictorio: ARQUITECTURA_PROPUESTA.md propone además layouts especializados y redirects, ausentes; se conserva como diseño histórico. MAPA_RUTAS.md mapea mirror, no prueba redirecciones Astro. No determinado: host, CDN, TLS, cabeceras, backups. Ver diagrams/containers.md.
