# Panorama funcional

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

| Módulo | Capacidad | Actor | Datos |
|---|---|---|---|
| Home | Noticias/eventos destacados, patrimonio, mapa | Visitante | noticias, eventos, patrimonio |
| Directorio | Índice y ficha con contacto, galería, video | Visitante | directorio |
| Blog | Índice y artículos | Visitante | historias |
| Noticias | Índice y artículos | Visitante | noticias |
| Eventos | Fichas con fecha/lugar y posible RSVP | Visitante | eventos |
| Patrimonio | Índice y artículos | Visitante | patrimonio |
| Categorías | Contenido relacionado | Visitante | categorias, noticias, historias, eventos |
| Auditoría | Conteos, rutas, estados de manifiesto | Cualquiera con URL | colecciones, manifiestos |
| Contacto | POST de email a receptor externo | Visitante | email |

No hay cuentas, pagos, alta en web ni aprobación runtime. Editor es actor inferido del repositorio, no rol implementado.

Reglas confirmadas: src/lib/site.ts fija orden editorial; Home toma primera noticia como destacada; getStaticPaths() genera detalles para toda entrada cargada, sin filtrar draft/archived. migrate-content.mjs aplica exclusiones antes del JSON. Categorías relaciona noticias/historias por igualdad de category con slug; eventos por coincidencia textual de location con nombre. No hay claves foráneas. source, validationStatus y canonicalGroup son metadatos, no estados de aprobación. Discrepancias históricas: DISCREPANCIAS_Y_DECISIONES.md.
