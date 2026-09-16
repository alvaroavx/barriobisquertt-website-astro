# Pruebas y validación

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

No se encontró script test, archivos test/spec propios, framework de pruebas, coverage ni CI versionado. npm run build valida esquemas de Content Collections y generación estática; es una comprobación útil, pero no prueba interacciones browser, enlaces externos ni despliegue.

| Área | Unit | Integración | E2E | Cobertura aparente |
|---|---|---|---|---|
| Migración CSV/HTML/activos | Sin evidencia | Sin evidencia | Sin evidencia | Débil |
| Esquemas y rutas | Sin evidencia | Build Astro | Sin evidencia | Parcial |
| Contacto externo | Sin evidencia | Sin evidencia | Sin evidencia | Sin evidencia |
| Menú/lightbox | Sin evidencia | Sin evidencia | Sin evidencia | Débil |
| Seguridad de HTML | Sin evidencia | Sin evidencia | Sin evidencia | Débil |
| Visual/responsive | Capturas históricas | Sin prueba automática | Sin evidencia | Parcial manual |

No existe porcentaje de cobertura medido. Validaciones recomendadas antes de publicar: build, revisión de rutas de dist, enlaces/activos, comportamiento del formulario según variable, teclado/menú/lightbox, contraste de contenido con fuente, HTML malicioso de fixture. No confundir capturas históricas con gate automático.

## Verificación de esta auditoría

El 2026-09-16 se ejecutó `npm run build`: terminó correctamente y Astro informó 61 páginas estáticas. También se verificaron enlaces relativos de la documentación y `git diff --check`. Esto confirma compilación local, no funcionamiento de terceros ni producción.
