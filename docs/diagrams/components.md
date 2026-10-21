# Componentes
```mermaid
flowchart TD
 P["src/pages/"] --> C["Content Collections"]
 C --> Z["content.config.ts"]
 C --> J["src/content/"]
 P --> L["BaseLayout"]
 P --> U["site.ts"]
 P --> K["Components"]
 L --> H["Header"]
 L --> F["Footer"]
 L --> S["SiteScripts"]
 F --> N["navigation.ts"]
```
Todas las páginas, incluida 404, usan BaseLayout. /auditoria fue retirada en 2026-10.

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.
