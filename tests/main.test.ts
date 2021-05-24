/* eslint-disable import/extensions */
import * as assert from 'assert';
import t from '../dist/main.js';

const eq: <T>(actual: T, expected: T) => asserts actual is T = assert.strictEqual;

it('Basic', () => {
  eq(t('-{1} {0} {1}', 23, 'haha'), '-haha 23 haha');
});

it('Index out of range', () => {
  eq(t('-{1} {7}', 23, 'haha'), '-haha <7 is out of range>');
  eq(t('{1|uppercase}', 'Haha'), '<1 is out of range>');
});

it('uppercase', () => {
  eq(t('{0|uppercase}', 'Haha'), 'HAHA');
});

it('lowercase', () => {
  eq(t('{0|lowercase}', 'HahA'), 'haha');
});

it('capitalized', () => {
  eq(t('{0|capitalized}', 'ui'), 'Ui');
});

it('Ignore unsupported func', () => {
  eq(t('{0|haha}', 'ui'), 'ui|haha');
});

it('Special chars', () => {
  eq(t('}|{0|haha}||{}{|}', 'ui'), '}|ui|haha||{}{|}');
});

it('countable', () => {
  eq(t('{0} {0|countable|aaa}', 'notANumber'), 'notANumber notANumber');
  eq(t('{0} {0|countable|fish|fishes}', 1), '1 fish');
  eq(t('{0} {0|countable|fish|fishes}', 2), '2 fishes');
  eq(t('{0} {1} {1|countable|fish|fishes}', 'I have', 0), 'I have 0 fishes');
  // "deer" is both singular and plural.
  eq(t('{0} {0|countable|deer}', 1), '1 deer');
  eq(t('{0} {0|countable|deer}', 2), '2 deer');
});
