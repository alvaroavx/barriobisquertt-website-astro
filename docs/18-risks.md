# Riesgos operativos y de producto

Última revisión documental: 2026-09-16. Estado: evaluación desde repositorio, no incidente confirmado.

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| RISK-001 | Fuente HTML editorial contaminada llega al browser | No determinada | Alto | Control editorial, sanitización y fixture de seguridad |
| RISK-002 | Host público sirve /auditoria con procedencia interna | Media si dist completo | Medio | Decidir publicación y revisar artefacto |
| RISK-003 | Receptor externo de contacto trata email sin contrato documentado | No determinada | Medio | Validar proveedor, privacidad, antispam y UX antes de habilitar |
| RISK-004 | Falta evidencia de deploy/rollback/healthcheck | Media | Medio | Versionar proceso y responsables |
| RISK-005 | Cambios de fuente/migración dejan salida parcial | Media | Medio | Validación previa y comparación de artefactos |
| RISK-006 | YouTube/Maps/Instagram no disponibles o bloqueados | Media | Bajo/medio | Diseño alternativo y revisión de privacidad |
| RISK-007 | Duplicados editoriales afectan navegación/SEO | Confirmada existencia | Medio | Definir canonicals/redirecciones con aprobación |
| RISK-008 | Sin pruebas ni métricas, regresión puede descubrirse tarde | Media | Medio | Gates de build, enlaces e interacciones |

Deuda es una condición actual controlable; riesgo es un evento futuro y su consecuencia. Probabilidades son cualitativas, no estadísticas.
