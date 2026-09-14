# Documentación IA First — Barrio Bisquertt

Última revisión documental: 2026-09-14. Estado: reconstruido desde el repositorio; el código y los datos de contenido vigentes son la fuente final de verdad.

| Objetivo | Documentos y rutas |
|---|---|
| Comprender producto y contenido | [INVENTARIO_CONTENIDO](INVENTARIO_CONTENIDO.md) → [MAPA_RUTAS](MAPA_RUTAS.md) |
| Modificar arquitectura Astro | [ARQUITECTURA_PROPUESTA](ARQUITECTURA_PROPUESTA.md) → `src/content.config.ts` → `src/lib/site.ts` |
| Cambiar contenido o assets | [INFORME_FASE_1_FASE_2_INICIAL](INFORME_FASE_1_FASE_2_INICIAL.md) → [DISCREPANCIAS_Y_DECISIONES](DISCREPANCIAS_Y_DECISIONES.md) |
| Entender historia de migración | [PLAN_MIGRACION_ASTRO](PLAN_MIGRACION_ASTRO.md) |
| Trabajar como agente | [AGENTS.md](../AGENTS.md), esta guía y el documento específico afectado |

## Arquitectura efectiva

Sitio Astro estático de contenido. Las colecciones `directorio`, `historias`, `noticias`, `eventos`, `patrimonio` y `categorias` se validan en `src/content.config.ts`; páginas de índice y detalle usan `getCollection()` y `getStaticPaths()`. `src/lib/site.ts` concentra identidad, rutas de assets, orden editorial y helpers. `scripts/migrate-content.mjs` es la herramienta de importación/generación, no parte del runtime público.

No se encontró backend propio, base de datos, autenticación, API ni pruebas automatizadas. El formulario de pie solo se habilita cuando existe `PUBLIC_CONTACT_FORM_ENDPOINT`; sin esa variable el canal se declara deshabilitado. Google Maps, YouTube e Instagram son integraciones de cliente o embeds externos.

## Límites y riesgos

- `data/` se describe como fuente local no versionada: no se puede certificar reproducibilidad completa de una migración sin ella.
- `bodyHtml` y otros campos HTML vienen de contenido migrado; validar/sanitizar la fuente antes de publicar contenido nuevo.
- Las discrepancias editoriales, activos faltantes, descartes y cambios de ruta deben registrarse en `DISCREPANCIAS_Y_DECISIONES.md`; no resolverlos silenciosamente.
- Hosting, TLS, CSP, formularios reales, observabilidad y despliegue no están versionados.

## Validación declarada

Desde la raíz: `npm run build`. El resultado confirma compilación estática; no prueba enlaces externos, calidad editorial, analítica ni funcionamiento de un endpoint de contacto real.
