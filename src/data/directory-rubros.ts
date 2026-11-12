// Rubro editorial de cada ficha del directorio.
// La fuente del mirror no trae categoria: esta clasificacion se deriva de la
// descripcion de cada local y se documenta en docs/DISENO_DIRECTORIO_BUSQUEDA.md.
// Debe existir una entrada por slug de src/content/directorio/*.json.

export const RUBROS = [
  'Restobar',
  'Restaurante',
  'Pizzería',
  'Hamburguesería',
  'Cervecería',
  'Cafetería',
  'Pescadería',
  'Almacén',
  'Ecotienda',
  'Cultura',
  'Educación',
  'Servicios',
] as const;

export type Rubro = (typeof RUBROS)[number];

export const directoryRubros: Record<string, Rubro> = {
  'barroco': 'Restobar',
  'casaquinta': 'Cultura',
  'clima-baluarte': 'Servicios',
  'cultura-zeta-consultora': 'Cultura',
  'dom-black': 'Restobar',
  'hey-coffee-restobar': 'Cafetería',
  'i-baluarte': 'Educación',
  'i-love-sushi': 'Restaurante',
  'k-calafate': 'Cafetería',
  'la-mazza': 'Pizzería',
  'la-republica': 'Cervecería',
  'mandala-verde-cafe': 'Cafetería',
  'mi-piace': 'Restaurante',
  'paso-de-la-muerte': 'Almacén',
  'pescaderia-mares-del-sur': 'Pescadería',
  'restoba-pizza-steves': 'Pizzería',
  'smash-burger': 'Hamburguesería',
  'sonrie-te': 'Cafetería',
  'tu-esquina': 'Restobar',
  'umbral': 'Ecotienda',
};

export function rubroFor(slug: string): Rubro | null {
  return directoryRubros[slug] ?? null;
}
