import { map, toAsync, toValue } from '../core';

describe('toResult', () => {
  it('toValue with map', () => {
    const iter = [1, 2, 3];
    const res = map(x => x * 2, iter);

    expect(toValue(res)).toBe(2);
    expect(toValue(res)).toBe(4);
    expect(toValue(res)).toBe(6);
  });

  it('toValue with async map', () => {
    const iter = [1, 2, 3];
    const res = toAsync(map(x => x * 2, iter));

    expect(toValue(res)).resolves.toBe(2);
    expect(toValue(res)).resolves.toBe(4);
    expect(toValue(res)).resolves.toBe(6);
  });
});
