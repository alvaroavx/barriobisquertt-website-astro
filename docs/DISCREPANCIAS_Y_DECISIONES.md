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
| D12 | Fechas en ingles | HTML visible | Sitio en espanol | UX/consistencia | Replica base puede conservar; correccion requiere registro |
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
