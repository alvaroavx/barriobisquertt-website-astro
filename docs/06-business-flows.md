# Flujos principales

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio.

## Publicar desde fuentes
Actor: persona con acceso local. Precondición: data/contents/ y mirror. Trigger: npm run migrate:content. Script lee CSV/HTML, aplica exclusiones, resuelve/copia activos y escribe JSON/manifiestos. npm run build valida y genera dist/. Error de lectura/escritura termina CLI con código 1. Efecto: sobrescribe generados; revisar diff. Sin DB, transacción o rollback automatizado.

## Consultar contenido
Actor: visitante. Abre índice generado con getCollection(); sigue entry.data.route al detalle construido por getStaticPaths(). Galería usa JS local; video/mapa puede cargar terceros. Ruta ausente: 404 del host. Sin persistencia.

## Explorar categoría
Actor: visitante. Abre /categories/[slug]. Noticias/historias se filtran por category === slug; eventos por coincidencia textual de location. Riesgo de relación vacía si divergen cadenas. Sin efectos persistentes.

## Contactar
Actor: visitante. Sin PUBLIC_CONTACT_FORM_ENDPOINT, pie deshabilita canal. Con variable, browser hace POST nativo con email requerido. No hay handler, pantalla de éxito ni política de errores propia. Privacidad, antispam y error externo: no determinados. Ver diagrams/main-flows.md.
