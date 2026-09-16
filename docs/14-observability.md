# Observabilidad

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

Confirmado: migrate-content.mjs escribe conteos a stdout y errores a stderr con exitCode 1; /auditoria muestra conteos/estados del manifiesto generado. Estos datos son de build/snapshot, no métricas runtime. No se encontraron logs estructurados del sitio, trazas, correlation IDs, Sentry, Prometheus, analytics, healthcheck o auditoría de acciones de usuario.

Un fallo de build deja error en la consola de quien lo ejecutó. Un error de navegación, recurso externo, formulario o host en producción no tiene diagnóstico propio versionado; dependería de browser, proveedor y logs del hosting, no determinados. El formulario no muestra confirmación ni error del receptor.
