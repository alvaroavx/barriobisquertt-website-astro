// Tipografias criticas que conviene precargar: deben coincidir con las reglas
// @font-face de src/styles/fonts.css.
// Sin precarga, AcidGrotesk llega despues del primer pintado y el texto salta
// (layout-shift medido ~0.05) al reemplazar a la fuente de respaldo.
export const criticalFonts = [
  {
    href: '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394/69172d1e74dc41d1ed38caf4_AcidGrotesk-Light.otf',
    type: 'font/otf',
  },
  {
    href: '/fonts/AcidGrotesk-Regular.otf',
    type: 'font/otf',
  },
];
