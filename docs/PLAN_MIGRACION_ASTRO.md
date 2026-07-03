# Plan de migracion a Astro - Barrio Bisquertt

## 1. Resumen ejecutivo

El material en `data` permite reconstruir el sitio publico actual de Barrio Bisquertt en Astro con una base solida: existe un mirror HTML completo de Webflow, CSV exportados desde CMS, activos locales, videos, tipografias, capturas y dos informes. La primera etapa debe ser una replica base funcional y verificable del sitio publicado, sin aplicar todavia el redisenio propuesto.

La fuente principal de la replica base es `data/descarga-barrio-bisquertt/barrio-bisquertt-mirror`. Los CSV de `data/contents` deben convertirse en datos estructurados y validados, pero cuando entren en conflicto con el mirror, prevalece el mirror porque representa lo publicado. El informe de direccion artistica queda reservado para FASE 6.

## 2. Inventario completo de carpetas y archivos relevantes

Detalle ampliado en `INVENTARIO_CONTENIDO.md`.

- `data/contents`: 7 CSV exportados desde Webflow CMS.
- `data/descarga-barrio-bisquertt`: paquete de descarga, scripts, README, ZIP y mirror.
- `data/descarga-barrio-bisquertt/barrio-bisquertt-mirror`: 538 archivos locales, incluyendo 62 HTML, 446 imagenes, 2 videos, 20 fuentes, 1 CSS y 5 JS.
- `data/pantallazos`: 12 capturas PNG de escritorio. La resolucion debe medirse desde los archivos reales en cada auditoria; no se debe asumir 1920x1080.
- `data/Informe de percepcion, direccion artistica y mejoras.pdf`: guia de mejoras futuras.
- `data/Reporte tecnico de reconstruccion visual.pdf`: referencia visual para replica base.

## 3. Mapa de todas las rutas encontradas

Detalle completo en `MAPA_RUTAS.md`.

Familias detectadas:

- `/`
- `/directorio`
- `/directorio/[slug]` con 20 fichas.
- `/blog`
- `/post/[slug]` con 16 publicaciones.
- `/noticias`
- `/noticias/[slug]` con 7 paginas publicadas.
- `/eventos/[slug]` con 5 paginas.
- `/patrimonio`
- `/patrimonio/[slug]` con 2 paginas.
- `/categories/[slug]` con 5 paginas publicadas.
- Variantes paginadas de home: `/?57c7d2a2_page=1` y `/?57c7d2a2_page=2`.

## 4. Mapa de contenido por coleccion

Colecciones CMS exportadas:

- Directorio: 20 items, 20 HTML publicados, correspondencia completa por slug.
- Historias/Blog Posts: 16 items, 16 HTML publicados, correspondencia completa por slug.
- Noticias: 8 items CSV, 7 HTML publicados. `through-the-mist` solo existe en CSV y esta en draft.
- Eventos: 5 items, 5 HTML publicados. `luces-en-avenida-bisquertt` aparece como draft en CSV pero existe publicado en HTML.
- Patrimonio: 2 items, 2 HTML publicados.
- Categorias: 12 items CSV, 5 HTML publicados. Hay categorias demo/no publicadas.
- Authors: 2 items con autores demo de Webflow.

## 5. Inventario de imagenes, videos, fuentes y logotipos

Resumen:

- Imagenes: 446 archivos locales. Predominan `jpg`, `png`, `jpeg`, `webp`, `svg`, `ico`.
- Videos locales: 2 archivos del hero, `mp4` y `webm`.
- Fuentes locales: 8 OTF AcidGrotesk y 12 TTF TimesNow.
- Logotipos principales:
  - `6924a490f8c7394583bbd236_VERSION PRINCIPAL_NEGRO 1.png`
  - `6924b4f6d46dc1b7edc93130_VERSION PRINCIPAL_BLANCO 1.png`
  - variantes `-p-500` y `-p-800`
  - `692613855e01a371c2fc2bbb_logo-instagram.svg`
- Logos institucionales en footer:
  - `694ea309a8ee83c48faf202a_Photoroom_20251226_100242.PNG`
  - `694ea314589fe0541222c35e_Photoroom_20251226_100501.PNG`
  - `694ac8dfa0f8aa46ff878507_barrios.png`

## 6. Tabla de correspondencia entre CSV, HTML y paginas publicas

Resumen verificable:

| Coleccion | CSV | HTML | Estado |
| --- | ---: | ---: | --- |
| Directorio | 20 | 20 | Coincide por slug |
| Historias | 16 | 16 | Coincide por slug |
| Noticias | 8 | 7 | `through-the-mist` solo CSV/draft |
| Eventos | 5 | 5 | Coincide por slug, con un draft publicado |
| Patrimonio | 2 | 2 | Coincide por slug |
| Categorias | 12 | 5 | 7 categorias sin HTML publico |
| Authors | 2 | 0 | Datos demo, no paginas publicas |

### Matriz de autoridad por campo

| Campo o decision | Fuente autoritativa | Uso en replica base |
| --- | --- | --- |
| Existencia publica | Mirror HTML | Si existe HTML publico valido, se replica |
| Ruta publica | Mirror HTML | Se conserva la ruta valida del mirror |
| Orden visible de listados | Mirror HTML | Se replica el orden visible actual |
| Contenido visible | Mirror HTML | Se conserva literal salvo error tecnico documentado |
| Estructura CMS | CSV | Define campos estructurados y esquemas |
| Campos estructurados | CSV | Alimenta colecciones y datos generados |
| Activos visibles | Referencias HTML resueltas contra archivos locales | Se copian y trazan sin renombrar ni optimizar |
| Direccion artistica | Informe de percepcion | Solo FASE 6 |
| Conflictos | Registro de discrepancias | Todo conflicto se documenta antes de resolver |

## 7. Componentes visuales identificados

- Header flotante tipo capsula.
- Navegacion desktop.
- Navegacion mobile.
- Logo.
- Hero con video/foto.
- Indicadores o miniaturas del hero.
- Tarjeta destacada.
- Tarjeta de ultimas noticias.
- Tarjeta de historia/blog.
- Tarjeta de directorio.
- Tarjeta de evento.
- Tarjeta patrimonial.
- Grilla de tres columnas.
- Layout de articulo.
- Metadata de articulo.
- Galeria/repeater de imagenes.
- Video embebido YouTube.
- Video local de hero.
- Datos de contacto.
- Mapa Google embebido.
- Formulario de contacto/suscripcion.
- Footer institucional.

## 8. Layouts y plantillas necesarias

- `BaseLayout`: HTML, metadata, fuentes, tokens, header/footer.
- `IndexLayout`: paginas indice con titulo y grilla.
- `HomeLayout`: hero, destacado, noticias, eventos, patrimonio, mapa, footer.
- `DirectoryIndexLayout`: grilla de comercios.
- `DirectoryDetailLayout`: ficha individual de comercio.
- `ArticleLayout`: historias, noticias y patrimonio.
- `EventLayout`: pagina individual de evento.
- `CategoryLayout`: paginas `/categories/[slug]`, si se conservan.
- `ErrorOrEmptyState`: estados vacios documentados, sin replicar basura `No items found` visible.

## 9. Tokens visuales extraidos

Desde CSS Webflow y reporte visual:

```css
:root {
  --color-page: #f7f4f5;
  --color-page-alt: #f5f2f3;
  --color-surface: #ffffff;
  --color-text: #171717;
  --color-text-webflow: #333333;
  --color-muted: #999999;
  --color-nav-active: #b7bcd8;
  --color-footer: #945e4c;
  --color-footer-button: #c18b79;
  --color-card-tint: #dab5cf;
  --color-border: #dddddd;
  --color-accent-orange: #dd783f;
  --color-accent-orange-hover: #f17228;
  --color-accent-green: #5cc489;
  --color-slate: #243039;
  --radius-sm: 3px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-pill: 999px;
  --container-index: 1500px;
  --container-home: 1475px;
  --container-article: 950px;
  --container-business: 810px;
}
```

Fuentes:

- `Acidgrotesk`: pesos 200, 300, 400, 500 italic, 700, italicas.
- `Timesnow`: pesos 200, 300, 600, 700, italicas.
- El CSS tambien referencia Oxygen, Playfair Display SC, Inter y fuentes remotas; deben sustituirse por fuentes locales o sistema en la replica base, documentando diferencias.

Breakpoints Webflow detectados:

- main: `>= 992px`
- medium: `768px - 991px`
- small: `480px - 767px`
- tiny: `0 - 479px`

## 10. Interacciones detectadas

- Menu mobile over-right de Webflow.
- Hover de tarjetas con desplazamiento vertical y zoom de imagen.
- Hero con video local autoplay/loop/muted.
- Paginacion Webflow en home.
- Formularios Webflow con estados success/error.
- Iframes YouTube via Embedly.
- Iframe Google Maps.
- Galerias CMS/repeater, especialmente en fichas de directorio.
- Navegacion fija flotante.

## 11. Dependencias actuales de Webflow

- CSS generado: `barrio-bisquertt.webflow.shared.a2c2e5b74.css`.
- JS generado: `webflow.*.js` y chunks.
- jQuery remoto desde `d3e54v103j8qbb.cloudfront.net`.
- WebFont loader local y llamadas remotas a Google Fonts.
- Clases `w-*`, `w-dyn-*`, `w-nav-*`, `w-form-*`, `w-background-video`.
- Iframes Embedly para YouTube.
- Formularios sin backend propio, dependientes de comportamiento Webflow.

## 12. Estrategia para eliminar Webflow

- No importar el CSS completo de Webflow como arquitectura final.
- Extraer tokens, medidas y patrones visuales.
- Reimplementar componentes con Astro + CSS propio.
- Sustituir `w-nav` por menu nativo accesible.
- Sustituir `w-form` por formulario estatico con estado controlado/documentado.
- Sustituir scripts de hover por CSS.
- Sustituir WebFont/Google Fonts por `@font-face` local.
- Mantener iframes YouTube y Google Maps solo cuando sean contenido, no infraestructura Webflow.

## 13. Modelo de datos propuesto

Usar Astro Content Collections con esquemas `zod`, o JSON/TS generado desde CSV y validado en build. Recomendacion: Content Collections para paginas individuales y JSON auxiliar para relaciones.

Campos base:

- `id`, `slug`, `collectionId`, `itemId`, `createdOn`, `updatedOn`, `publishedOn`, `archived`, `draft`.
- `title/name`, `description/excerpt`, `bodyHtml`.
- `mainImage`, `gallery`, `videoUrl`, `externalLinks`.
- `seoTitle`, `seoDescription`, `canonical`.

Colecciones:

- `directorio`
- `historias`
- `noticias`
- `eventos`
- `patrimonio`
- `categorias`

Authors se debe conservar solo como dato crudo auditado o excluirlo de publicacion por ser demo, previa aprobacion.

## 14. Arquitectura Astro propuesta

Detalle ampliado en `ARQUITECTURA_PROPUESTA.md`.

- Static Site Generation por defecto.
- Componentes `.astro`.
- JavaScript cliente minimo para menu mobile, galerias/lightbox y filtros si se aprueban.
- Datos en `src/content` o `src/data/generated`.
- Activos migrados a `public/assets/barrio-bisquertt`.
- CSS por capas: tokens, base, layout, components, pages.

## 15. Estructura de carpetas propuesta

```text
src/
  assets/
  components/
    global/
    cards/
    content/
    media/
  content/
    directorio/
    historias/
    noticias/
    eventos/
    patrimonio/
  data/
    categorias.json
    redirects.json
  layouts/
  pages/
  styles/
    tokens.css
    global.css
    components.css
public/
  assets/
    barrio-bisquertt/
      images/
      video/
      fonts/
      logos/
```

## 16. Estrategia de migracion de activos

- Copiar activos usados desde el mirror a una estructura estable.
- Mantener nombres originales en una primera pasada para trazabilidad.
- Crear un manifiesto `asset-map.json` con origen, destino, tipo y uso.
- No reemplazar imagenes por placeholders.
- Verificar referencias locales contra archivos reales.
- Optimizar despues de validar fidelidad, no antes.
- Conservar variantes responsive descargadas mientras se define estrategia de imagen.

## 17. Estrategia de conversion de contenido

- Parsear CSV con parser real.
- Mantener HTML de cuerpo literalmente.
- Convertir URLs CDN a rutas locales usando un mapa de activos.
- Extraer desde HTML lo que no exista en CSV: metadata visible, rutas, secciones de home, mapa, footer, estados.
- Registrar campos nulos o incompletos.
- No corregir ortografia ni capitalizacion en esta fase; registrar en `DISCREPANCIAS_Y_DECISIONES.md`.

## 18. Estrategia de rutas y redirecciones

- Generar rutas publicas actuales sin `.html`.
- Mantener compatibilidad con URLs antiguas si existen con `.html` mediante redirecciones o reglas de hosting.
- Canonicas propuestas:
  - `/blog` conserva URL, aunque en FASE 6 pueda mostrarse como Historias.
  - `/post/[slug]` para historias.
  - `/noticias/[slug]` para noticias.
  - Mantener `/categories/sustentabilidad` y `/categories/sustentabilidad-2` accesibles en replica base.
  - Mantener duplicados accesibles en replica base; no crear redirecciones entre ellos todavia.
  - Registrar grupos de duplicacion mediante `canonicalGroup` para resolver en FASE 5 o FASE 6.

## 19. Matriz de discrepancias entre fuentes

Detalle ampliado en `DISCREPANCIAS_Y_DECISIONES.md`.

Principales discrepancias:

- `luces-en-avenida-bisquertt` esta draft en CSV pero publicado en HTML.
- `through-the-mist` esta en CSV draft pero no existe en HTML.
- Categorias demo en CSV sin HTML.
- Autores demo en CSV sin paginas.
- Noticias con titulo duplicado.
- Titulos HTML genericos `Blog Posts` en paginas de noticias.
- Fichas y articulos con fechas en ingles.

## 20. Registro de contenido duplicado o inconsistente

Resumen:

- `Una apuesta a futuro: economia circular y servicios sustentables` aparece dos veces en noticias.
- `Sustentabilidad` aparece dos veces como categoria (`sustentabilidad` y `sustentabilidad-2`).
- `Nace Barrio Bisquertt` aparece en noticia y en post.
- `Anfitriones Bisquert` aparece sin segunda `t` en I Love Sushi.
- `Smash Burguer` aparece en historia, mientras ficha/directorio usa `Smash Burger`.
- `Home` y `Blog` son rotulos vigentes, pero el informe propone `Inicio` e `Historias`.

## 21. Registro de paginas y datos demo que podrian descartarse

No descartar en replica base sin aprobacion. Candidatos:

- Authors `Mat Vogels` y `William Wong`.
- Categoria noticia `through-the-mist`.
- Categorias `Nature`, `Photography`, `Relaxation`, `Travel`, `Vacation`.
- Categoria `Fiesta` por estar draft y sin HTML.
- Assets demo de Webflow no referenciados por paginas publicas.

## 22. Riesgos tecnicos

- Resolver todas las referencias de activos desde nombres con espacios, tildes, URL encoding y variantes `-p-*`.
- El mirror contiene referencias con rutas deformadas por descarga local.
- Formularios no tienen backend funcional.
- Iframes de YouTube/Google Maps dependen de servicios externos.
- No hay coordenadas estructuradas por comercio.
- Al eliminar Webflow JS se deben reimplementar menu, hover, video y estados.

## 23. Riesgos editoriales

- Duplicados pueden publicarse si se replica todo sin decision editorial.
- Datos demo pueden filtrarse si se convierten todos los CSV ciegamente.
- Fechas en ingles y errores tipograficos seguiran visibles en replica base si no se aprueba correccion.
- Telefonos, direcciones e Instagram no estan normalizados.
- Algunas galerias carecen de creditos y textos alternativos.

## 24. Riesgos de diseno

- La replica puede parecer distinta si se reemplazan fuentes remotas sin calibrar medidas.
- El reporte visual se basa en capturas de escritorio; mobile requiere verificacion real.
- La grilla Webflow tiene defectos que no deben convertirse en arquitectura.
- FASE 6 puede requerir cambios de jerarquia que no deben contaminar la replica base.

## 25. Preguntas que requieren decision humana

- Confirmar endpoint real del formulario cuando exista.
- Confirmar si YouTube externo es aceptable o si se deben conservar solo videos locales disponibles.
- Confirmar en FASE 5 o FASE 6 como resolver duplicados y canonicas.

## 26. Plan de pruebas

- Build Astro y validacion de esquemas.
- Comparacion de rutas generadas contra `MAPA_RUTAS.md`.
- Link checker interno.
- Verificacion de imagenes y videos 404.
- Comparacion visual contra mirror y pantallazos en 1440, 1024, 768 y 390 px.
- Prueba de metadata por pagina.
- Prueba de teclado para navegacion y menu mobile.
- Prueba de formularios: estado esperado sin backend.
- Prueba de mapa y embeds.
- Lighthouse para accesibilidad, performance y SEO sin problemas criticos.

## 27. Criterios de aceptacion

- Todo contenido publico valido aparece.
- No faltan imagenes ni videos usados por paginas publicas.
- Textos no resumidos ni reescritos.
- Rutas principales y antiguas relevantes funcionan o redirigen.
- Fuentes locales cargan.
- Identidad visual base se reconoce frente al mirror.
- Sitio funciona sin Webflow JS/CSS remoto.
- Responsive usable.
- Sin enlaces internos rotos.
- Sin errores de consola criticos.
- Sin imagenes 404.
- Sin datos demo publicados salvo aprobacion/documentacion.
- Toda correccion editorial queda registrada.

## 28. Fases de ejecucion

### FASE 0 - Auditoria

- Revisar todo el material.
- Clasificar fuentes.
- Crear inventarios.
- Comparar CSV, HTML y activos.
- Detectar duplicaciones e inconsistencias.
- Identificar rutas reales.
- Definir fuente canonica de cada dato.

### FASE 1 - Base tecnica Astro

- Mantener proyecto Astro.
- Configurar TypeScript estricto.
- Definir estructura.
- Configurar fuentes locales.
- Crear tokens CSS.
- Crear layouts globales.
- Configurar validacion de contenido.

### FASE 2 - Migracion de contenido

- Convertir CSV.
- Extraer contenido de HTML no presente en CSV.
- Asociar imagenes y videos.
- Generar `asset-map.json`.
- Generar `content-manifest.json`.
- Validar slugs.
- Crear colecciones.
- Detectar campos faltantes.
- Mantener contenido literal.

### FASE 3 - Replica visual base

- Header.
- Footer.
- Home.
- Directorio.
- Historias.
- Noticias.
- Eventos.
- Patrimonio.
- Paginas individuales.
- Responsive.
- Estados vacios.
- Formularios.
- Galerias.
- Mapas.

### FASE 4 - Validacion de fidelidad

- Comparar capturas Webflow/Astro.
- Revisar pagina por pagina.
- Validar textos, imagenes, videos, enlaces, rutas, metadata y responsive.
- Corregir diferencias involuntarias.

### FASE 5 - Limpieza y estabilizacion

- Eliminar dependencias Webflow residuales.
- Optimizar imagenes.
- Revisar rendimiento.
- Revisar accesibilidad.
- Corregir HTML semantico.
- Configurar sitemap, robots y redirecciones.
- Documentar mantenimiento.

### FASE 6 - Mejoras de direccion artistica

Solo despues de aprobar replica base:

- Aplicar informe de percepcion y direccion artistica.
- Evaluar `Blog` -> `Historias`.
- Mejorar navegacion, jerarquia, filtros, busqueda y patrimonio.
- Mejorar experiencia de recorrido.
- Crear matriz antes/despues.
- Obtener aprobacion visual.

## 29. Estimacion relativa de esfuerzo por fase

| Fase | Esfuerzo | Riesgo |
| --- | --- | --- |
| FASE 0 | M | Medio |
| FASE 1 | M | Bajo |
| FASE 2 | L | Alto |
| FASE 3 | XL | Alto |
| FASE 4 | L | Alto |
| FASE 5 | M | Medio |
| FASE 6 | XL | Alto |

## 30. Orden recomendado de implementacion

1. Congelar inventarios y decisiones minimas.
2. Crear mapa de activos y contenido generado.
3. Definir esquemas de contenido.
4. Migrar fuentes y tokens.
5. Construir layouts globales.
6. Migrar directorio completo.
7. Migrar historias, noticias, eventos y patrimonio.
8. Construir home con contenido real.
9. Reimplementar interacciones minimas.
10. Validar fidelidad y cerrar replica base.

## Separacion por tipo de elemento

### A. Deben conservarse

Contenido, rutas publicas validas, slugs, imagenes, videos, logos, tipografias locales, footer institucional, navegacion general, estructura reconocible, textos literales, etiquetas visibles `Home` y `Blog`, rutas duplicadas existentes y las cinco categorias publicas del mirror.

### B. Pueden mejorarse sin cambiar contenido

HTML semantico, carga local de fuentes, menu accesible, eliminacion de scripts Webflow, rutas sin `.html`, metadata correcta y errores tecnicos evidentes.

### C. Requieren decision de diseno

Cambiar Blog por Historias, Inicio por Home, filtros/busqueda, nuevo tratamiento patrimonial, mapa avanzado, linea temporal, antes/despues y jerarquia editorial.

### D. No deben migrarse como contenido publico sin aprobacion

Autores demo, categorias demo, contenido draft no publicado, CSS/JS Webflow como arquitectura, estados `No items found` ocultos y artefactos de plantilla.

## Decisiones aprobadas para replica base

- Mantener etiqueta `Home`.
- Mantener etiqueta `Blog`.
- Mantener rutas duplicadas existentes accesibles.
- No corregir todavia errores editoriales visibles.
- Publicar `luces-en-avenida-bisquertt`.
- No publicar `through-the-mist`.
- No publicar autores demo.
- No publicar categorias demo.
- Publicar categorias con HTML publico: `barrio-bisquertt`, `cultura`, `cursos`, `sustentabilidad`, `sustentabilidad-2`.
- Mantener todas las rutas publicas validas del mirror.
- El formulario debe tener endpoint configurable. Mientras no exista endpoint real, conserva apariencia, no envia datos, no muestra exito falso e indica que el canal aun no esta habilitado.

## Manifiesto de validacion requerido

Crear `src/data/generated/content-manifest.json` con, al menos:

- contenido esperado;
- ruta generada;
- HTML fuente;
- CSV fuente;
- imagenes esperadas y resueltas;
- video;
- estado de validacion;
- `canonicalGroup` para duplicados.
