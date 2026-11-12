import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDate } from '../src/lib/site.ts';

test('formatDate muestra la fecha en espanol a partir de un ISO', () => {
  assert.equal(formatDate('2025-12-25T14:00:00.000Z'), '25 de diciembre de 2025');
});

test('formatDate entiende el formato crudo del CMS', () => {
  assert.equal(
    formatDate('Mon Dec 29 2025 14:42:11 GMT+0000 (Coordinated Universal Time)'),
    '29 de diciembre de 2025',
  );
});

test('formatDate devuelve null sin fecha o con fecha invalida', () => {
  assert.equal(formatDate(null), null);
  assert.equal(formatDate(undefined), null);
  assert.equal(formatDate(''), null);
  assert.equal(formatDate('no es una fecha'), null);
});

test('formatDate nunca devuelve el formato crudo del CMS', () => {
  const formatted = formatDate('Fri Dec 26 2025 23:10:42 GMT+0000 (Coordinated Universal Time)');
  assert.ok(formatted);
  assert.equal(formatted.includes('GMT'), false);
  assert.match(formatted, /^\d{1,2} de \p{L}+ de \d{4}$/u);
});
