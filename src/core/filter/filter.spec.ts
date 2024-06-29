import filter from './filter';

describe('filter', () => {
  it('should return an array of items that match the filter', () => {
    const items = [
      { name: 'item 1', value: 1 },
      { name: 'item 2', value: 2 },
      { name: 'item 3', value: 3 },
    ];

    const fn = (item: { name: string; value: number }) => item.value === 1;

    const result = filter(fn, items);
    const result2 = filter(fn)(items);

    expect([...result]).toEqual([{ name: 'item 1', value: 1 }]);
    expect([...result2]).toEqual([{ name: 'item 1', value: 1 }]);
  });

  it('filter with async iterable', async () => {
    const items = [
      { name: 'item 1', value: 1 },
      { name: 'item 2', value: 2 },
      { name: 'item 3', value: 3 },
    ];

    const fn = async (item: { name: string; value: number }) => item.value === 1;

    const result = filter(
      fn,
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

    const fn = (item: { name: string; value: number }) => Promise.resolve(item.value === 1);

    const result = filter(
      fn,
      (async function* () {
        for (const item of items) {
          yield item;
        }
      })(),
    );

    expect(result.next()).resolves.toEqual({ done: false, value: { name: 'item 1', value: 1 } });
    expect(result.next()).resolves.toEqual({ done: true, value: undefined });
  });

  it('filter with promise array', async () => {
    const items = Promise.resolve([1, 2, 3]);

    const fn = async (item: number) => item === 1;

    const result = filter(fn, await items);

    expect(result.next()).toEqual({ done: false, value: 1 });
  });

  it('filter with set', () => {
    const items = new Set([1, 2, 3]);

    const fn = (item: number) => item === 1;

    const result = filter(fn, items);

    expect([...result]).toEqual([1]);
  });

  it('filter with map', () => {
    const items = new Map([
      ['1', 1],
      ['2', 2],
      ['3', 3],
    ]);

    const fn = (item: [string, number]) => item[1] === 1;

    const result = filter(fn, items);

    expect([...result]).toEqual([['1', 1]]);
  });
});
