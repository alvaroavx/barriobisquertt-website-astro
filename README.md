# Barrio Bisquertt

Sitio web estatico desarrollado con Astro.

## Guía humana

### Qué es, para qué sirve y quiénes lo usan

Este repositorio contiene el sitio público estático de **Barrio Bisquertt**. Sirve para difundir el territorio y su actividad mediante directorio, historias, noticias, eventos, patrimonio y categorías. Está dirigido a visitantes, vecinos, organizaciones y personas editoras que preparan el contenido; el repositorio no incluye cuentas de usuario ni un panel de administración público.

### Qué contiene y cómo trabaja

Incluye una aplicación Astro, colecciones de contenido, componentes/rutas estáticas, activos y herramientas de migración. Durante el build, Astro valida las colecciones `directorio`, `historias`, `noticias`, `eventos`, `patrimonio` y `categorias`, y genera índices y páginas de detalle. `scripts/migrate-content.mjs` apoya la importación/generación de contenido, pero no participa en la ejecución del sitio. No se encontró backend propio, base de datos, autenticación ni API.

### Funcionalidades y tareas que resuelve

- Publicar contenido editorial organizado por colección y categoría.
- Generar páginas de listado y detalle de forma estática.
- Mostrar recursos externos como mapas, videos e Instagram cuando el contenido los incorpora.
- Preparar contenido migrado y registrar discrepancias editoriales para su revisión.
- Habilitar el formulario de pie solo si existe un endpoint externo configurado; sin esa variable, el canal está deshabilitado.

### Trazabilidad humana

- **Solicitante:** el sitio identifica a Barrio Bisquertt como destinatario, pero no conserva una solicitud ni una persona solicitante verificable.
- **Desarrollo:** el primer commit disponible fue creado por **AVX Informática**. No hay una atribución versionada que permita asignar todo el desarrollo a una persona concreta.
- **Cuándo:** el primer registro Git disponible es del **2 de julio de 2026**; es el inicio observable del repositorio, no necesariamente el inicio del sitio ni de su contenido.

### Qué puede mejorar y oportunidades

La mejora más valiosa es fortalecer la operación editorial: versionar o custodiar de forma reproducible la fuente `data/`, sanitizar el HTML migrado, completar activos faltantes y dejar trazabilidad de cada decisión de contenido o ruta. Para publicación real faltan decisiones de hosting, TLS, CSP, analítica, observabilidad y un endpoint de contacto con privacidad/antispam. Empiece por [la documentación IA First](docs/README.md) y el registro de [discrepancias y decisiones](docs/DISCREPANCIAS_Y_DECISIONES.md).

## Documentacion

- `data/` contiene las fuentes consumidas para reconstruir el sitio.
- `docs/` contiene la documentacion oficial y debe mantenerse actualizada con el codigo.
- Todo Markdown del proyecto debe vivir en `docs/`, excepto `README.md` y `AGENTS.md`.

La puerta de entrada IA First es [docs/README.md](docs/README.md). Resume arquitectura efectiva, colecciones, rutas, riesgos editoriales, operación y la guía para cambios seguros; los documentos históricos de migración continúan en el mismo directorio.

## Comandos

```sh
npm install
npm run dev
npm run build
```
