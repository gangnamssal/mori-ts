import { filter, map, pipe, reduce, take, toArray, range } from '../core';

describe('range', () => {
  it('should generate a range of numbers', () => {
    const iter = range(5);

    expect([...iter]).toEqual([0, 1, 2, 3, 4]);
  });

  it('should generate a range of numbers with a start and stop', () => {
    const iter = range(2, 5);

    expect([...iter]).toEqual([2, 3, 4]);
  });

  it('should generate a range of numbers with a start, stop, and step', () => {
    const iter = range(2, 10, 2);

    expect([...iter]).toEqual([2, 4, 6, 8]);
  });

  it('should generate a range of numbers with a start, stop, and negative step', () => {
    const iter = range(5, 0, -1);

    expect([...iter]).toEqual([5, 4, 3, 2, 1]);
  });

  it('should generate a range of numbers with a start, stop, and negative step', () => {
    const iter = range(5, 0, -2);

    expect([...iter]).toEqual([5, 3, 1]);
  });

  it('range with pipe', () => {
    const res = pipe(range(5), toArray);
    expect(res).toEqual([0, 1, 2, 3, 4]);

    const res2 = pipe(range(5, 10), toArray);
    expect(res2).toEqual([5, 6, 7, 8, 9]);

    const res3 = pipe(range(5, 10, 2), toArray);
    expect(res3).toEqual([5, 7, 9]);

    const res4 = pipe(
      range(5),
      map(x => x * 2),
      take(3),
      toArray,
    );
    expect(res4).toEqual([0, 2, 4]);

    const res5 = pipe(
      range(0, 10),
      map(x => x * 2),
      filter(x => x % 2 === 0),
      reduce((acc, x) => acc + x),
    );
    expect(res5).toEqual(90);
  });
});
