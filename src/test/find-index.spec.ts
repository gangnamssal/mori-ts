import { findIndex, pipe, toAsync } from '../core';

describe('findIndex', () => {
  it('findIndex has value', () => {
    const arr = [1, 2, 3, 4, 5];

    const res = findIndex(x => x === 3, arr);

    expect(res).toBe(2);
  });

  it('findIndex has value 2', () => {
    const arr = [1, 2, 3, 4, 5];

    const res = findIndex(x => x > 3, arr);

    expect(res).toBe(3);
  });

  it('findIndex has no value', () => {
    const arr = [1, 2, 3, 4, 5];

    const res = findIndex(x => x === 6, arr);

    expect(res).toBe(-1);
  });

  it('findIndex has no value 2', () => {
    const arr = [1, 2, 3, 4, 5];

    const res = findIndex(x => x > 6, arr);

    expect(res).toBe(-1);
  });

  it('findIndex has value async', async () => {
    const arr = [1, 2, 3, 4, 5];

    const res = await pipe(
      arr,
      toAsync,
      findIndex(x => x === 3),
    );

    expect(res).toBe(2);
  });

  it('findIndex has value async 2', async () => {
    const arr = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ];

    const res = await pipe(
      arr,
      toAsync,
      findIndex(x => x === 3),
    );

    expect(res).toBe(2);
  });

  it('findIndex has value async 2', async () => {
    const arr = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
      Promise.resolve(5),
    ];

    const res = await pipe(
      arr,
      toAsync,
      findIndex(x => x + 5 > 11),
    );

    expect(res).toBe(-1);
  });

  it('findIndex has value with string', () => {
    const str = 'hello world';

    const res = findIndex(x => x === 'w', str);

    expect(res).toBe(6);
  });

  it('findIndex has value with string 2', () => {
    const str = '';

    const res = findIndex(x => x === 'w', str);

    expect(res).toBe(-1);
  });
});
