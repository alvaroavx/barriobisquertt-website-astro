# Preguntas abiertas

Última revisión documental: 2026-09-16. Estado: incertidumbres explícitas.

| ID | Pregunta y por qué importa | Información encontrada / falta | Quién podría responder |
|---|---|---|---|
| Q-001 | ¿Cuál es host/dominio productivo? Canonical y deploy dependen de ello | astro.config sin site; falta configuración host | Operación/producto |
| Q-002 | ¿Debe publicarse /auditoria? Expone procedencia | Ruta Astro y noindex; no hay control de acceso | Producto/seguridad |
| Q-003 | ¿Quién recibe email y bajo qué política? Privacidad/antispam | Variable pública opcional; receptor no versionado | Producto/proveedor |
| Q-004 | ¿Existen CI, staging, rollback y monitoreo externos? | Nada versionado | DevOps/operación |
| Q-005 | ¿Qué rutas duplicadas tendrán canonical/redirección? SEO | Discrepancias registradas; ambas rutas accesibles | Editorial/SEO |
| Q-006 | ¿Qué HTML editorial se considera permitido? Sanitización | set:html sin política de etiquetas | Editorial/seguridad |
| Q-007 | ¿Son actuales los datos y capturas de data/? | Fuente local y manifiesto generado; fecha de vigencia no certificada | Editorial |
| Q-008 | ¿Quién consume /auditoria o los raw generados? | Ruta pública; no se halló consumidor automatizado | Equipo del sitio |
