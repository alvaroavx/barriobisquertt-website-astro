# Rutas HTTP
Todos son GET HTML estáticos sin auth ni handler servidor. 404/cabeceras dependen del host.
| Ruta | Archivo en src/pages/ | Entradas |
|---|---|---:|
| / | index.astro | 1 |
| /directorio | directorio/index.astro | 1 |
| /directorio/[slug] | directorio/[slug].astro | 20 |
| /blog | blog.astro | 1 |
| /post/[slug] | post/[slug].astro | 16 |
| /noticias | noticias/index.astro | 1 |
| /noticias/[slug] | noticias/[slug].astro | 7 |
| /eventos/[slug] | eventos/[slug].astro | 5 |
| /patrimonio | patrimonio/index.astro | 1 |
| /patrimonio/[slug] | patrimonio/[slug].astro | 2 |
| /categories/[slug] | categories/[slug].astro | 5 |
| /auditoria | auditoria.astro | 1 |
Total esperado: 61 HTML. Las 62 rutas del manifiesto son del mirror. No hay redirects .html implementados. POST de contacto va a tercero.

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.
