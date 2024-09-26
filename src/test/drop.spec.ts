import { toArray, pipe, toAsync, drop } from '../core';

describe('drop', () => {
  it('should drop the first n elements from the iterable', () => {
    const iter = drop(2, [1, 2, 3, 4, 5]);
    const iter2 = toArray(drop(2, [1, 2, 3, 4, 5]));

    expect([...iter]).toEqual([3, 4, 5]);
    expect(iter2).toEqual([3, 4, 5]);
  });

  it('should drop the first n elements from the iterable with toArray', () => {
    const iter = toArray(drop(2, [1, 2, 3, 4, 5]));
    expect(iter).toEqual([3, 4, 5]);
  });

  it('should drop the first n elements from the promise iterable', async () => {
    const iter = drop(2, await Promise.resolve([1, 2, 3, 4, 5]));
    expect([...iter]).toEqual([3, 4, 5]);
  });

  it('should drop the first n elements from the promise iterable with toArray', async () => {
    const iter = toArray(drop(2, await Promise.resolve([1, 2, 3, 4, 5])));
    expect(iter).toEqual([3, 4, 5]);
  });

  it('should drop the first n elements from the iterable promise', () => {
    const iter = drop(2, [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ]);

    expect(iter.next().value).resolves.toEqual(3);
    expect(iter.next().value).resolves.toEqual(4);
    expect(iter.next().value).resolves.toEqual(5);
  });

  it('should drop the first n elements from the iterable promise with toArray', () => {
    const iter = toArray(
      drop(2, [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
        Promise.resolve(4),
        Promise.resolve(5),
      ]),
    );
    expect(iter).toEqual([Promise.resolve(3), Promise.resolve(4), Promise.resolve(5)]);
    expect(iter[0]).resolves.toEqual(3);
    expect(iter[1]).resolves.toEqual(4);
    expect(iter[2]).resolves.toEqual(5);
  });

  it('should yield an empty iterable if n is greater than the length of the iterable', () => {
    const iter = drop(10, [1, 2, 3, 4, 5]);
    expect([...iter]).toEqual([]);

    const iter2 = drop(5, [1, 2, 3, 4, 5]);
    expect([...iter2]).toEqual([]);
  });

  it('should yield an full iterable if n is negative', () => {
    const iter = drop(-1, [1, 2, 3, 4, 5]);
    expect([...iter]).toEqual([1, 2, 3, 4, 5]);
  });

  it('should yield an empty iterable if the iterable is empty', () => {
    const iter = drop(10, []);
    expect([...iter]).toEqual([]);
  });

  it('should yield an empty iterable if n is 0', () => {
    const iter = drop(0, [1, 2, 3, 4, 5]);
    expect([...iter]).toEqual([1, 2, 3, 4, 5]);
  });

  it('should be able to take a string as an argument', () => {
    const iter = drop(2, 'hello');
    expect([...iter]).toEqual(['l', 'l', 'o']);
  });

  it('should return an empty iterable if the string is empty', () => {
    const iter = drop(2, '');
    expect([...iter]).toEqual([]);
  });

  it('drop with pipe', async () => {
    const iter = pipe(Promise.resolve([1, 2, 3, 4, 5]), drop(2), toArray);
    const iter2 = await pipe(Promise.resolve([1, 2, 3, 4, 5]), drop(2), toArray);

    expect(iter).resolves.toEqual([3, 4, 5]);
    expect(iter2).toEqual([3, 4, 5]);
  });

  it('drop with toAsync', async () => {
    const iter = [1, 2, 3, 4, 5];

    const res = pipe(iter, toAsync, drop(2), toArray);
    expect(res).resolves.toEqual([3, 4, 5]);

    const res2 = await pipe(iter, toAsync, drop(2), toArray);
    expect(res2).toEqual([3, 4, 5]);

    const res3 = pipe([], toAsync, drop(2), toArray);
    expect(res3).resolves.toEqual([]);

    const res4 = await pipe([], toAsync, drop(2), toArray);
    expect(res4).toEqual([]);
  });
});
