# Datos lógicos
```mermaid
erDiagram
 CATEGORIA {
  string slug
  string name
 }
 NOTICIA {
  string slug
  string category
 }
 HISTORIA {
  string slug
  string category
 }
 EVENTO {
  string slug
  string location
 }
 DIRECTORIO {
  string slug
  string name
 }
 PATRIMONIO {
  string slug
  string title
 }
 CATEGORIA o|..o{ NOTICIA : "category igual slug"
 CATEGORIA o|..o{ HISTORIA : "category igual slug"
```
Relaciones textuales, sin FK. Evento se asocia en la vista por coincidencia de location; no es relación formal.

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.
