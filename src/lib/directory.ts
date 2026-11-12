// Logica del directorio: orden alfabetico, busqueda y agrupacion por letra.
// Se usa en el servidor (orden de las fichas) y en el cliente (filtro del navegador).

export type DirectoryItem = {
  name: string;
  address?: string | null;
  description?: string | null;
  rubro?: string | null;
};

export type HighlightPart = {
  text: string;
  match: boolean;
};

export type DirectoryFilter = {
  query?: string;
  letter?: string | null;
};

export const ALPHABET: readonly string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

const COMBINING_MARKS = /[\u0300-\u036f]/g;
const WORD_SEPARATOR = /[^a-z0-9]+/;
const NAME_CHARACTER = /[a-z0-9]/;
const COLLATOR = new Intl.Collator('es', { sensitivity: 'base' });

export function normalizeText(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(COMBINING_MARKS, '');
}

// La Ñ se conserva como letra propia; el resto de las tildes no cambia la inicial.
export function letterOf(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '';
  const initial = trimmed.charAt(0).normalize('NFD').replace(COMBINING_MARKS, '').toLocaleUpperCase('es');
  if (trimmed.charAt(0).toLocaleUpperCase('es') === 'Ñ') return 'Ñ';
  return initial;
}

export function compareNames(a: string, b: string): number {
  return COLLATOR.compare(a, b);
}

function defaultName(item: unknown): string {
  return String((item as { name?: unknown } | null)?.name ?? '');
}

export function sortByName<T>(
  items: readonly T[],
  getName: (item: T) => string = (item) => defaultName(item),
): T[] {
  return [...items].sort((a, b) => compareNames(getName(a), getName(b)));
}

// Coincide por subcadena o por inicio de palabra: «pizz» encuentra «Pizzería».
export function matchesText(value: string, query: string): boolean {
  const needle = normalizeText(query);
  if (!needle) return true;
  const haystack = normalizeText(value);
  if (!haystack) return false;
  if (haystack.includes(needle)) return true;
  return haystack.split(WORD_SEPARATOR).some((word) => word.startsWith(needle));
}

export function matchesDirectoryItem(item: DirectoryItem, query: string): boolean {
  return matchesText(item.name, query)
    || matchesText(item.address ?? '', query)
    || matchesText(item.description ?? '', query)
    || matchesText(item.rubro ?? '', query);
}

export function filterByLetter<T extends { name: string }>(
  items: readonly T[],
  letter: string | null | undefined,
): T[] {
  if (!letter) return [...items];
  return items.filter((item) => letterOf(item.name) === letter);
}

export function filterDirectoryItems<T extends DirectoryItem>(
  items: readonly T[],
  filter: DirectoryFilter = {},
): T[] {
  const query = filter.query ?? '';
  return filterByLetter(items, filter.letter).filter((item) => matchesDirectoryItem(item, query));
}

export function availableLetters(names: readonly string[]): string[] {
  const present = new Set(names.map((name) => letterOf(name)));
  return ALPHABET.filter((letter) => present.has(letter));
}

function findMatchIndex(plain: string, needle: string): number {
  const firstSubstring = plain.indexOf(needle);
  if (firstSubstring === -1) return -1;
  let index = firstSubstring;
  while (index !== -1) {
    if (index === 0 || !NAME_CHARACTER.test(plain.charAt(index - 1))) return index;
    index = plain.indexOf(needle, index + 1);
  }
  return firstSubstring;
}

// Devuelve el texto en partes para resaltar sin reemplazar caracteres.
// Si normalizar cambia el largo del texto (por ejemplo acentos descompuestos),
// se devuelve el texto completo sin marca para no corromperlo.
export function highlightParts(text: string, query: string): HighlightPart[] {
  const whole: HighlightPart[] = [{ text, match: false }];
  const needle = normalizeText(query);
  if (!needle || !text) return whole;
  const plain = normalizeText(text);
  if (plain.length !== text.length) return whole;
  const index = findMatchIndex(plain, needle);
  if (index === -1) return whole;

  const end = index + needle.length;
  const parts: HighlightPart[] = [];
  if (index > 0) parts.push({ text: text.slice(0, index), match: false });
  parts.push({ text: text.slice(index, end), match: true });
  if (end < text.length) parts.push({ text: text.slice(end), match: false });
  return parts;
}
