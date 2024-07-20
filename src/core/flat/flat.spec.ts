import flat from './flat';
import { pipe, toArray, toAsync } from '..';

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

  it('flat with asyncIterator', () => {
    const items = [[[1]], [2], [3]];

    const res = flat(
      (async function* () {
        for (const item of items) {
          yield item;
        }
      })(),
    );

    expect(res.next()).resolves.toEqual({ done: false, value: 1 });
    expect(res.next()).resolves.toEqual({ done: false, value: 2 });
    expect(res.next()).resolves.toEqual({ done: false, value: 3 });
    expect(res.next()).resolves.toEqual({ done: true, value: undefined });
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

  it('flat with toAsync', async () => {
    const iter = [[1], [2], [3]];
    const iter2 = [Promise.resolve([1]), Promise.resolve([2]), Promise.resolve([3])];

    const res = pipe(iter, toAsync, flat, toArray);
    expect(res).resolves.toEqual([1, 2, 3]);

    const res2 = await pipe(iter, toAsync, flat, toArray);
    expect(res2).toEqual([1, 2, 3]);

    const res3 = pipe(iter2, toAsync, flat, toArray);
    expect(res3).resolves.toEqual([1, 2, 3]);

    const res4 = await pipe(iter2, toAsync, flat, toArray);
    expect(res4).toEqual([1, 2, 3]);
  });
});
