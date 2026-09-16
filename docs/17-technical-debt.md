# Registro de deuda técnica

Última revisión documental: 2026-09-16. Estado: auditoría estática. P0 inmediato, P1 importante, P2 recomendable, P3 oportunista; esfuerzo XS/S/M/L/XL.

| ID | Área | Problema y evidencia | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|---|---|
| TD-001 | Seguridad/contenido | bodyHtml/descriptionHtml llegan a set:html; demoteBodyHeadings solo reemplaza h1 (vistas de detalle, site.ts) | Alto | M | P1 |
| TD-002 | Pruebas | Sin suite ni script test; menú, lightbox, migración y contacto sin checks (package.json, src/components/SiteScripts.astro) | Alto | M | P1 |
| TD-003 | Publicación | /auditoria muestra rutas de fuente/manifiestos como página pública (src/pages/auditoria.astro) | Medio | S | P1 |
| TD-004 | Migración | Script único concentra parser, selección editorial, resolución/copia y escritura (migrate-content.mjs) | Medio | L | P2 |
| TD-005 | Consistencia | Migración escribe múltiples archivos sin staging atómico ni rollback | Medio | M | P2 |
| TD-006 | Editorial | Orden de todas las colecciones codificado manualmente en site.ts | Medio | S | P2 |
| TD-007 | Datos | category y location se relacionan por cadenas; no se validan referencias (categories/[slug].astro) | Medio | M | P2 |
| TD-008 | Contacto | Formulario habilitado depende de receptor externo sin respuesta/errores UI propios (Footer, SiteScripts) | Medio | M | P2 |
| TD-009 | Reutilización | Cuatro páginas de artículo repiten markup de medios/cuerpo; riesgo de divergencia | Bajo | M | P3 |
| TD-010 | SEO/rutas | canonical usa Astro.url.origin si falta site; redirects/sitemap/robots propuestos no implementados (BaseLayout, astro.config) | Medio | M | P2 |
| TD-011 | Observabilidad | Sin telemetría o diagnóstico de fallos browser/contacto (src/, package.json) | Medio | M | P2 |
| TD-012 | Operación | Sin pipeline, despliegue, rollback ni healthcheck versionado | Medio | M | P2 |
| TD-013 | Calidad editorial | Duplicados y draft publicado preservados en fuentes (DISCREPANCIAS_Y_DECISIONES.md; JSON) | Medio | M | P2 |

## Deudas prioritarias y consecuencias

**TD-001.** Contexto: el mirror/CSV conserva HTML rico; las vistas lo insertan sin saneamiento. Consecuencia: XSS si la cadena editorial se compromete. Propuesta: definir etiquetas/atributos aceptados, sanear al generar y probar fixtures; preservar apariencia y procedencia. Dependencia: decisión editorial sobre HTML permitido. Riesgo de modificar: pérdida de formato o embeds legítimos.

**TD-002.** Contexto: build confirma forma y compilación, no comportamiento. Consecuencia: cambios de ruta, interacción o migración pueden regresionar sin aviso. Propuesta: tests de transformación y navegación crítica. Dependencia: fixtures estables. Riesgo: snapshots frágiles si replican la implementación.

**TD-003.** Contexto: auditoría de migración existe como ruta Astro. Consecuencia: expone estructura interna y metadatos de fuentes si se publica dist completo. Propuesta: decisión explícita de publicación; separar diagnóstico de sitio público. Dependencia: necesidad real de auditoría. Riesgo: perder herramienta útil.

**TD-004/005.** Contexto: script recorre fuentes y escribe muchas salidas. Consecuencia: error tardío deja mezcla de estados; cambios editoriales pueden modificar muchos archivos. Propuesta: validación previa y salida temporal/atómica, con comparador. Dependencia: contrato de generación y fuentes. Riesgo: alterar resolución de activos/rutas existentes.

**TD-010/012.** Contexto: la arquitectura propuesta documenta SEO/deploy, pero no hay implementación/host verificado. Consecuencia: canonical y compatibilidad histórica dependen del entorno. Propuesta: acordar URL/host, probar salida, definir publicación/rollback. Dependencia: decisión de hosting. Riesgo: redirects o canonical erróneos.

## Hotspots de mantenimiento

migrate-content.mjs (reglas, filesystem, activos, múltiples colecciones; sin tests); site.ts (orden y URLs compartidos); BaseLayout.astro (metadatos en todas las páginas); categories/[slug].astro (unión textual); páginas con set:html (frontera de confianza). El historial reciente muestra cambios de presentación frecuentes, pero eso por sí solo no es deuda.

No se clasificó como deuda la ausencia de DB, backend o SSR: son adecuados para el alcance estático actual.
