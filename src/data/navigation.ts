export const navigationItems = [
  { label: 'Inicio', href: '/', activePrefixes: ['/'] },
  { label: 'Directorio', href: '/directorio', activePrefixes: ['/directorio'] },
  { label: 'Historias', href: '/blog', activePrefixes: ['/blog', '/post'] },
  { label: 'Noticias', href: '/noticias', activePrefixes: ['/noticias'] },
  { label: 'Patrimonio', href: '/patrimonio', activePrefixes: ['/patrimonio'] },
] as const;

const contactEndpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT || '';

export const formConfig = {
  endpoint: contactEndpoint,
  // FormSubmit responde JSON en /ajax/; otros receptores reciben el POST HTML normal.
  ajaxEndpoint: contactEndpoint.replace(/^https:\/\/formsubmit\.co\/(?!ajax\/)/, 'https://formsubmit.co/ajax/'),
  subject: 'Nuevo contacto desde barriobisquertt.cl',
  disabledMessage: 'El canal de contacto aún no está habilitado.',
  sendingMessage: 'Enviando…',
  successMessage: 'Gracias, recibimos tu correo. Te contactaremos pronto.',
  errorMessage: 'No pudimos enviar tu correo. Inténtalo nuevamente más tarde.',
} as const;
