import map from './map';

describe('map', () => {
  it('map with array', () => {
    // Arrange
    const array = [1, 2, 3];

    // Act
    const result = map(value => value * 2, array);
    const result2 = map(value => value * 2)(array);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
    // expect(Array(result2)).toEqual([2, 4, 6]);
  });

  it('map with set', () => {
    // Arrange
    const set = new Set([1, 2, 3]);

    // Act
    const result = map(value => value * 2, set);
    const result2 = map(value => value * 2)(set);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
    // expect(Array(result2)).toEqual([2, 4, 6]);
  });

  it('map with map', () => {
    // Arrange
    const map1 = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    // Act
    const result = map(([key, value]) => value * 2, map1);
    const result2 = map(([key, value]) => value * 2)(map1);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
    // expect(Array(result2)).toEqual([2, 4, 6]);
  });

  it('map with promise', async () => {
    const promise = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

    const result = map(value => value * 2, promise);
    const result2 = map(value => value * 2)(promise);

    expect([...result]).toEqual([Promise.resolve(2), Promise.resolve(4), Promise.resolve(6)]);
    // expect(Array(result2)).toEqual([Promise.resolve(2), Promise.resolve(4), Promise.resolve(6)]);
  });

  it('map with promise', async () => {
    const promise = [1, Promise.resolve(2), Promise.resolve(3)];

    const result = map(value => value * 2, promise);
    const result2 = map(value => value * 2)(promise);

    expect([...result]).toEqual([2, Promise.resolve(4), Promise.resolve(6)]);
    // expect(Array(result2)).toEqual([Promise.resolve(2), Promise.resolve(4), Promise.resolve(6)]);
  });

  it('map with promise, number', async () => {
    const promise = Promise.resolve([1, 2, 3]);

    const result = map(value => value * 2, await promise);
    const result2 = map((value: number) => value * 2)(await promise);

    expect([...result]).toEqual([2, 4, 6]);
    // expect(Array(result2)).toEqual([2, 4, 6]);
  });

  it('map with promise, promise', async () => {
    const promise = Promise.resolve([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);

    const result = map(value => value * 2, await promise);
    const result2 = map((value: number) => value * 2)(await promise);

    expect([...result]).toEqual([Promise.resolve(2), Promise.resolve(4), Promise.resolve(6)]);
    // expect(Array(result2)).toEqual([2, 4, 6]);
  });

  it('map with promise', async () => {
    const promise = Promise.resolve([1, 2, 3]);

    const result = map(value => value * 2, await promise);
    const result2 = map(value => value * 2, await promise);
    const result3 = map(value => value * 2)(await promise);

    expect(result.next()).toEqual({ done: false, value: 2 });
    expect(result.next()).toEqual({ done: false, value: 4 });
    expect(result.next()).toEqual({ done: false, value: 6 });
    expect(result.next()).toEqual({ done: true, value: undefined });

    expect([...result2]).toEqual([2, 4, 6]);

    // expect(Array(result3)).toEqual([2, 4, 6]);
  });

  it('map with iterable', () => {
    // Arrange
    const iterable = (function* () {
      yield 1;
      yield 2;
      yield 3;
    })();

    // Act
    const result = map(value => value * 2, iterable);

    // Arrange
    const iterable2 = (function* () {
      yield 1;
      yield 2;
      yield 3;
    })();

    // Act
    const result2 = map((value: 1 | 2 | 3) => value * 2)(iterable2);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
    // expect(Array(result2)).toEqual([2, 4, 6]);
  });

  it('map with promise', async () => {
    // Arrange
    const promise = Promise.resolve([1, 2, 3]);

    // Act
    const result = map(value => value * 2, await promise);
    const result2 = map(value => value * 2)(await promise);

    // Assert
    expect([...result]).toEqual([2, 4, 6]);
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

    // Act
    const result = map(value => value * 2, asyncIterable);
    const result2 = map(value => value * 2)(asyncIterable);

    expect(result.next()).resolves.toEqual({ done: false, value: 2 });
    expect(result.next()).resolves.toEqual({ done: false, value: 4 });
    expect(result.next()).resolves.toEqual({ done: false, value: 6 });
    expect(result.next()).resolves.toEqual({ done: true, value: undefined });

    // expect(Array(result2)).resolves.toEqual([2, 4, 6]);
  });
});
