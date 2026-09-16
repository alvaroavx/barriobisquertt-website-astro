# Configuración

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

| Variable/opción | Requerida | Uso/default | Sensible |
|---|---|---|---|
| PUBLIC_CONTACT_FORM_ENDPOINT | No | import.meta.env en src/data/navigation.ts; vacío deshabilita formulario | Puede revelar receptor, no debe contener credenciales |
| Astro site | No definida | BaseLayout usa Astro.site o Astro.url.origin para canonical | No |
| dev/preview host | Fijo en package.json | 0.0.0.0 | No |
| Orden editorial | Código en src/lib/site.ts | arrays por colección; entradas extras al final | No |
| URLs de mapa/redes | Código en src/lib/site.ts | constantes públicas | No |
| Rutas de fuente | Fijas en migrate-content.mjs | data/contents y mirror local | No |

No hay .env.example, gestor de secretos, perfiles dev/staging/prod ni feature flags generales. PUBLIC_ en Astro expone el valor al HTML/cliente cuando se usa como action, por lo que no colocar tokens. La precedencia efectiva es variable de entorno de build → cadena vacía para contacto; otros parámetros vienen de archivos. El script de migración usa cwd como raíz y requiere ejecutarse desde el repo. Ver inventory/configuration.md.
