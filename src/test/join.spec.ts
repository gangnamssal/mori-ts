import { map, pipe, range, toAsync, join } from '../core';

describe('join', () => {
  it('joins an array of strings with a separator', () => {
    const result = join(' ', ['a', 'b', 'c']);
    expect(result).toBe('a b c');
  });

  it('joins an array of numbers with a separator', () => {
    const result = join('-', [1, 2, 3]);
    expect(result).toBe('1-2-3');
  });

  it('joins an array of strings with a different separator', () => {
    const result = join('..', ['a', 'b', 'c']);
    expect(result).toBe('a..b..c');
  });

  it('joins an array of numbers with a different separator', () => {
    const result = join('..', [1, 2, 3]);
    expect(result).toBe('1..2..3');
  });

  it('joins an array of strings with no separator', () => {
    const result = join('', ['a', 'b', 'c']);
    expect(result).toBe('abc');
  });

  it('joins an array of numbers with no separator', () => {
    const result = join('', [1, 2, 3]);
    expect(result).toBe('123');
  });

  it('join with pipe', () => {
    const res = pipe(range(1, 4), map(String), join(','));

    expect(res).toBe('1,2,3');
  });

  it('object with a separator', () => {
    const obj = { a: 1, b: 2, c: 3 };

    const res = pipe(
      Object.entries(obj),
      map(([k, v]: [string, number]) => `${k}=${v}`),
      join('&'),
    );

    expect(res).toBe('a=1&b=2&c=3');
  });

  it('join with empty array', () => {
    const res = join(',', []);
    expect(res).toBe('');
  });

  it('join with async iterable', () => {
    const res = pipe(range(1, 4), toAsync, join(''));

    expect(res).resolves.toBe('123');
  });

  it('join with promise', () => {
    const res = pipe([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)], toAsync, join(''));

    expect(res).resolves.toBe('123');
  });
});
