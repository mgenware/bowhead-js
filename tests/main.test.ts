import * as assert from 'assert';
import t from '..';

const expect = assert.equal;

it('Basic', () => {
  expect(t('-{1} {0} {1}', 23, 'haha'), '-haha 23 haha');
});

it('Index out of range', () => {
  expect(t('-{1} {7}', 23, 'haha'), '-haha <7 is out of range>');
});

it('uppercase', () => {
  expect(t('{0|uppercase}', 'Haha'), 'HAHA');
});

it('lowercase', () => {
  expect(t('{0|lowercase}', 'HahA'), 'haha');
});

it('capitalized', () => {
  expect(t('{0|capitalized}', 'ui'), 'Ui');
});

it('Ignore unsupported func', () => {
  expect(t('{0|haha}', 'ui'), 'ui|haha');
});

it('Special chars', () => {
  expect(t('}|{0|haha}||{}{|}', 'ui'), '}|ui|haha||{}{|}');
});

it('countable', () => {
  expect(t('{0} {0|countable|aaa}', 'notANumber'), 'notANumber notANumber');
  expect(t('{0} {0|countable|fish|fishes}', 1), '1 fish');
  expect(t('{0} {0|countable|fish|fishes}', 2), '2 fishes');
  expect(t('{0} {1} {1|countable|fish|fishes}', 'I have', 0), 'I have 0 fishes');
  // "deer" is both singular and plural.
  expect(t('{0} {0|countable|deer}', 1), '1 deer');
  expect(t('{0} {0|countable|deer}', 2), '2 deer');
});
