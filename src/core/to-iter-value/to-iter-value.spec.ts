import { at, map, pipe, range, some, toAsync } from '..';
import toIterValue from './to-iter-value';

describe('toResult', () => {
  it('toIterValue with map', () => {
    const iter = [1, 2, 3];
    const res = map(x => x * 2, iter);

    expect(toIterValue(res)).toBe(2);
    expect(toIterValue(res)).toBe(4);
    expect(toIterValue(res)).toBe(6);
  });

  it('toIterValue with async map', () => {
    const iter = [1, 2, 3];
    const res = toAsync(map(x => x * 2, iter));

    expect(toIterValue(res)).resolves.toBe(2);
    expect(toIterValue(res)).resolves.toBe(4);
    expect(toIterValue(res)).resolves.toBe(6);
  });
});
