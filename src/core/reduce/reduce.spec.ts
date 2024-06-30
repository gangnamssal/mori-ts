import reduce from './reduce';

describe('reduce', () => {
  it('should reduce an array of numbers to a single value', () => {
    const numbers = [1, 2, 3, 4, 5];

    const result = reduce((acc: number, value) => acc + value, 0, numbers);
    expect(result).toBe(15);
  });

  it('reduce with objects', () => {
    const objects = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
    const result = reduce((acc, value) => acc + value.x, 0, objects);
    expect(result).toBe(15);
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
    expect(result).toBe('abcde');
  });

  it('reduce with array on object initial value', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = reduce(
      (acc: Record<string, number>, value) => ({ ...acc, [value]: value }),
      { x: 10 },
      numbers,
    );
    expect(result).toEqual({ x: 10, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
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
    expect(result).resolves.toBe(25);
  });

  it('reduce with promises2', () => {
    const arr = [1, Promise.resolve(2), Promise.resolve(3), 4, Promise.resolve(5)];

    const result = reduce((acc, value) => acc + value, 10, arr);
    expect(result).resolves.toBe(25);
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

  //   it('reduce with promise array', () => {
  //     const arr = Promise.resolve([1, 2, 3, 4, 5]);

  //     const result = reduce((acc, value) => acc + value, 10, arr);
  //     expect(result).resolves.toBe(25);
  //   });
});
