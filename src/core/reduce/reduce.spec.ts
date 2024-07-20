import pipe from '../pipe/pipe';
import toAsync from '../to-async/to-async';
import reduce from './reduce';

describe('reduce', () => {
  it('should reduce an array of numbers to a single value', () => {
    const numbers = [1, 2, 3, 4, 5];

    const result = reduce((acc, value) => acc + value, 0, numbers);

    expect(result).toBe(15);

    const result2 = reduce((acc, value) => acc + value, numbers);

    expect(result2).toBe(15);
  });

  it('reduce with objects', () => {
    const objects = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];

    const result = reduce((acc, value) => acc + value.x, 0, objects);

    expect(result).toBe(15);

    const result2 = reduce((acc, value) => {
      if (acc instanceof Object) return acc.x + value.x;
      return acc + value.x;
    }, objects);

    expect(result2).toBe(15);
  });

  it('reduce with objects', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
      { x: 5, y: 6 },
    ];

    const result = reduce((acc, value) => acc + value.x + value.y, 0, objects);

    expect(result).toBe(35);

    const result2 = reduce((acc, value) => {
      if (acc instanceof Object) return acc.x + value.x + acc.y + value.y;
      return acc + value.x + value.y;
    }, objects);

    expect(result2).toBe(35);
  });

  it('reduce with strings', () => {
    const strings = ['a', 'b', 'c', 'd', 'e'];

    const result = reduce((acc, value) => acc + value, '', strings);

    expect(result).toBe('abcde');

    const result2 = reduce((acc, value) => acc + value, strings);

    expect(result2).toBe('abcde');
  });

  it('reduce with array on object initial value', () => {
    const numbers = [1, 2, 3, 4, 5];

    const result = reduce((acc, value) => ({ ...acc, [value]: value }), { x: 10 }, numbers);

    expect(result).toEqual({ x: 10, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });

    const result2 = reduce((acc: Record<string, number> | number, value) => {
      if (typeof acc === 'object') return { ...acc, [value]: value };

      return { [value]: value };
    }, numbers);

    expect(result2).toEqual({ 2: 2, 3: 3, 4: 4, 5: 5 });
  });

  it('reduce with array on object', () => {
    const numbers = [1, 2, 3, 4, 5];

    const result = reduce((acc, value) => ({ ...acc, [value]: value }), { x: 10 }, numbers);

    expect(result).toEqual({ x: 10, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
  });

  it('reduce with promise array', async () => {
    const arr = Promise.resolve([1, 2, 3, 4, 5]);

    const result = reduce((acc, value) => acc + value, 10, await arr);

    expect(result).toBe(25);
  });

  it('reduce with async iterable', async () => {
    async function* asyncIterable() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

    const result = reduce((acc, value) => acc + value, 10, asyncIterable());

    expect(result).resolves.toBe(25);

    const result2 = reduce((acc, value) => acc + value, asyncIterable());

    expect(result2).resolves.toBe(15);
  });

  it('reduce with empty iterable', () => {
    function* iterable() {}

    const result = reduce((acc, value) => acc + value, 10, iterable());

    expect(result).toBe(10);

    const result2 = reduce((acc, value) => acc + value, iterable());

    expect(result2).toBe(undefined);
  });

  it('reduce with toAsync', () => {
    const iter = [1, 2, 3];

    const res = pipe(
      iter,
      toAsync,
      reduce((acc, value) => acc + value),
    );

    expect(res).resolves.toBe(6);
  });
});
