# Despliegue
```mermaid
flowchart LR
 Repo -->|npm ci y build inferidos| Astro
 Astro --> Dist["dist/"]
 Dist -->|publicación no versionada| Host["Host estático desconocido"]
 Host --> Browser
 Browser --> Terceros
```
No se confirma pipeline, TLS, CDN, rollback ni healthcheck.

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.
