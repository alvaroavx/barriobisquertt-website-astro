# Rutas HTTP
Todos son GET estáticos sin auth ni handler servidor. Servir 404.html con estado 404 y las cabeceras dependen del host.
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
| /404 | 404.astro (noindex) | 1 |
| /sitemap.xml | sitemap.xml.ts (XML) | 1 |
| /robots.txt | public/robots.txt | 1 |
Total esperado: 61 HTML (60 públicos + 404). /auditoria fue retirada en 2026-10. Las 62 rutas del manifiesto son del mirror. No hay redirects .html implementados. POST de contacto va a tercero.

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.
