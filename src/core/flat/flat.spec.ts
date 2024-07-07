import flat from './flat';
import { toArray } from '..';

describe('flat', () => {
  it('flat with array', () => {
    const iter = flat([[1], [2], [3]]);
    expect([...iter]).toEqual([1, 2, 3]);
  });

  it('flat with array, toArray', () => {
    const iter = toArray(flat([[1], [2], [3]]));
    expect(iter).toEqual([1, 2, 3]);
  });

  it('flat with array 2', () => {
    const iter = flat([[[1]], [2, 3], [4, [5]], [6]]);
    expect([...iter]).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('flat with array 2, toArray', () => {
    const iter = toArray(flat([[[1]], [2, 3], [4, [5]], [6]]));
    expect(iter).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('flat with empty array', () => {
    const iter = flat([]);
    expect([...iter]).toEqual([]);
  });

  it('flat with array promise', () => {
    const iter = flat([[Promise.resolve(1), Promise.resolve(2)], [Promise.resolve(3)]]);
    expect(iter.next().value).resolves.toBe(1);
    expect(iter.next().value).resolves.toBe(2);
    expect(iter.next().value).resolves.toBe(3);
  });

  it('flat with promise array', async () => {
    const iter = flat(await Promise.resolve([[1], [2], [3]]));
    expect([...iter]).toEqual([1, 2, 3]);
  });
});
