# Convenciones observadas

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

## Observadas
- Astro file routing en src/pages/: index.astro para listados, [slug].astro para detalles. getStaticPaths() carga colección completa.
- JSON por slug bajo src/content/<colección>/; esquema central en src/content.config.ts. Campos comunes conservan procedencia y validación.
- Componentes compartidos en src/components/; BaseLayout para todas las páginas principales excepto /auditoria.
- Nombres de datos en inglés (bodyHtml, mainImage); etiquetas y contenido públicos en español. CSS global en src/styles/.
- Enlaces internos desde entry.data.route; orden editorial en site.ts; navegación y formulario en navigation.ts.
- Historial reciente usa mensajes Conventional Commit, pero no se halló política obligatoria.

## Inconsistencias
- docs/ARQUITECTURA_PROPUESTA.md y MAPA_RUTAS.md pueden leerse erróneamente como vigentes. Esta guía y 02-architecture.md fijan frontera.
- Las vistas de detalle repiten composición; algunas fechas/textos provienen literalmente de CSV.
- category para noticias/historias y location para eventos usan criterios distintos en categories/[slug].astro.

## Recomendadas a futuro, no implementadas
Mantener procedencia por entrada, explicitar decisiones editoriales, verificar ruta generada y actualizar docs/ tras cada cambio de contrato. No introducir nuevas capas abstractas sin necesidad observada.
