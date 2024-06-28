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
    expect(result2.next()).toEqual({ done: false, value: 2 });
    expect(result2.next()).toEqual({ done: false, value: 4 });
    expect(result2.next()).toEqual({ done: false, value: 6 });
    expect(result2.next()).toEqual({ done: true, value: undefined });
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
