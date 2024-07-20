import pipe from '../pipe/pipe';
import toArray from '../to-array/to-array';
import toAsync from '../to-async/to-async';
import filter from './filter';

describe('filter', () => {
  it('should return an array of items that match the filter', () => {
    const items = [
      { name: 'item 1', value: 1 },
      { name: 'item 2', value: 2 },
      { name: 'item 3', value: 3 },
    ];

    const result = filter(item => item.value === 1, items);

    expect([...result]).toEqual([{ name: 'item 1', value: 1 }]);
  });

  it('filter with promise array', async () => {
    const items = Promise.resolve([1, 2, 3]);

    const result = filter(item => item === 1, await items);

    expect([...result]).toEqual([1]);
  });

  it('filter with async iterable', async () => {
    const items = [
      { name: 'item 1', value: 1 },
      { name: 'item 2', value: 2 },
      { name: 'item 3', value: 3 },
    ];

    const result = filter(
      async item => item.value === 1,
      (async function* () {
        for (const item of items) {
          yield item;
        }
      })(),
    );
    expect(result.next()).resolves.toEqual({ done: false, value: { name: 'item 1', value: 1 } });
    expect(result.next()).resolves.toEqual({ done: true, value: undefined });
  });

  it('filter with promise', () => {
    const items = [
      { name: 'item 1', value: 1 },
      { name: 'item 2', value: 2 },
      { name: 'item 3', value: 3 },
    ];

    const result = filter(
      item => Promise.resolve(item.value === 1),
      (async function* () {
        for (const item of items) {
          yield item;
        }
      })(),
    );
    expect(result.next()).resolves.toEqual({ done: false, value: { name: 'item 1', value: 1 } });
    expect(result.next()).resolves.toEqual({ done: true, value: undefined });
  });

  it('filter with set', () => {
    const items = new Set([1, 2, 3]);

    const result = filter(item => item === 1, items);

    expect([...result]).toEqual([1]);
  });

  it('filter with map', () => {
    const items = new Map([
      ['1', 1],
      ['2', 2],
      ['3', 3],
    ]);

    const result = filter(item => item[1] === 1, items);

    expect([...result]).toEqual([['1', 1]]);
  });

  it('filter with empty iterable', () => {
    const items: any[] = [];

    const result = filter(item => item === 1, items);

    expect([...result]).toEqual([]);
  });

  it('filter with toAsync', async () => {
    const iter = [1, 2, 3];

    const res = pipe(
      iter,
      toAsync,
      filter(item => item === 1),
      toArray,
    );
    expect(res).resolves.toEqual([1]);
  });

  it('filter with toAsync 2', async () => {
    const iter = [1, 2, 3];

    const res2 = await pipe(
      iter,
      toAsync,
      filter(item => item === 1),
      toArray,
    );
    expect(res2).toEqual([1]);
  });

  it('filter with toAsync 3', async () => {
    const iter = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

    const res3 = pipe(
      iter,
      toAsync,
      filter(item => item === 3),
      toArray,
    );

    expect(res3).resolves.toEqual([3]);
  });

  it('filter with toAsync 4', async () => {
    const iter = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

    const res4 = await pipe(
      iter,
      toAsync,
      filter(item => item === 3),
      toArray,
    );

    expect(res4).toEqual([3]);
  });

  it('filter with toAsync 5', async () => {
    const res5 = pipe(
      [],
      toAsync,
      filter(item => item === 3),
      toArray,
    );
    expect(res5).resolves.toEqual([]);
  });
});
