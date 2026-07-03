export const site = {
  name: 'Barrio Bisquertt',
  description: 'Sitio web oficial de Barrio Bisquertt.',
  instagram: 'https://www.instagram.com/barriobisquertt/',
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.2103874951467!2d-70.8670167372671!3d-34.40736988490241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96649e4bc5369991%3A0x4239195bf62a0ea0!2sJos%C3%A9%20Bisquertt%20%26%20Mor%C3%A1n%2C%202940234%20Rengo%2C%20O'Higgins!5e0!3m2!1ses-419!2scl!4v1766884759869!5m2!1ses-419!2scl",
};

export const assets = {
  logoBlack:
    '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394/6924a490f8c7394583bbd236_VERSION PRINCIPAL_NEGRO 1.png',
  logoWhite:
    '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394/6924b4f6d46dc1b7edc93130_VERSION PRINCIPAL_BLANCO 1.png',
  instagram:
    '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394/692613855e01a371c2fc2bbb_logo-instagram.svg',
  gore:
    '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394/694ea309a8ee83c48faf202a_Photoroom_20251226_100242.PNG',
  sercotec:
    '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394/694ea314589fe0541222c35e_Photoroom_20251226_100501.PNG',
  barrios:
    '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394/694ac8dfa0f8aa46ff878507_barrios.png',
  heroMp4:
    '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394%2F694f23253919421d0f393239_video2_mp4.mp4',
  heroWebm:
    '/assets/barrio-bisquertt/mirror/69172c950e54b69c53ea0394%2F694f23253919421d0f393239_video2_webm.webm',
};

export const orders = {
  directorio: [
    'cultura-zeta-consultora',
    'hey-coffee-restobar',
    'tu-esquina',
    'i-love-sushi',
    'sonrie-te',
    'barroco',
    'casaquinta',
    'restoba-pizza-steves',
    'umbral',
    'la-republica',
    'smash-burger',
    'mandala-verde-cafe',
    'la-mazza',
    'mi-piace',
    'dom-black',
    'i-baluarte',
    'clima-baluarte',
    'paso-de-la-muerte',
    'pescaderia-mares-del-sur',
    'k-calafate',
  ],
  historias: [
    'anfitriones-bisquertt-la-republica-a-todo-paladar',
    'anfitriones-bisquertt-casaquinta-en-el-nombre-de-hernan-quintan',
    'anfitriones-bisquertt-smash-burguer-hamburgueseria-de-especialidad',
    'anfitriones-bisquertt-dom-black-sabor-con-influencia-brasilena',
    'anfitriones-bisquertt-sonrie-te-un-mundo-en-torno-a-una-taza',
    'anfitriones-bisquert-i-love-sushi-una-apuesta-familiar-que-se-expande',
    'anfitriones-bisquertt-pescaderia-mares-del-sur-lo-mas-importante-es-mantener-la-frescura',
    'anfitriones-bisquertt-instituto-baluarte-cicap-y-clima-baluarte-profesionalizacion-y-tecnologia-de-vanguardia-para-rengo',
    'anfitriones-bisquertt-umbral-eco-cafe-una-leccion-de-alimentacion-saludable',
    'anfitriones-bisquertt-hey-coffee-restobar-clasico-con-toques-modernos',
    'anfitriones-bisquertt-k-calafate-una-ola-coreana',
    'anfitriones-bisquertt-barroco-carnes-y-mariscos-con-escenografia-mediterranea',
    'anfitriones-bisquertt-mandala-verde-cafe-una-historia-personal-y-saludable',
    'anfitriones-bisquertt-por-que-en-el-paso-de-la-muerte-el-cliente-no-tiene-la-razon',
    'anfitriones-bisquertt-la-mazza-estilo-romano',
    'nace-barrio-bisquertt-una-experiencia-excepcional-en-rengo-80e1e',
  ],
  noticias: [
    'una-apuesta-a-futuro-economia-circular-y-servicios-sustentables-2',
    'barrio-bisquertt-tendra-su-primera-feria-de-artes-y-oficios',
    'mas-seguridad-e-iluminacion',
    'capacitacion-para-un-mejor-servicio',
    'emocionante-ciclo-atardeceres-musicales',
    'nace-barrio-bisquertt-una-experiencia-excepcional-en-rengo',
    'una-apuesta-a-futuro-economia-circular-y-servicios-sustentables',
  ],
  eventos: [
    'verano-sobre-rieles',
    'nuevo-ciclo-de-cursos',
    'luces-en-avenida-bisquertt',
    'previa-y-ano-nuevo',
    'revisa-la-programacion-de-la-primera-feria-de-artes-y-oficios-del-barrio-bisquertt',
  ],
  patrimonio: [
    'coches-y-victoria-el-transporte-en-barrio-bisquertt',
    'palmeras-y-encinos-con-historia',
  ],
  categorias: ['barrio-bisquertt', 'cultura', 'cursos', 'sustentabilidad', 'sustentabilidad-2'],
};

export function sortBySlugOrder<T extends { data: { slug: string } }>(items: T[], order: string[]) {
  return [...items].sort((a, b) => {
    const aIndex = order.indexOf(a.data.slug);
    const bIndex = order.indexOf(b.data.slug);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
}

export function imageSrc(asset: { publicPath: string | null; original: string; status: string } | null) {
  if (!asset) return null;
  return asset.publicPath || (asset.status === 'external' ? asset.original : null);
}

export function plainText(html: string | null | undefined) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isoDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return date.toISOString();
}

export function demoteBodyHeadings(html: string | null | undefined) {
  return String(html || '')
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');
}

export function youtubeEmbed(url: string | null | undefined) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function isExternalUrl(url: string | null | undefined) {
  return Boolean(url && /^https?:\/\//i.test(url));
}

export function socialUrl(value: string | null | undefined) {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  const handle = value.replace(/^@/, '').replace(/^instagram\.com\//, '').replace(/\/$/, '');
  return `https://www.instagram.com/${handle}/`;
}
