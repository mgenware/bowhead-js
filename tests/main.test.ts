import t from '../';
import * as assert from 'assert';

const expect = assert.equal;

it('Basic', () => {
  expect(t('-{1} {0} {1}', 23, 'haha'), '-haha 23 haha');
});

it('Index out of range', () => {
  expect(t('-{1} {7}', 23, 'haha'), '-haha <7 is out of range>');
});

it('uppercase', () => {
  expect(t('{0:uppercase}', 'Haha'), 'HAHA');
});

it('lowercase', () => {
  expect(t('{0:lowercase}', 'HahA'), 'haha');
});

it('capitalized', () => {
  expect(t('{0:capitalized}', 'ui'), 'Ui');
});

it('Ignore unsupported func', () => {
  expect(t('{0:haha}', 'ui'), 'ui:haha');
});
