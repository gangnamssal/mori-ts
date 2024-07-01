import reduce, { asyncReduce } from './reduce';

describe('reduce', () => {
  it('should reduce an array of numbers to a single value', () => {
    const numbers = [1, 2, 3, 4, 5];

    const result = reduce((acc, value) => acc + value, 0, numbers);
    const result2 = reduce((acc, value) => acc + value, numbers);
    const result3 = reduce<number>((acc: number, value: number) => acc + value)(numbers);

    expect(result).toBe(15);
    expect(result2).toBe(15);
    expect(result3).toBe(15);
  });

  it('reduce with objects', () => {
    const objects = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];

    const result = reduce((acc, value) => acc + value.x, 0, objects);
    const result2 = reduce((acc: { x: number } | number, value: { x: number }) => {
      if (acc instanceof Object) return acc.x + value.x;
      return acc + value.x;
    }, objects);
    const result3 = reduce<number>((acc: { x: number } | number, value: { x: number }) => {
      if (acc instanceof Object) return acc.x + value.x;

      return acc + value.x;
    })(objects);

    expect(result).toBe(15);
    expect(result2).toBe(15);
    expect(result3).toBe(15);
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
  });

  it('reduce with strings', () => {
    const strings = ['a', 'b', 'c', 'd', 'e'];

    const result = reduce((acc, value) => acc + value, '', strings);
    const result2 = reduce((acc, value) => acc + value, strings);
    const result3 = reduce<string>((acc: string, value: string) => acc + value)(strings);

    expect(result).toBe('abcde');
    expect(result2).toBe('abcde');
    expect(result3).toBe('abcde');
  });

  it('reduce with array on object initial value', () => {
    const numbers = [1, 2, 3, 4, 5];

    const result = reduce(
      (acc: Record<string, number>, value) => ({ ...acc, [value]: value }),
      { x: 10 },
      numbers,
    );
    const result2 = reduce((acc: Record<string, number>, value) => ({ ...acc, [value]: value }), numbers);
    const result3 = reduce((acc: Record<string, number>, value) => ({ ...acc, [value]: value }))(numbers);

    expect(result).toEqual({ x: 10, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
    expect(result2).toEqual({ 2: 2, 3: 3, 4: 4, 5: 5 });
    expect(result3).toEqual({ 2: 2, 3: 3, 4: 4, 5: 5 });
  });

  it('reduce with array on object', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = reduce((acc, value) => ({ ...acc, [value]: value }), { x: 10 }, numbers);
    expect(result).toEqual({ x: 10, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
  });

  it('should reduce an array of numbers to a single value with an initial value', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = reduce((acc, value) => acc + value, 10, numbers);
    expect(result).toBe(25);
  });

  it('should reduce an array of numbers to a single value with an initial value of 0', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = reduce((acc, value) => acc + value, numbers);
    expect(result).toBe(15);
  });

  it('reduce with promises', () => {
    const arr = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ];

    const result = reduce((acc, value) => acc + value, 10, arr);
    const result2 = reduce((acc, value) => acc + value, arr);
    const result3 = reduce<Promise<number>>((acc: number, value: number) => acc + value)(arr);

    expect(result).resolves.toBe(25);
    expect(result2).resolves.toBe(15);
    expect(result3).resolves.toBe(15);
  });

  it('reduce with promises2', () => {
    const arr = [1, Promise.resolve(2), Promise.resolve(3), 4, Promise.resolve(5)];

    const result = reduce((acc, value) => acc + value, 10, arr);
    const result2 = reduce((acc, value) => acc + value, arr);
    const result3 = reduce<Promise<number>>((acc: number, value: number) => acc + value)(arr);

    expect(result).resolves.toBe(25);
    expect(result2).resolves.toBe(15);
    expect(result3).resolves.toBe(15);
  });

  it('reduce with promises and initial value', () => {
    const arr = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ];

    const result = reduce((acc, value) => acc + value, arr);
    expect(result).resolves.toBe(15);
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

    const result = asyncReduce((acc, value) => acc + value, 10, asyncIterable());
    const result2 = asyncReduce((acc, value) => acc + value, asyncIterable());
    expect(result).resolves.toBe(25);
    expect(result2).resolves.toBe(15);
  });
});
