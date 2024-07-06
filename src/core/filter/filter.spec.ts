import toArray from '../toArray/toArray';
import filter from './filter';

describe('filter', () => {
  it('should return an array of items that match the filter', () => {
    const items = [
      { name: 'item 1', value: 1 },
      { name: 'item 2', value: 2 },
      { name: 'item 3', value: 3 },
    ];

    const result = filter(item => item.value === 1, items);
    const result2 = filter(item => item.value === 1)(items);

    expect([...result]).toEqual([{ name: 'item 1', value: 1 }]);
    expect(toArray(result2)).toEqual([{ name: 'item 1', value: 1 }]);
  });

  it('filter with promise array', async () => {
    const items = Promise.resolve([1, 2, 3]);

    const result = filter(item => item === 1, await items);
    const result2 = filter(item => item === 1)(await items);

    expect([...result]).toEqual([1]);
    expect(toArray(result2)).toEqual([1]);
  });

  it('filter with promise array', () => {
    const items = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

    const result = filter(item => item === 1, items);
    const result2 = filter(item => item === 1)(items);

    expect([...result]).toEqual([Promise.resolve(1), Promise.resolve(undefined), Promise.resolve(undefined)]);
    expect(toArray(result2)).toEqual([
      Promise.resolve(1),
      Promise.resolve(undefined),
      Promise.resolve(undefined),
    ]);
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
    const result2 = filter(async item => item.value === 1)(
      (async function* () {
        for (const item of items) {
          yield item;
        }
      })(),
    );

    expect(result.next()).resolves.toEqual({ done: false, value: { name: 'item 1', value: 1 } });
    expect(result.next()).resolves.toEqual({ done: true, value: undefined });
    expect(toArray(result2)).resolves.toEqual([{ name: 'item 1', value: 1 }]);
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
    const result2 = filter(item => Promise.resolve(item.value === 1))(
      (async function* () {
        for (const item of items) {
          yield item;
        }
      })(),
    );

    expect(result.next()).resolves.toEqual({ done: false, value: { name: 'item 1', value: 1 } });
    expect(result.next()).resolves.toEqual({ done: true, value: undefined });
    expect(toArray(result2)).resolves.toEqual([{ name: 'item 1', value: 1 }]);
  });

  it('filter with set', () => {
    const items = new Set([1, 2, 3]);

    const result = filter(item => item === 1, items);
    const result2 = filter(item => item === 1)(items);

    expect([...result]).toEqual([1]);
    expect(toArray(result2)).toEqual([1]);
  });

  it('filter with map', () => {
    const items = new Map([
      ['1', 1],
      ['2', 2],
      ['3', 3],
    ]);

    const result = filter(item => item[1] === 1, items);
    const result2 = filter(item => item[1] === 1)(items);

    expect([...result]).toEqual([['1', 1]]);
    expect(toArray(result2)).toEqual([['1', 1]]);
  });

  it('filter with empty iterable', () => {
    const items: any[] = [];

    const result = filter(item => item === 1, items);
    const result2 = filter(item => item === 1)(items);

    expect([...result]).toEqual([]);
    expect(toArray(result2)).toEqual([]);
  });
});
