# Seguridad: revisión estática

Última revisión documental: 2026-10-21. Estado: auditoría estática, no prueba de penetración.

No hay autenticación/autorización de aplicación, sesión, DB ni API propia. /auditoria fue retirada del artefacto público en 2026-10. No se detectaron credenciales funcionales en código revisado; URLs públicas de mapas/redes no son secretos. No se inspeccionó el servidor final ni las políticas del receptor de contacto. Severidades evalúan riesgo potencial en la configuración descrita, no incidentes comprobados.

| Severidad | Riesgo y evidencia | Impacto / probabilidad | Recomendación |
|---|---|---|---|
| ALTO | HTML de CSV se inserta mediante set:html en post, noticias, eventos y patrimonio; demoteBodyHeadings() solo cambia etiquetas h1, no sanitiza | Si fuente editorial se compromete, puede inyectar script/markup a visitantes; probabilidad dependiente del control editorial | Sanitizar en migración o build con política explícita y prueba de contenido malicioso |
| RESUELTO | /auditoria publicaba rutas de archivos fuente y manifiestos | Página eliminada; check-site.mjs impide su regreso | Mantener manifiestos fuera de páginas públicas |
| MEDIO | Contacto habilitado vía FormSubmit (HTTPS); el correo de destino aparece en el HTML hasta reemplazarlo por el alias de FormSubmit; antispam limitado a honeypot `_honey` (sin captcha en envío ajax) | Spam al buzón y exposición de la dirección; retención de datos según tercero | Activar y usar alias aleatorio; evaluar aviso de privacidad y captcha si aumenta el spam |
| MEDIO | URLs externas en contenido pueden alimentar href o imageSrc; isExternalUrl() detecta http(s) para target/rel, pero no valida esquemas permitidos del href | Enlace malicioso si fuente editorial alterada; probabilidad dependiente de edición | Validar URL/scheme en transformación y revisar salida |
| BAJO | No se observa CSP ni cabeceras de seguridad en repo; dependen del host | Defensa browser no demostrable | Documentar y verificar configuración de hosting |
| INFORMATIVO | npm lockfile presente, Astro 7 declarado; no se hizo auditoría de vulnerabilidades | Estado de CVEs actual no determinado | Ejecutar auditoría de dependencias en proceso controlado |

No hay SQL injection, command injection ni path traversal de solicitudes HTTP porque no hay handler propio. El script CLI trabaja con rutas locales y escribe bajo public/src; no ejecutar con fuentes no confiables sin revisar. No se encontraron uploads, serialización de peticiones, passwords o logs de PII. El email puede viajar al tercero; el destino no está configurado en repositorio.
