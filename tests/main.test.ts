import t from '../';

test('Basic', () => {
  expect(t('-{1} {0} {1}', 23, 'haha')).toBe('-haha 23 haha');
});

test('Index out of range', () => {
  expect(t('-{1} {7}', 23, 'haha')).toBe('-haha <7 is out of range>');
});

test('uppercase', () => {
  expect(t('{0:uppercase}', 'Haha')).toBe('HAHA');
});

test('lowercase', () => {
  expect(t('{0:lowercase}', 'HahA')).toBe('haha');
});

test('capitalized', () => {
  expect(t('{0:capitalized}', 'ui')).toBe('Ui');
});

test('Ignore unsupported func', () => {
  expect(t('{0:haha}', 'ui')).toBe('ui');
});
