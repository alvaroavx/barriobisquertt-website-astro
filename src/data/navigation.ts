export const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Directorio', href: '/directorio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Patrimonio', href: '/patrimonio' },
] as const;

export const formConfig = {
  endpoint: import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT || '',
  disabledMessage: 'El canal de contacto aun no esta habilitado.',
} as const;
