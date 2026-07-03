# Arquitectura propuesta para Astro

## Principios

- Generacion estatica por defecto.
- Contenido estructurado y validado.
- Replica base primero, mejoras despues.
- Sin CSS Webflow completo como arquitectura.
- Sin JS Webflow en produccion.
- Componentes Astro reutilizables.
- JavaScript cliente solo para interacciones necesarias.
- Activos locales trazables contra el mirror.

## Capas

```text
Datos CSV/HTML -> Normalizacion sin reescritura -> Content Collections/JSON -> Layouts -> Componentes -> Paginas Astro -> Build estatico
```

## Estructura recomendada

```text
src/
  components/
    global/
      Header.astro
      DesktopNavigation.astro
      MobileNavigation.astro
      Footer.astro
      Logo.astro
    cards/
      FeaturedCard.astro
      NewsCard.astro
      StoryCard.astro
      DirectoryCard.astro
      EventCard.astro
      HeritageCard.astro
    content/
      ArticleMeta.astro
      ArticleBody.astro
      BusinessContactPanel.astro
      RelatedContent.astro
    media/
      LocalImage.astro
      Gallery.astro
      Lightbox.astro
      LocalVideo.astro
      YouTubeEmbed.astro
      MapEmbed.astro
  content/
    config.ts
    directorio/
    historias/
    noticias/
    eventos/
    patrimonio/
  data/
    categories.json
    navigation.ts
    redirects.json
    asset-map.json
  layouts/
    BaseLayout.astro
    IndexLayout.astro
    ArticleLayout.astro
    BusinessLayout.astro
    EventLayout.astro
  pages/
    index.astro
    directorio/
      index.astro
      [slug].astro
    blog/
      index.astro
    post/
      [slug].astro
    noticias/
      index.astro
      [slug].astro
    eventos/
      [slug].astro
    patrimonio/
      index.astro
      [slug].astro
    categories/
      [slug].astro
  styles/
    tokens.css
    fonts.css
    global.css
    layout.css
    components.css
scripts/
  audit/
  migrate-content/
public/
  assets/
    barrio-bisquertt/
      fonts/
      images/
      logos/
      video/
```

## Content Collections

### Directorio

Campos:

- `id`
- `slug`
- `name`
- `address`
- `description`
- `phone`
- `mainImage`
- `gallery`
- `externalLink`
- `video`
- `createdOn`
- `updatedOn`
- `publishedOn`
- `archived`
- `draft`
- `sourceCsv`
- `sourceHtml`

### Historias

- `id`
- `slug`
- `title`
- `excerpt`
- `bodyHtml`
- `mainImage`
- `gallery`
- `videoUrl`
- `category`
- `instagram`
- `relatedBusiness`
- `publishedOn`
- `sourceCsv`
- `sourceHtml`

### Noticias

- `id`
- `slug`
- `title`
- `description`
- `bodyHtml`
- `category`
- `mainImage`
- `gallery`
- `instagram`
- `link`
- `video`
- `publishedOn`
- `canonicalGroup`
- `sourceCsv`
- `sourceHtml`

### Eventos

- `id`
- `slug`
- `title`
- `startsAt`
- `endsAt`
- `location`
- `descriptionHtml`
- `mainImage`
- `rsvpLink`
- `video`
- `publishedOn`
- `sourceCsv`
- `sourceHtml`

### Patrimonio

- `id`
- `slug`
- `title`
- `bodyHtml`
- `mainImage`
- `gallery`
- `videoUrl`
- `category`
- `instagram`
- `publishedOn`
- `sourceCsv`
- `sourceHtml`

## Estrategia de datos

1. Parsear CSV con parser real.
2. Mantener `bodyHtml` literal.
3. Convertir URLs CDN a rutas locales.
4. Enriquecer cada item con `sourceHtml` si existe.
5. Marcar `isPublishedInMirror`.
6. Registrar `draft` y `archived`, pero no filtrar ciegamente si el mirror publica la pagina.
7. Validar build: slugs unicos por coleccion, imagen principal existente, galerias existentes, fechas parseables o `null`.

## Estrategia de activos

- Crear `asset-map.json`:

```json
{
  "originalUrl": "https://cdn.prod.website-files.com/...",
  "mirrorPath": "docs/descarga-barrio-bisquertt/...",
  "publicPath": "/assets/barrio-bisquertt/images/...",
  "usedBy": ["/directorio/barroco"],
  "type": "image",
  "status": "copied"
}
```

- Mantener nombres originales durante FASE 2.
- Optimizar y renombrar solo despues de FASE 4.
- Conservar `mp4` y `webm` para video hero.
- Servir fuentes desde `/assets/barrio-bisquertt/fonts`.

## CSS y tokens

Capas:

1. `fonts.css`: `@font-face` local.
2. `tokens.css`: colores, tipos, radios, medidas, breakpoints.
3. `global.css`: reset, body, links, tipografia base.
4. `layout.css`: contenedores y grillas.
5. CSS por componente solo si el componente lo necesita.

Tokens iniciales salen del CSS Webflow y del reporte tecnico. Deben validarse con capturas.

## Interacciones

| Interaccion | Implementacion propuesta |
| --- | --- |
| Menu mobile | JS nativo, `aria-expanded`, focus trap basico, Escape |
| Hover tarjetas | CSS `transform` y `overflow:hidden` |
| Video hero | `<video autoplay loop muted playsinline>` local |
| Galeria | Astro + JS nativo opcional para lightbox |
| Lightbox | Solo si replica lo necesita; si no, galeria estatica |
| YouTube | iframe directo a YouTube, no Embedly |
| Mapa | iframe Google Maps encapsulado en `MapEmbed` |
| Formulario | Componente con estado documentado; backend pendiente |

## Rutas

Astro debe generar:

- `/`
- `/directorio`
- `/directorio/[slug]`
- `/blog`
- `/post/[slug]`
- `/noticias`
- `/noticias/[slug]`
- `/eventos/[slug]`
- `/patrimonio`
- `/patrimonio/[slug]`
- `/categories/[slug]`, si se aprueba conservar categorias publicas.

Compatibilidad:

- Reglas de redireccion para `.html`.
- Canonicas para duplicados.
- `sitemap.xml` generado desde rutas publicables.
- `robots.txt` simple.

## Validaciones de build

- Cada contenido publicado tiene `slug`.
- Cada `sourceHtml` existe si `isPublishedInMirror=true`.
- Imagen principal existe o queda `null` documentado.
- Galerias apuntan a archivos existentes.
- No se publica contenido demo sin flag aprobado.
- No hay rutas duplicadas.
- No hay links internos a `.html` en la salida final, salvo redirecciones.

## Plan de pruebas tecnico

- `npm run build`.
- Script de rutas esperadas vs rutas generadas.
- Link checker sobre `dist`.
- Verificacion de assets referenciados.
- Capturas Playwright en 1440, 1024, 768, 390.
- Comparacion manual contra pantallazos y mirror.
- Lighthouse.
- Navegacion por teclado.
- Consola sin errores.

## Mantenibilidad

- Documentar como agregar un comercio, historia, noticia, evento o patrimonio.
- Documentar formato de imagenes y galerias.
- Mantener `DISCREPANCIAS_Y_DECISIONES.md` como registro editorial.
- Mantener `asset-map.json` para trazabilidad.
- No acoplar componentes a nombres de clases Webflow.

