# Configuración

Última revisión documental: 2026-10-21. Estado: reconstruido desde repositorio.

| Variable/opción | Requerida | Uso/default | Sensible |
|---|---|---|---|
| PUBLIC_CONTACT_FORM_ENDPOINT | No | import.meta.env en src/data/navigation.ts; vacío deshabilita formulario | Puede revelar receptor, no debe contener credenciales |
| Astro site | astro.config.mjs: https://barriobisquertt.cl | canonical, og:url, og:image y sitemap; fallback site.url en src/lib/site.ts | No |
| Versión de Node | .nvmrc (22.12.0) y engines >=22.12.0 | requerida por Astro 7 | No |
| Imagen social por defecto | assets.socialImage en src/lib/site.ts | og:image cuando la página no aporta imagen | No |
| dev/preview host | Fijo en package.json | 0.0.0.0 | No |
| Orden editorial | Código en src/lib/site.ts | arrays por colección; entradas extras al final | No |
| URLs de mapa/redes | Código en src/lib/site.ts | constantes públicas | No |
| Rutas de fuente | Fijas en migrate-content.mjs | data/contents y mirror local | No |

No hay .env.example, gestor de secretos, perfiles dev/staging/prod ni feature flags generales. PUBLIC_ en Astro expone el valor al HTML/cliente cuando se usa como action, por lo que no colocar tokens. La precedencia efectiva es variable de entorno de build → cadena vacía para contacto; otros parámetros vienen de archivos. El script de migración usa cwd como raíz y requiere ejecutarse desde el repo. Ver inventory/configuration.md.
