# Discrepancias y decisiones pendientes

## Regla de autoridad

1. Mirror HTML y activos descargados: determina lo publicado.
2. CSV: determina estructura CMS.
3. Pantallazos y reporte tecnico: determinan apariencia visible.
4. Informe de direccion artistica: determina mejoras posteriores.

## Matriz de discrepancias

| ID | Tema | Fuente A | Fuente B | Impacto | Propuesta |
| --- | --- | --- | --- | --- | --- |
| D01 | `luces-en-avenida-bisquertt` | CSV `Draft=true` | HTML publicado | Podria excluirse por error si se filtra por draft | Decision aprobada: incluir en replica base |
| D02 | `through-the-mist` | CSV noticia draft | Sin HTML | Podria publicarse contenido demo | Decision aprobada: no publicar en replica base; conservar en datos crudos |
| D03 | Categorias demo | CSV tiene Nature, Travel, Vacation, etc. | Sin HTML publico | Riesgo de publicar basura demo | Decision aprobada: no publicar |
| D04 | Autores demo | CSV tiene Mat Vogels y William Wong | Sin paginas publicas | Riesgo editorial | Decision aprobada: no publicar |
| D05 | `Sustentabilidad` duplicada | `sustentabilidad` y `sustentabilidad-2` | Ambas tienen HTML | SEO y navegacion duplicada | Decision aprobada: mantener ambas accesibles; registrar `canonicalGroup` |
| D06 | Noticia duplicada | Dos noticias con mismo titulo | Dos URLs | SEO y confusion editorial | Mantener ambas inicialmente; definir canonica antes de FASE 5 |
| D07 | `Nace Barrio Bisquertt` | Existe en `/noticias` | Existe en `/post` | Frontera editorial difusa | Mantener ambas rutas y documentar duplicacion |
| D08 | Rotulo `Home` | Mirror usa Home | Informe propone Inicio | Cambio visible | Decision aprobada: mantener Home en replica base |
| D09 | Rotulo `Blog` | Mirror usa Blog | Informe propone Historias | Cambio de arquitectura editorial visible | Decision aprobada: mantener Blog en replica base |
| D10 | `Bisquert` sin segunda t | I Love Sushi y algunos textos | Marca oficial Bisquertt | Error editorial | Registrar; no corregir sin aprobacion |
| D11 | `Smash Burguer` | Historia/post | Directorio usa Smash Burger | Inconsistencia de nombre | Registrar; no corregir sin aprobacion |
| D12 | Fechas en ingles | HTML visible | Sitio en espanol | UX/consistencia | Decision aprobada: fichas de detalle y listados muestran la fecha con `formatDateEs` («29 de diciembre de 2025»); el formato crudo del CMS ya no se publica |
| D13 | Titulos HTML `Blog Posts` | Noticias individuales | Contenido real | SEO incorrecto | Puede corregirse como error tecnico minimo si se aprueba |
| D14 | H1 duplicados | Eventos y directorio indice | Semantica incorrecta | Accesibilidad/SEO | Replica visual no necesita repetir H1; registrar ajuste tecnico |
| D15 | Formularios | Webflow `method=get` sin destino | Necesidad de contacto real | Funcionalidad incompleta | Endpoint configurable; sin endpoint no envia ni muestra exito falso |
| D16 | YouTube Embedly | HTML usa Embedly | CSV tiene `Video link` YouTube | Dependencia externa innecesaria | Usar YouTube directo en replica, no Embedly |
| D17 | Fuentes | CSS carga Google Fonts y Oxygen/Playfair | Activos locales AcidGrotesk/TimesNow | Diferencia visual posible | Priorizar fuentes locales; medir impacto |
| D18 | `No items found` | Oculto en 20 fichas directorio | No visible en resultado | Basura Webflow | No migrar como contenido visible |

## Registro de inconsistencias editoriales ya detectadas

- `Home` vs `Inicio`.
- `Blog` vs `Historias`.
- `directorio` en minuscula en navbar desktop.
- `Bisquert` vs `Bisquertt`.
- `Smash Burguer` vs `Smash Burger`.
- Fechas en ingles: January, February, December.
- Categorias demo: `Travel`, `Vacation`, `Nature`, `Photography`, `Relaxation`.
- Autores demo: `Mat Vogels`, `William Wong`.
- Titulos HTML genericos: `Blog Posts`, `Categories`.
- `Una apuesta a futuro: economia circular y servicios sustentables` duplicada.
- `Sustentabilidad` duplicada.
- Algunos H1 vacios o duplicados.
- Estados `No items found` ocultos.
- Telefonos y direcciones con formatos distintos.
- Imagenes con `alt=""` aunque son informativas.
- Formularios con error en ingles: `Oops! Something went wrong while submitting the form`.

## Decisiones que pueden tomarse sin intervencion humana

- No usar JS/CSS Webflow como dependencia final.
- No publicar `through-the-mist` en replica base porque no existe en mirror.
- No publicar autores demo como contenido visible.
- Conservar rutas publicadas del mirror.
- Crear esquemas con campos opcionales en vez de inventar datos.
- Mantener textos literales en replica base.
- Registrar correcciones editoriales antes de aplicarlas.
- Usar fonts locales descargadas.
- Reimplementar menu mobile con JS nativo accesible.
- Publicar categorias con HTML publico.
- Mantener duplicados accesibles y agruparlos con `canonicalGroup`.

## Decisiones que requieren aprobacion

- Corregir `Home` a `Inicio`.
- Cambiar `Blog` a `Historias`.
- Corregir `Bisquert` a `Bisquertt` en titulos/slugs/textos.
- Corregir `Smash Burguer`.
- Definir canonica de noticias duplicadas.
- Definir canonica `sustentabilidad` vs `sustentabilidad-2`.
- Definir destino del formulario.
- Definir si embeds YouTube externos son aceptables.
- Definir si se corrigen fechas en espanol durante replica base o en FASE 6.
- Definir si se publican paginas `/categories`.

Estas decisiones quedan diferidas para FASE 5 o FASE 6, no para la replica base.

## Registro de descarte potencial

No eliminar todavia. Candidatos a excluir de publicacion:

- `data/contents/...Authors...csv`: ambos autores.
- `through-the-mist`.
- Categorias demo sin HTML.
- JS Webflow.
- WebFont loader.
- CSS Webflow completo.
- Assets demo no referenciados por paginas publicas.

## Politica propuesta para correcciones

Cada correccion editorial debe registrarse con:

- Campo original.
- Valor corregido.
- Motivo.
- Tipo: ortografia, marca, fecha, SEO, accesibilidad, ruta.
- Aprobacion.

La replica base puede corregir errores tecnicos que no alteren contenido, por ejemplo H1 semanticos o dependencia Webflow, siempre que el resultado visible siga siendo fiel.

## Paridad con el sitio publicado (barriobisquertt.cl)

El sitio publicado en `https://barriobisquertt.cl` corresponde a una version mas
avanzada de este mismo proyecto Astro (mismas clases `content-card`, mismo
`BaseLayout.css`), no al mirror Webflow de `data/`. Por lo tanto sirve como
referencia directa de paridad visual y funcional. Cada diferencia detectada se
verifica en navegador (medicion de estilos calculados) antes de replicarla.

### Tarjetas con descripcion recortada a 3 lineas

- Fuente de verdad: regla del sitio publicado
  `.content-card__body > p:last-child { -webkit-line-clamp: 3; -webkit-box-orient: vertical; display: -webkit-box; overflow: hidden; }`.
- Motivo: sin recorte las tarjetas de una misma grilla quedan con alturas
  distintas segun el largo de la descripcion (576 a 725 px en `/directorio`).
- Implementacion: `src/styles/layout.css`, misma regla y mismo alcance global
  (todas las variantes de tarjeta, igual que el sitio publicado).
- Resultado medido: `/directorio` pasa de alturas 576-725 px a 502 px uniformes
  con `line-clamp: 3`; las descripciones cortas no se ven afectadas.

### Formulario de contacto del footer

- Diferencia detectada: la version local mostraba un formulario deshabilitado
  con leyenda "El canal de contacto aun no esta habilitado", mientras el sitio
  publicado envia correos reales.
- Replicado desde el sitio publicado:
  - `src/data/navigation.ts`: endpoint `formsubmit.co` del buzon
    `barriobisquerttrengo@gmail.com` (direccion ya publica en el HTML del sitio),
    endpoint AJAX, asunto, y mensajes de envio, exito y error. Sobreescribibles
    con `PUBLIC_CONTACT_FORM_ENDPOINT` y `PUBLIC_CONTACT_FORM_AJAX_ENDPOINT`.
  - `src/components/Footer.astro`: campos ocultos `_subject` y `_template`,
    honeypot `_honey`, etiqueta visible "Correo electrónico", placeholder
    `nombre@ejemplo.cl` y parrafo de estado `role="status"`.
  - `src/components/SiteScripts.astro`: envio por `fetch` con `FormData` y
    `Accept: application/json`, estados "Enviando…", exito y error, reset del
    formulario solo en exito.
  - `src/styles/layout.css`: `.footer-form label`, `.footer-form__honey` y color
    de boton `var(--color-text)` para igualar el contraste publicado.
- Verificacion: el HTML del formulario es identico al publicado y los estilos
  calculados no presentan diferencias; las rutas de exito, error HTTP y payload
  `success: false` se probaron con `fetch` interceptado, sin enviar correos.
- Pendiente de decision: el formulario local apunta al buzon real, por lo que una
  prueba manual en desarrollo envia un correo verdadero. Si se prefiere aislar
  desarrollo, definir los `PUBLIC_CONTACT_FORM_*` en un `.env` local.

### Etiquetas de navegacion, credito del pie y foco visible

- `src/data/navigation.ts`: etiquetas alineadas con el sitio publicado, sin
  cambiar rutas: `Home` pasa a `Inicio` (`/`) y `Blog` pasa a `Historias`
  (`/blog`). El footer deriva de la misma lista, por lo que queda en el orden
  publicado: Patrimonio, Noticias, Historias, Directorio, Inicio.
- `src/components/Header.astro` y `src/components/Footer.astro`: el `aria-label`
  del logo pasa de "Barrio Bisquertt Home" a "Ir al inicio de Barrio Bisquertt",
  igual que el sitio publicado.
- `src/components/Footer.astro` y `src/styles/layout.css`: se agrega el credito
  `p.site-credit` "Implementado por AVX Informática" con enlace a `https://avx.cl/`
  (`target="_blank"` + texto solo para lectores de pantalla), con
  `.site-credit { margin: 28px 0 0; font-size: 0.9rem; }` y
  `.site-credit a { color: inherit; font-weight: 700; }`.
- `src/styles/global.css`: regla global de accesibilidad tomada del sitio
  publicado, `:focus-visible { outline: 3px solid var(--color-text);
  outline-offset: 4px; }`. Antes el navegador aplicaba su anillo propio pegado al
  campo; ahora el anillo de 3 px queda separado 4 px del borde del input.
- Verificacion por teclado (Tab hasta el campo, sin foco programatico): local y
  publicado reportan el mismo `:focus-visible`, con el mismo anillo y
  desplazamiento; el credito coincide en marcado y estilos calculados.

### Titulo y hero de Historias (`/blog`)

- El sitio publicado titula la seccion como Historias; la version local decia Blog.
- `src/pages/blog.astro`: `title="Historias"` (el layout agrega el sufijo del
  sitio), `h1` "Historias del barrio", descripcion
  "Historias de anfitriones, emprendimientos y vida local de Barrio Bisquertt en
  Rengo.". La ruta sigue siendo `/blog`.
- Tipografia: el sitio publicado usa la serif Timesnow solo en el titulo de
  Historias. Por decision del proyecto se mantiene la sans (Acidgrotesk) en los
  titulos de todas las paginas, igual que el resto del sitio local. Es una
  divergencia deliberada respecto del publicado y no debe reintroducirse sin una
  decision nueva: no agregar `.page-hero--editorial` ni
  `.article-header--editorial` en `src/styles/layout.css`.
- Verificacion: `title`, `h1` y `meta description` coinciden con el publicado, y
  el `h1` de `/`, `/directorio`, `/blog`, `/noticias` y `/patrimonio` resuelve la
  misma familia tipografica.

### Diferencias observadas fuera de alcance

Detectadas al comparar y no replicadas por no haber sido solicitadas: hero de
portada y el `aria-label` del enlace de Instagram, que en el sitio publicado
anuncia que abre en una pestaña nueva.
