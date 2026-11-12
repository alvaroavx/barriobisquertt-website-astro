# Resumen ejecutivo

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio. Confianza: alta para implementación local.

| Campo | Estado |
|---|---|
| Nombre | Barrio Bisquertt |
| Tipo | Sitio público estático de contenido |
| Propósito | Difundir comercios, historias, noticias, eventos y patrimonio en Rengo |
| Usuarios | Visitantes; editores con acceso a archivos (inferido, sin rol web) |
| Stack | Astro 7, TypeScript/JavaScript, componentes Astro, CSS, JSON |
| Base de datos | Ninguna; Content Collections sobre JSON |
| Arquitectura | Generación estática durante build, un paquete Node |
| Estado aparente | Réplica base implementada; producción no determinada |
| Documentación previa | Amplia sobre migración; parcial sobre implementación |
| Deuda aparente | Media: HTML migrado, validación y operación |

Confirmado por package.json, astro.config.mjs, src/content.config.ts y src/pages/: seis colecciones generan HTML estático; no se encontró backend propio, autenticación ni API programática. Contenido actual: 20 comercios, 16 historias, 7 noticias, 5 eventos, 2 artículos patrimoniales y 5 categorías. Home reúne noticias, eventos, patrimonio y mapa. /auditoria expone metadatos de migración. El pie requiere receptor externo para contacto.

## Estado de salud

| Dimensión | Estado | Evidencia/límite |
|---|---|---|
| Arquitectura | Aceptable | Flujo simple; script de migración concentra decisiones |
| Mantenibilidad | Aceptable | Rutas legibles; detalles repetidos y orden manual |
| Tests | Débil | No se encontró suite ni script test |
| Seguridad | Débil | HTML editorial con set:html; receptor no conocido |
| Observabilidad | Débil | Consola CLI y auditoría estática; sin telemetría |
| Documentación | Aceptable | Fuentes previas extensas; mapa actual agregado |
| Deploy | No determinado | Build/preview sí; pipeline/destino no |
| Datos | Aceptable | Zod valida forma, sin relaciones formales |

## En 5 minutos

El visitante recibe páginas preconstruidas. Datos en src/content/, esquemas en src/content.config.ts, rutas en src/pages/, orden y helpers en src/lib/site.ts. scripts/migrate-content.mjs transforma CSV/HTML de data/ en JSON y activos. Antes de editar, rastrear source.csv/source.html, revisar DISCREPANCIAS_Y_DECISIONES.md, ejecutar build y verificar la salida. El código es la fuente final de verdad.
