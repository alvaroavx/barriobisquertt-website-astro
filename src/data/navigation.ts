export const navigationItems = [
  { label: 'Inicio', href: '/', activePrefixes: ['/'] },
  { label: 'Directorio', href: '/directorio', activePrefixes: ['/directorio'] },
  { label: 'Historias', href: '/blog', activePrefixes: ['/blog', '/post'] },
  { label: 'Noticias', href: '/noticias', activePrefixes: ['/noticias'] },
  { label: 'Patrimonio', href: '/patrimonio', activePrefixes: ['/patrimonio'] },
] as const;

export const formConfig = {
  endpoint: import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT || '',
  disabledMessage: 'El canal de contacto aun no esta habilitado.',
} as const;
