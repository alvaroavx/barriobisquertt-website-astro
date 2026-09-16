# Actores y permisos

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

No hay autenticación, sesión, JWT, guards, roles backend ni panel. Las rutas generadas son públicas si host las sirve. Editor designa persona con acceso externo a Git/archivos, no rol de aplicación.

| Acción | Visitante | Editor de repositorio | Control |
|---|---|---|---|
| Leer páginas, medios y /auditoria | Sí | Sí | Ninguno en Astro |
| Enviar email | Con endpoint | Igual | disabled sin variable; receptor decide |
| Cambiar JSON | No en web | Según permisos externos | Git/filesystem |
| Migrar/publicar | No en web | Según acceso | No determinado |

Que /auditoria no figure en navigationItems no la protege. Autorización, antispam y retención del receptor: no determinados.
