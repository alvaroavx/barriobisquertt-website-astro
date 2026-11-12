# Manejo de errores

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

| Etapa | Manejo observado | Límite |
|---|---|---|
| Migración | main().catch registra error y exitCode 1; fs puede lanzar | Copias/escrituras previas pueden quedar parciales; sin rollback |
| Activos | resolveAsset clasifica resolved/missing/external/empty; manifiesto cuenta estados | No bloquea por todo asset missing; verificar salida |
| Esquema | Astro/Zod rechaza JSON incompatible en build | No valida calidad semántica ni sanitización HTML |
| Fechas | isoDate() devuelve null para inválidas | La vista puede omitir fecha sin diagnóstico editorial |
| Medio | imageSrc() devuelve null si no hay ruta/external; VideoEmbed requiere URL YouTube reconocida | Medio ausente se omite |
| Browser | SiteScripts evita envío si canal deshabilitado | POST habilitado es nativo: error/éxito del proveedor no se maneja |
| Ruta inexistente | Host estático responde según configuración | No hay página 404 propia ni handler global |

No hay excepciones HTTP del lado servidor, retry, timeout, transacción ni compensación propios. Errores del navegador/terceros carecen de telemetría versionada.
