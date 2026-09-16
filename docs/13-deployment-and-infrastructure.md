# Despliegue e infraestructura

Última revisión documental: 2026-09-16. Estado: reconstruido desde repositorio. Confianza: baja para producción.

Infraestructura versionada: package.json define build y preview; astro.config.mjs usa configuración por defecto. No se hallaron Dockerfile, compose, Kubernetes, Terraform, Ansible, nginx, systemd, GitHub Actions, GitLab CI o Jenkinsfile. No se conoce proveedor de hosting, entorno staging, DNS, TLS, CDN, cabeceras, healthcheck, rollback ni responsables de despliegue.

Build esperado: npm ci → npm run build → publicar dist/ en un host de archivos estáticos. Esto es **inferencia operacional**, no un pipeline existente. public/ se copia al artefacto. No hay DB, migraciones ni estado del servidor; los JSON se incorporan al build. PUBLIC_CONTACT_FORM_ENDPOINT se evalúa durante build y el HTML resultante apunta al receptor externo. Para rollback sería necesario conservar artefactos/versiones anteriores; mecanismo no documentado.

No se puede afirmar estado de disponibilidad, almacenamiento, backups o secretos de producción. Ver diagrams/deployment.md y preguntas abiertas.
