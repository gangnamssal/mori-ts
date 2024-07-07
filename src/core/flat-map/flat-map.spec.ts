import flatMap from './flat-map';
import toArray from '../to-array/to-array';

describe('flat-map', () => {
  it('flatMap with array', () => {
    const iter = flatMap(a => [a, a * 2], [1, 2, 3]);
    const iter2 = toArray(flatMap(a => [a, a * 2], [1, 2, 3]));

    expect([...iter]).toEqual([1, 2, 2, 4, 3, 6]);
    expect(iter2).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it('flatMap with empty array', () => {
    const iter = flatMap(a => [a, a * 2], []);
    expect([...iter]).toEqual([]);
  });

  it('flatMap with promise array', async () => {
    const iter = Promise.resolve([1, 2, 3]);

    const res = flatMap(a => [a, a * 2], await iter);
    const res2 = toArray(flatMap(a => [a, a * 2], await iter));

    expect([...res]).toEqual([1, 2, 2, 4, 3, 6]);
    expect(res2).toEqual([1, 2, 2, 4, 3, 6]);
  });
});
