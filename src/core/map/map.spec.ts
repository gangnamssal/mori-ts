import map from './map';

describe('map', () => {
  it('map with array', () => {
    // Arrange
    const array = [1, 2, 3];
    const callback = (value: number) => value * 2;

    // Act
    const result = map(callback, array);
    const result2 = map(callback)(array);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
    expect([...result2]).toEqual([2, 4, 6]);
  });

  it('map with set', () => {
    // Arrange
    const set = new Set([1, 2, 3]);
    const callback = (value: number) => value * 2;

    // Act
    const result = map(callback, set);
    const result2 = map(callback)(set);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
    expect([...result2]).toEqual([2, 4, 6]);
  });

  it('map with map', () => {
    // Arrange
    const map1 = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const callback = ([key, value]: [string, number]) => value * 2;

    // Act
    const result = map(callback, map1);
    const result2 = map(callback)(map1);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
    expect([...result2]).toEqual([2, 4, 6]);
  });

  it('map with promise', async () => {
    const promise = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
    const callback = (value: number) => value * 2;

    const result = map(callback, promise);

    expect(result.next()).toEqual({ done: false, value: Promise.resolve(2) });
    expect(result.next()).toEqual({ done: false, value: Promise.resolve(4) });
    expect(result.next()).toEqual({ done: false, value: Promise.resolve(6) });
    expect(result.next()).toEqual({ done: true, value: undefined });
  });

  it('map with promise', async () => {
    const promise = Promise.resolve([1, 2, 3]);
    const callback = (value: number) => value * 2;

    const result = map(callback)(await promise);

    expect(result.next()).toEqual({ done: false, value: 2 });
    expect(result.next()).toEqual({ done: false, value: 4 });
    expect(result.next()).toEqual({ done: false, value: 6 });
    expect(result.next()).toEqual({ done: true, value: undefined });
  });

  it('map with promise', async () => {
    const promise = Promise.resolve([1, 2, 3]);
    const callback = (value: number) => value * 2;

    const result = map(callback)(await promise);
    const result2 = map(callback, await promise);

    expect(result.next()).toEqual({ done: false, value: 2 });
    expect(result.next()).toEqual({ done: false, value: 4 });
    expect(result.next()).toEqual({ done: false, value: 6 });
    expect(result.next()).toEqual({ done: true, value: undefined });

    expect([...result2]).toEqual([2, 4, 6]);
  });

  it('map with iterable', () => {
    // Arrange
    const iterable = (function* () {
      yield 1;
      yield 2;
      yield 3;
    })();
    const callback = (value: number) => value * 2;

    // Act
    const result = map(callback, iterable);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
  });

  it('map with promise', async () => {
    // Arrange
    const promise = Promise.resolve([1, 2, 3]);
    const callback = (value: number) => value * 2;

    // Act
    const result = map(callback, await promise);
    const result2 = map(callback, await promise);

    // Assert
    expect(await Promise.all(result)).toEqual([2, 4, 6]);
    expect(result2.next()).toEqual({ done: false, value: 2 });
    expect(result2.next()).toEqual({ done: false, value: 4 });
    expect(result2.next()).toEqual({ done: false, value: 6 });
  });

  it('map with async iterable', async () => {
    // Arrange
    const asyncIterable = (async function* () {
      yield 1;
      yield 2;
      yield 3;
    })();
    const callback = (value: number) => value * 2;

    // Act
    const result = map(callback, asyncIterable);

    expect(result.next()).resolves.toEqual({ done: false, value: 2 });
    expect(result.next()).resolves.toEqual({ done: false, value: 4 });
    expect(result.next()).resolves.toEqual({ done: false, value: 6 });
    expect(result.next()).resolves.toEqual({ done: true, value: undefined });
  });
});
