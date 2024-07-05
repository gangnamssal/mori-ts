import range from './range';
import * as mori from '..';

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
    const res = mori.pipe(range(5), mori.toArray);
    const res2 = mori.pipe(range(5, 10), mori.toArray);
    const res3 = mori.pipe(range(5, 10, 2), mori.toArray);
    const res4 = mori.pipe(
      range(5),
      mori.map(x => x * 2),
      mori.take(3),
      mori.toArray,
    );
    const res5 = mori.pipe(
      range(0, 10),
      mori.map(x => x * 2),
      mori.filter(x => x % 2 === 0),
      mori.reduce((acc, x) => acc + x),
    );

    expect(res).toEqual([0, 1, 2, 3, 4]);
    expect(res2).toEqual([5, 6, 7, 8, 9]);
    expect(res3).toEqual([5, 7, 9]);
    expect(res4).toEqual([0, 2, 4]);
    expect(res5).toEqual(90);
  });
});
