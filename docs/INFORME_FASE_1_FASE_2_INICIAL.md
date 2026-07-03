# Informe FASE 1 + FASE 2 inicial

## Alcance ejecutado

- Proyecto Astro conservado y actualizado para Astro 7.
- TypeScript estricto activo con `resolveJsonModule`.
- Estructura base creada para colecciones, datos generados, scripts, estilos y activos.
- Esquemas de colecciones definidos en `src/content.config.ts`.
- Fuentes locales AcidGrotesk y TimesNow cargadas desde `public/assets/barrio-bisquertt/mirror`.
- Tokens visuales iniciales creados en `src/styles/tokens.css`.
- CSV convertidos sin reescritura editorial.
- Activos copiados sin renombrar ni optimizar.
- `asset-map.json` generado.
- `content-manifest.json` generado.
- Pagina tecnica temporal creada en `/auditoria`.

## Validacion ejecutada

- `npm run migrate:content`: correcto.
- `npm run build`: correcto.
- Servidor local: `http://localhost:4322/`.
- Pagina tecnica: `http://localhost:4322/auditoria/`.

## Conteos generados

| Elemento | Total |
| --- | ---: |
| Rutas del mirror inventariadas | 62 |
| Items publicables generados | 55 |
| Items saltados documentados | 10 |
| Activos en asset-map | 473 |
| Activos locales resueltos | 473 |
| Referencias locales faltantes | 0 |
| Referencias externas no copiadas localmente | 0 |

## Colecciones publicables

| Coleccion | Items |
| --- | ---: |
| `directorio` | 20 |
| `historias` | 16 |
| `noticias` | 7 |
| `eventos` | 5 |
| `patrimonio` | 2 |
| `categorias` | 5 |

## Items no publicados por decision aprobada

- `noticias/through-the-mist`
- `categorias/anfitriones-bisquertt`
- `categorias/fiesta`
- `categorias/nature`
- `categorias/photography`
- `categorias/relaxation`
- `categorias/travel`
- `categorias/vacation`
- `authors/mat-vogels`
- `authors/will-wong`

## Advertencias de validacion

- `eventos/luces-en-avenida-bisquertt`: el CSV indica `Draft=true`, pero existe HTML publico en el mirror. Se publico segun decision aprobada.

## Referencias externas de patrimonio resueltas

Durante FASE 3 se descargaron localmente las cinco referencias externas de patrimonio y luego se regeneraron `asset-map.json` y `content-manifest.json`. El estado actual es:

- `resolved`: 473.
- `missing`: 0.
- `external`: 0.

## Campos faltantes esperados

No se inventaron datos faltantes. Los principales campos nulos o vacios son:

- `directorio`: `video` en 20, `phone` en 2, `gallery` en 3, `link` en 3.
- `eventos`: fechas de inicio/termino en 5, `rsvpLink` en 5, `video` en 5.
- `historias`: `category` en 13, `instagram` en 14, `gallery` en 16.
- `noticias`: `authors` en 7, `link` en 7, `video` en 6, `description` en 4, `gallery` en 4.
- `patrimonio`: `category`, `instagram` y `video` en 2.
- `categorias`: `color` y `bannerImage` en 5.

## FASE 3 implementada

- Layout global con metadata, canonical, header flotante, navegacion desktop/movil y footer institucional.
- Rutas implementadas: `/`, `/directorio`, `/directorio/[slug]`, `/blog`, `/post/[slug]`, `/noticias`, `/noticias/[slug]`, `/eventos/[slug]`, `/patrimonio`, `/patrimonio/[slug]` y las cinco `/categories/[slug]` publicas.
- Contenido renderizado desde Content Collections generadas, manteniendo slugs, duplicados publicados, etiquetas `Home` y `Blog`, y orden visible extraido del mirror.
- Formulario visual del footer conectado a `PUBLIC_CONTACT_FORM_ENDPOINT`; si falta endpoint, queda deshabilitado y muestra que el canal no esta habilitado.
- Galerias con lightbox, menu movil con `aria-expanded`, videos locales, embeds YouTube directos y mapa Google encapsulado.
- Se conserva replica base sin aplicar direccion artistica ni normalizacion editorial.

## Validacion FASE 3

- `npm run migrate:content`: correcto.
- `npm run build`: correcto, 61 paginas generadas.
- Verificacion HTTP local de rutas clave: 200.
- Link checker local sobre `dist`: 61 HTML, 0 enlaces internos o assets locales faltantes.
- Validacion H1: 61 HTML con exactamente un H1.
- Asset map: 473 resueltos, 0 faltantes, 0 externos.
- Capturas generadas en `docs/capturas/fase-3/`: 1440 px, 1024 px, 768 px y 390 px.

## Pendiente proximo bloque

- Comparacion visual fina pagina por pagina contra el mirror.
- Ajustes de fidelidad visual de bajo riesgo si aparecen diferencias en revision manual extendida.
- FASE 5: estabilizacion, sitemap, robots, redirecciones y limpieza final antes de FASE 6.
