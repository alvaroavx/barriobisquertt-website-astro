# Diseno: buscador y filtro alfabetico del directorio

Propuesta visual (no implementada) para agregar un buscador y un filtro/orden
alfabetico a `/directorio`. Vive como tableros de diseno autocontenidos.

## Ubicacion

- `design/directorio-busqueda-al-az/`: tres tableros HTML autocontenidos y `design.json`.
- `design/system.md`: tokens y reglas de componentes tomados de `src/styles/`.
- `design/system.html`: tablero que renderiza esos tokens y componentes.

Los tres tableros se abren en el canvas de diseno con
`/gentle:design open directorio-busqueda-al-az`.

## Direcciones propuestas

| Archivo | Direccion | Compromiso |
| --- | --- | --- |
| `01-filtro-integrado.html` | Buscador y letras en una franja fija bajo el header, sobre la grilla de tarjetas actual **(implementada)** | Cambio minimo sobre la pagina publicada; ocupa altura fija y no muestra conteos por letra |
| `02-indice-lateral.html` | Riel alfabetico fijo con conteos por letra y resultados agrupados por inicial | Mejor orientacion; menos ancho de tarjeta y menos peso del hero |
| `03-busqueda-protagonista.html` | Buscador grande con sugerencias, letras en barra pegajosa y filas compactas agrupadas | Encontrar rapido; se aleja de la grilla de tarjetas actual |

## Comportamiento comun de los tableros

- Busqueda insensible a mayusculas y tildes sobre nombre, direccion y descripcion.
- Coincidencia por subcadena o por inicio de palabra (`pizza` encuentra
  `pizzas`; `cafe` encuentra `cafeteria`).
- Filtro por letra inicial combinable con la busqueda; al escribir se limpia la letra.
- Letras sin locales deshabilitadas.
- Conteo de resultados anunciado con `aria-live="polite"` y estado vacio con salida
  clara ("Limpiar filtros").
- Las fotos de tarjeta son marcadores SVG: los tableros no pueden referenciar
  imagenes ni fuentes externas.

## Datos usados

Los 20 locales y sus direcciones provienen de `src/content/directorio/*.json`.
Las descripciones de los tableros son resumenes cortos de esas fichas, escritos
para el tablero; no reemplazan el texto de contenido.

## Excepcion de ubicacion de documentacion

`AGENTS.md` pide que todo Markdown de agente viva en `docs/`. `design/system.md`
es la excepcion deliberada: el canvas de diseno y la skill de diseno lo leen desde
`design/`. Este documento es el registro que la regla pide; el detalle visual vive
en `design/`.

## Estado

Implementada la direccion `01-filtro-integrado.html` en el sitio Astro.

### Mapa de implementacion

| Pieza del tablero | Implementacion |
| --- | --- |
| Orden alfabetico del listado | `src/lib/directory.ts` (`sortByName`, `Intl.Collator('es', { sensitivity: 'base' })`) usado en `src/pages/directorio/index.astro`; deja de usarse `orders.directorio` para renderizar |
| Panel de busqueda y letras | `src/components/DirectoryFilters.astro` (`.directory-filters`), arriba del listado y desplazandose con la pagina: sin `position: sticky` (decision posterior al primer handoff, para no ocupar media pantalla en movil) |
| Tarjeta con pill de rubro y direccion | `src/components/DirectoryCard.astro`, reutiliza las clases `.content-card*` existentes; el rubro sale de `src/data/directory-rubros.ts` |
| Filtrado, resaltado y estado vacio | Script del cliente en `src/pages/directorio/index.astro`, apoyado en `matchesText` y `highlightParts` de `src/lib/directory.ts` |
| Estilos | Bloque `Directorio: buscador y filtro alfabetico` al final de `src/styles/layout.css`, solo tokens de `src/styles/tokens.css` |
| Pruebas | `tests/directory.test.ts` con `node:test`; script `npm test` |

### Comportamiento implementado

- Las 20 fichas se renderizan en el servidor y se ordenan alfabeticamente con collation espanola (sin distinguir tildes ni mayusculas).
- La busqueda cubre nombre, direccion, descripcion y rubro; ignora tildes y mayusculas, y coincide por subcadena o por inicio de palabra.
- El filtro A-Z incluye la letra Ñ despues de la N; las letras sin fichas quedan deshabilitadas con un `title` que lo explica.
- El contador usa `role="status"` con `aria-live="polite"` y muestra `1 local` o `N locales`.
- Sin resultados se oculta la grilla y aparece el panel vacio con el termino buscado y un boton que limpia todo y devuelve el foco al campo.
- El boton de limpiar busqueda (×) aparece solo con texto y no toca la letra activa; `Limpiar filtros` reinicia ambos.
- El resaltado usa `<mark>` construido con nodos de texto: nunca se interpreta HTML del contenido.
- Sin JavaScript la pagina sigue mostrando las 20 fichas y sus enlaces.

### Rubros del directorio

La planilla de origen del directorio no trae columna de categoria (solo `Name`, `Dirección`,
`Descripción`, `Teléfono`, `Imagen`, `Multimedia`, `Link`, `Video`), asi que el rubro es una
**clasificacion editorial** derivada de la descripcion de cada local. Vive en un unico
archivo, `src/data/directory-rubros.ts`, con tres garantias cubiertas por
`tests/directory-rubros.test.ts`: una entrada por ficha, sin slugs sobrantes y solo
valores de la lista `RUBROS`.

Taxonomia actual (12 rubros, 20 fichas):

| Rubro | Fichas |
| --- | ---: |
| Restobar | 3 |
| Cafetería | 4 |
| Pizzería | 2 |
| Restaurante | 2 |
| Cultura | 2 |
| Cervecería, Almacén, Pescadería, Ecotienda, Educación, Hamburguesería, Servicios | 1 cada uno |

Decisiones asociadas:

- La letra inicial dejo de mostrarse sobre la tarjeta: se leia como una clasificacion. Ahora
  el badge es el rubro (pill sobre la foto) y la letra solo se conserva como clave de filtro
  en `data-letter`.
- El rubro participa de la busqueda: `cervecería` encuentra a La República y `pizzería` a
  La Mazza, Mi Piace y Restoba Pizza Steve's.
- Esta clasificacion queda pendiente de aprobacion editorial; corregir un rubro es editar
  una linea del archivo, sin tocar componentes ni estilos.
- La letra activa del filtro usa el cafe del footer (`--color-footer` #945e4c) con texto
  blanco (contraste 5.3:1); antes era negro y competia con el resto de la interfaz.
- El texto del hero no menciona la cantidad de fichas: el conteo vive solo en el panel
  (`N locales`, con singular `1 local`) y se calcula con `entries.length`, asi que el
  listado puede crecer sin tocar copy.

### Verificacion ejecutada

- `npm test`: 16 pruebas en verde (orden, normalizacion, letra, busqueda incluido el rubro, combinacion, letras disponibles, resaltado y cobertura de rubros).
- `npm run build`: 61 paginas generadas sin errores.
- `dist/directorio/index.html`: 20 fichas, 20 enlaces de detalle, 20 pills de rubro, 20 direcciones, 28 botones de letra (Todas + 27) con 14 deshabilitados, sin `<mark>` en el HTML servido.
- Prueba de interaccion sobre el rubro: `pizzería` deja 3 fichas (La Mazza, Mi Piace, Restoba), `cervecería` deja 1 (La República), `cafeteria` deja 6; las 20 pills visibles y 0 badges de letra.
- Prueba de interaccion en el build servido: `pizza` deja 3 fichas y 4 marcas; `pizza` + letra C deja 0 y muestra el estado vacio; `Limpiar filtros` vuelve a 20 sin marcas; la letra C deja 3 fichas; escribir una consulta limpia la letra; al borrar la consulta el texto vuelve intacto.
- Panel no pegajoso: `.directory-filters` computa `position: static`; con `scrollY=700` la franja queda en `top=-249` y se desplaza con el contenido. Separacion medida: 0 px extra bajo el hero (su propio padding de 44 px) y 20 px hasta la grilla.
- Sin desborde horizontal en 1440 px y 520 px.

### Lo que no cambia

`src/components/ContentCard.astro`, `src/lib/site.ts`, el resto de las paginas y el contenido JSON quedan intactos. `orders.directorio` se conserva como referencia del orden publicado, pero ya no se usa en `/directorio`.
