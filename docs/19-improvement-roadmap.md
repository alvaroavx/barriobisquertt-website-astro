# Roadmap propuesto, sin implementación

Última revisión documental: 2026-09-16. Estado: recomendación basada en auditoría.

| Horizonte | Problema → objetivo/beneficio | Complejidad | Riesgo | Precondición |
|---|---|---|---|---|
| Quick win | Aclarar si /auditoria debe publicarse → controlar metadatos | S | Bajo/medio | Dueño de producto |
| Quick win | Definir URL base de producción → canonical verificable | S | Bajo | Host/dominio confirmado |
| Corto | Añadir checks de rutas/activos y pruebas de interacciones → reducir regresiones | M | Bajo | Fixtures/criterios |
| Corto | Definir HTML permitido y sanear contenido → reducir XSS | M | Medio | Auditoría de markup legítimo |
| Corto | Contrato de contacto/privacidad/antispam → habilitar canal confiable | M | Medio | Proveedor y política |
| Mediano | Hacer migración validada y atómica → evitar salidas parciales | L | Medio | Snapshot de referencia |
| Mediano | Resolver duplicados/categorías/SEO → rutas coherentes | M | Medio | Decisiones editoriales registradas |
| Mediano | Pipeline de publicación, rollback y monitoreo → operación repetible | M | Medio | Hosting definido |
| Largo | Revisar modelo editorial si crece volumen/cambio → reducir orden manual | L | Medio | Necesidad real demostrada |

No hay evidencia que justifique reescritura, DB o backend nuevo. Priorizar cambios incrementales.
