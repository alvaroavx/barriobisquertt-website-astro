# Actores y permisos

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.

No hay autenticación, sesión, JWT, guards, roles backend ni panel. Las rutas generadas son públicas si host las sirve. Editor designa persona con acceso externo a Git/archivos, no rol de aplicación.

| Acción | Visitante | Editor de repositorio | Control |
|---|---|---|---|
| Leer páginas y medios | Sí | Sí | Ninguno en Astro |
| Enviar email | Con endpoint | Igual | disabled sin variable; receptor decide |
| Cambiar JSON | No en web | Según permisos externos | Git/filesystem |
| Migrar/publicar | No en web | Según acceso | No determinado |

/auditoria ya no se genera. Autorización, antispam y retención del receptor: no determinados.
