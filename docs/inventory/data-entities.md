# Entidades de contenido
| Entidad | JSON | Campos distintivos |
|---|---:|---|
| Directorio | 20 | name,address,phone,link,medios |
| Historia | 16 | title,excerpt,bodyHtml,category |
| Noticia | 7 | title,bodyHtml,authors,category |
| Evento | 5 | title,startsAt,endsAt,location,rsvpLink |
| Patrimonio | 2 | title,bodyHtml,category |
| Categoría | 5 | name,color,bannerImage |
Todas: id,slug,route,source,draft,archived,timestamps,canonicalGroup,validationStatus. Sin DB, PK/FK SQL, índices o transacciones. Ver 04-data-model.md.

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.
