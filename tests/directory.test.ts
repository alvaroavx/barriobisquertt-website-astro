import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ALPHABET,
  availableLetters,
  filterByLetter,
  filterDirectoryItems,
  highlightParts,
  letterOf,
  matchesDirectoryItem,
  matchesText,
  normalizeText,
  sortByName,
} from '../src/lib/directory.ts';

const C_NAMES = ['CasaQuinta', 'Clima Baluarte', 'Cultura Zeta Consultora'];
const C_GROUP = [...C_NAMES, 'Barroco'].map((name) => ({ name }));

test('ALPHABET ordena la Ñ despues de la N', () => {
  assert.equal(ALPHABET.length, 27);
  assert.equal(ALPHABET[ALPHABET.indexOf('N') + 1], 'Ñ');
});

test('normalizeText ignora mayusculas, tildes y espacios de mas', () => {
  assert.equal(normalizeText('  Café   Rengo '), 'cafe rengo');
  assert.equal(normalizeText('AV. BISQUERTT'), 'av. bisquertt');
});

test('letterOf toma la inicial sin tildes y conserva la Ñ', () => {
  assert.equal(letterOf('Ávila'), 'A');
  assert.equal(letterOf('Ñandú'), 'Ñ');
  assert.equal(letterOf('k-calafate'), 'K');
  assert.equal(letterOf('   '), '');
});

test('sortByName ordena alfabeticamente sin distinguir tildes ni mayusculas', () => {
  const sorted = sortByName([{ name: 'umbral' }, { name: 'Ávila' }, { name: 'barroco' }]);
  assert.deepEqual(sorted.map((item) => item.name), ['Ávila', 'barroco', 'umbral']);

  const withAccessor = sortByName(
    [{ data: { name: 'La República' } }, { data: { name: 'La Mazza' } }],
    (entry) => entry.data.name,
  );
  assert.deepEqual(withAccessor.map((entry) => entry.data.name), ['La Mazza', 'La República']);
});

test('sortByName conserva las 20 fichas del directorio', () => {
  const names = [
    'Barroco', 'CasaQuinta', 'Clima Baluarte', 'Cultura Zeta Consultora', 'Dom Black',
    'Hey Coffee Restobar', 'I Love Sushi', 'Instituto Baluarte Cicap', 'K-Calafate',
    'La Mazza', 'La República', 'Mandala Verde Café', 'Mi Piace',
    'Minimarket Paso de la Muerte', 'Pescadería Mares del Sur', "Restoba Pizza Steve's",
    'Smash Burger', 'Sonríe Té', 'Tu Esquina', 'Umbral',
  ];
  const reversed = [...names].reverse().map((name) => ({ name }));
  assert.deepEqual(sortByName(reversed).map((item) => item.name), names);
});

test('matchesText coincide por palabra y por subcadena', () => {
  assert.equal(matchesText("Restoba Pizza Steve's", 'pizza'), true);
  assert.equal(matchesText('Pizzas de 52 centímetros', 'pizza'), true);
  assert.equal(matchesText('Pizzería en el histórico', 'pizz'), true);
  assert.equal(matchesText('Cafetería con estética de container', 'cafe'), true);
  assert.equal(matchesText('Café K-Calafate', 'CAFÉ'), true);
  assert.equal(matchesText('Av. Bisquertt 380 local C', '380'), true);
  assert.equal(matchesText('Barroco', ''), true);
  assert.equal(matchesText('Barroco', '   '), true);
  assert.equal(matchesText('Barroco', 'zzz'), false);
  assert.equal(matchesText('', 'barroco'), false);
});

test('matchesDirectoryItem busca en nombre, direccion y descripcion', () => {
  const umbral = {
    name: 'Umbral',
    address: 'Daniel Morán 21',
    description: 'Ecotienda a granel y espacio de bienestar.',
  };
  assert.equal(matchesDirectoryItem(umbral, 'umbral'), true);
  assert.equal(matchesDirectoryItem(umbral, 'moran'), true);
  assert.equal(matchesDirectoryItem(umbral, 'granel'), true);
  assert.equal(matchesDirectoryItem(umbral, 'zzz'), false);
});

test('matchesDirectoryItem incluye el rubro de la ficha', () => {
  const laMazza = {
    name: 'La Mazza',
    address: 'Av. Bisquertt 357',
    description: 'Cocina romana en el histórico club.',
    rubro: 'Pizzería',
  };
  assert.equal(matchesDirectoryItem(laMazza, 'pizzería'), true);
  assert.equal(matchesDirectoryItem(laMazza, 'pizzeria'), true);
  assert.equal(matchesDirectoryItem(laMazza, 'cervecería'), false);
});

test('filterByLetter devuelve solo la letra pedida', () => {
  assert.deepEqual(filterByLetter(C_GROUP, 'C').map((item) => item.name), C_NAMES);
  assert.equal(filterByLetter(C_GROUP, null).length, 4);
  assert.equal(filterByLetter(C_GROUP, 'B').length, 1);
  assert.equal(filterByLetter(C_GROUP, 'Z').length, 0);
});

test('filterDirectoryItems combina busqueda y letra', () => {
  const items = [
    { name: 'Barroco', address: 'Av. Bisquertt 319', description: 'Coctelería y carta cuidada.' },
    { name: 'CasaQuinta', address: 'Pasaje 1 150-C', description: 'Casa de té.' },
    { name: 'I Love Sushi', address: 'Av. Bisquert 380 local C', description: 'Sushi fresco.' },
  ];
  assert.deepEqual(filterDirectoryItems(items, { query: 'sushi' }).map((item) => item.name), ['I Love Sushi']);
  assert.deepEqual(
    filterDirectoryItems(items, { query: 'sushi', letter: 'C' }).map((item) => item.name),
    [],
  );
  assert.deepEqual(
    filterDirectoryItems(items, { query: '', letter: 'B' }).map((item) => item.name),
    ['Barroco'],
  );
  assert.equal(filterDirectoryItems(items, {}).length, 3);
});

test('availableLetters respeta el orden del alfabeto', () => {
  assert.deepEqual(availableLetters(['Barroco', 'CasaQuinta', 'Umbral']), ['B', 'C', 'U']);
  assert.deepEqual(availableLetters([]), []);
  assert.deepEqual(availableLetters(['Ñandú', 'Nube']), ['N', 'Ñ']);
});

test('highlightParts marca la coincidencia y conserva el texto', () => {
  assert.deepEqual(highlightParts('Café Rengo', 'cafe'), [
    { text: 'Café', match: true },
    { text: ' Rengo', match: false },
  ]);
  assert.deepEqual(highlightParts('Restoba Pizza', 'pizza'), [
    { text: 'Restoba ', match: false },
    { text: 'Pizza', match: true },
  ]);
  assert.deepEqual(highlightParts('Barroco', 'zzz'), [{ text: 'Barroco', match: false }]);
  assert.deepEqual(highlightParts('Barroco', ''), [{ text: 'Barroco', match: false }]);
  assert.deepEqual(highlightParts('', 'cafe'), [{ text: '', match: false }]);
});

test('highlightParts no corrompe texto con caracteres descompuestos', () => {
  const decomposed = 'Cafe\u0301 Rengo';
  assert.deepEqual(highlightParts(decomposed, 'cafe'), [{ text: decomposed, match: false }]);
});
