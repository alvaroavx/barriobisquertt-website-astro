export const navigationItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Directorio', href: '/directorio' },
  { label: 'Historias', href: '/blog' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Patrimonio', href: '/patrimonio' },
] as const;

// Buzon publicado del sitio: es la direccion publica que usa el formulario en
// barriobisquertt.cl, por lo que no es un secreto. Se puede sobreescribir por env.
const formsubmitInbox = 'barriobisquerttrengo@gmail.com';

export const formConfig = {
  endpoint: import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT || `https://formsubmit.co/${formsubmitInbox}`,
  ajaxEndpoint:
    import.meta.env.PUBLIC_CONTACT_FORM_AJAX_ENDPOINT || `https://formsubmit.co/ajax/${formsubmitInbox}`,
  subject: 'Nuevo contacto desde barriobisquertt.cl',
  disabledMessage: 'El canal de contacto aun no esta habilitado.',
  messages: {
    sending: 'Enviando…',
    success: 'Gracias, recibimos tu correo. Te contactaremos pronto.',
    error: 'No pudimos enviar tu correo. Inténtalo nuevamente más tarde.',
  },
} as const;
