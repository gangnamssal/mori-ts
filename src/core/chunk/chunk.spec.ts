import chunk from './chunk';
import * as mori from '..';

describe('chunk', () => {
  it('should chunk the given iterable', () => {
    const iter = chunk(2, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect([...iter]).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
  });

  it('should chunk no iterable', () => {
    const iter = chunk(2)([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect([...iter]).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
  });

  it('should chunk no iterable with toArray', () => {
    const iter = mori.toArray(chunk(2)([1, 2, 3, 4, 5, 6, 7, 8, 9]));

    expect([...iter]).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
  });

  it('should chunk the given iterable with object', () => {
    const iter = chunk(2, [
      { a: 1 },
      { a: 2 },
      { a: 3 },
      { a: 4 },
      { a: 5 },
      { a: 6 },
      { a: 7 },
      { a: 8 },
      { a: 9 },
    ]);

    expect([...iter]).toEqual([
      [{ a: 1 }, { a: 2 }],
      [{ a: 3 }, { a: 4 }],
      [{ a: 5 }, { a: 6 }],
      [{ a: 7 }, { a: 8 }],
      [{ a: 9 }],
    ]);
  });

  it('should chunk the given iterable with object, toArray', () => {
    const iter = mori.toArray(
      chunk(2, [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }, { a: 7 }, { a: 8 }, { a: 9 }]),
    );

    expect(iter).toEqual([
      [{ a: 1 }, { a: 2 }],
      [{ a: 3 }, { a: 4 }],
      [{ a: 5 }, { a: 6 }],
      [{ a: 7 }, { a: 8 }],
      [{ a: 9 }],
    ]);
  });

  it('should chunk the given iterable with toArray', () => {
    const iter2 = mori.toArray(chunk(2, [1, 2, 3, 4, 5, 6, 7, 8, 9]));

    expect(iter2).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
  });

  it('should chunk the given iterable with iter.next', () => {
    const iter = chunk(2, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(iter.next()).toEqual({ value: [1, 2], done: false });
    expect(iter.next()).toEqual({ value: [3, 4], done: false });
    expect(iter.next()).toEqual({ value: [5, 6], done: false });
    expect(iter.next()).toEqual({ value: [7, 8], done: false });
    expect(iter.next()).toEqual({ value: [9], done: false });
    expect(iter.next()).toEqual({ value: undefined, done: true });
  });

  it('should return empty iterable if the given iterable is empty', () => {
    const iter = chunk(2, []);
    expect([...iter]).toEqual([]);
  });

  it('should return empty iterable if the given iterable is empty with toArray', () => {
    const iter = mori.toArray(chunk(2, []));
    expect(iter).toEqual([]);
  });

  it('should return empty iterable if the given size is 0', () => {
    const iter = chunk(0, [1, 2, 3]);
    expect([...iter]).toEqual([]);
  });

  it('should return empty iterable if the given size is 0 with toArray', () => {
    const iter = mori.toArray(chunk(0, [1, 2, 3]));
    expect(iter).toEqual([]);
  });

  it('should chunk the given promise array', async () => {
    const iter = chunk(2, await Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9]));

    expect([...iter]).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
  });

  it('should chunk the given array promise', async () => {
    const iter = chunk(2, [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
      Promise.resolve(6),
      Promise.resolve(7),
      Promise.resolve(8),
      Promise.resolve(9),
    ]);

    expect(iter.next()).toEqual({ value: [Promise.resolve(1), Promise.resolve(2)], done: false });
    expect(iter.next()).toEqual({ value: [Promise.resolve(3), Promise.resolve(4)], done: false });
    expect(iter.next()).toEqual({ value: [Promise.resolve(5), Promise.resolve(6)], done: false });
    expect(iter.next()).toEqual({ value: [Promise.resolve(7), Promise.resolve(8)], done: false });
    expect(iter.next()).toEqual({ value: [Promise.resolve(9)], done: false });
    expect(iter.next()).toEqual({ value: undefined, done: true });
  });

  it('chunk with pipe', async () => {
    const iter = mori.pipe([1, 2, 3, 4, 5, 6, 7, 8, 9], chunk(2), mori.toArray);
    const iter2 = mori.pipe(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4)],
      chunk(2),
      mori.toArray,
    );
    const iter3 = await mori.pipe(Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9]), chunk(2), mori.toArray);
    const iter4 = mori.pipe(Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9]), chunk(2), mori.toArray);

    expect(iter).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
    expect(iter2).toEqual([
      [Promise.resolve(1), Promise.resolve(2)],
      [Promise.resolve(3), Promise.resolve(4)],
    ]);
    expect(iter3).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
    expect(iter4).resolves.toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
  });
});
