import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDateEs } from '../src/lib/site.ts';

test('formatDateEs muestra la fecha en espanol a partir de un ISO', () => {
  assert.equal(formatDateEs('2025-12-25T14:00:00.000Z'), '25 de diciembre de 2025');
});

test('formatDateEs entiende el formato crudo del CMS', () => {
  assert.equal(
    formatDateEs('Mon Dec 29 2025 14:42:11 GMT+0000 (Coordinated Universal Time)'),
    '29 de diciembre de 2025',
  );
});

test('formatDateEs devuelve null sin fecha o con fecha invalida', () => {
  assert.equal(formatDateEs(null), null);
  assert.equal(formatDateEs(undefined), null);
  assert.equal(formatDateEs(''), null);
  assert.equal(formatDateEs('no es una fecha'), null);
});

test('formatDateEs agrega la hora solo cuando se pide', () => {
  const withTime = formatDateEs('2025-12-26T14:55:00.000Z', { withTime: true });
  assert.ok(withTime, 'esperaba una fecha con hora');
  assert.match(withTime, /^26 de diciembre de 2025, \d{1,2}:\d{2}$/);
  assert.equal(formatDateEs('2025-12-26T14:55:00.000Z'), '26 de diciembre de 2025');
});

test('formatDateEs nunca devuelve el formato crudo del CMS', () => {
  const formatted = formatDateEs('Fri Dec 26 2025 23:10:42 GMT+0000 (Coordinated Universal Time)');
  assert.ok(formatted);
  assert.equal(formatted.includes('GMT'), false);
  assert.match(formatted, /^\d{1,2} de \p{L}+ de \d{4}$/u);
});
