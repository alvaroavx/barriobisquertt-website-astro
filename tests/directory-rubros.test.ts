import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { RUBROS, directoryRubros } from '../src/data/directory-rubros.ts';

const CONTENT_DIR = 'src/content/directorio';

const slugs = readdirSync(CONTENT_DIR)
  .filter((file) => file.endsWith('.json'))
  .map((file) => JSON.parse(readFileSync(`${CONTENT_DIR}/${file}`, 'utf8')).slug as string);

test('cada ficha del directorio tiene un rubro', () => {
  const sinRubro = slugs.filter((slug) => !directoryRubros[slug]);
  assert.deepEqual(sinRubro, []);
  assert.equal(slugs.length, 20);
});

test('no sobran rubros de fichas que ya no existen', () => {
  const sobrantes = Object.keys(directoryRubros).filter((slug) => !slugs.includes(slug));
  assert.deepEqual(sobrantes, []);
});

test('todos los rubros pertenecen a la lista permitida', () => {
  const invalidos = Object.entries(directoryRubros)
    .filter(([, rubro]) => !RUBROS.includes(rubro))
    .map(([slug, rubro]) => `${slug}=${rubro}`);
  assert.deepEqual(invalidos, []);
});
