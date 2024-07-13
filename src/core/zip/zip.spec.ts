import zip from './zip';
import toArray from '../to-array/to-array';
import toAsync from '../to-async/to-async';
import pipe from '../pipe/pipe';

describe('zip', () => {
  it('should zip two iterable', () => {
    const result = zip([1, 2, 3], ['a', 'b', 'c']);
    expect([...result]).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    const result2 = toArray(zip([1, 2, 3], ['a', 'b', 'c']));
    expect(result2).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('should zip two arrays with different lengths', () => {
    const result = zip([1, 2, 3], ['a', 'b']);
    expect([...result]).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('should zip two arrays with different lengths', () => {
    const result = zip([1, 2], ['a', 'b', 'c']);
    expect([...result]).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('should zip two arrays with zero length', () => {
    const result = zip([], []);
    expect([...result]).toEqual([]);

    const result2 = toArray(zip([], []));
    expect(result2).toEqual([]);
  });

  it('should zip two arrays with zero length', () => {
    const result = zip([1, 2], []);
    expect([...result]).toEqual([]);

    const result2 = toArray(zip([1, 2], []));
    expect(result2).toEqual([]);
  });

  it('zip with async iterable', () => {
    const iter1 = toAsync([1, 2, 3]);
    const iter2 = toAsync(['a', 'b', 'c']);

    const res = zip(iter1, iter2);
    expect(res.next()).resolves.toEqual({ value: [1, 'a'], done: false });
    expect(res.next()).resolves.toEqual({ value: [2, 'b'], done: false });
    expect(res.next()).resolves.toEqual({ value: [3, 'c'], done: false });
    expect(res.next()).resolves.toEqual({ value: undefined, done: true });
  });

  it('zip with async iterable with iterable', () => {
    const iter1 = toAsync([1, 2, 3]);
    const iter2 = ['a', 'b', 'c'];
    const res = zip(iter1, iter2);
    expect(res.next()).resolves.toEqual({ value: [1, 'a'], done: false });
    expect(res.next()).resolves.toEqual({ value: [2, 'b'], done: false });
    expect(res.next()).resolves.toEqual({ value: [3, 'c'], done: false });
    expect(res.next()).resolves.toEqual({ value: undefined, done: true });

    const iter3 = [1, 2, 3];
    const iter4 = toAsync(['a', 'b', 'c']);
    const res2 = zip(iter3, iter4);
    expect(res2.next()).resolves.toEqual({ value: [1, 'a'], done: false });
    expect(res2.next()).resolves.toEqual({ value: [2, 'b'], done: false });
    expect(res2.next()).resolves.toEqual({ value: [3, 'c'], done: false });
    expect(res2.next()).resolves.toEqual({ value: undefined, done: true });
  });

  it('zip with pipe', () => {
    const iter1 = toAsync([1, 2, 3]);
    const iter2 = toAsync(['a', 'b', 'c']);

    const res = pipe(iter2, zip(iter1), toArray);
    expect(res).resolves.toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    const iter3 = toAsync([1, 2, 3]);
    const iter4 = ['a', 'b', 'c'];
    const res2 = pipe(iter4, zip(iter3), toArray);
    expect(res2).resolves.toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    const iter5 = [1, 2, 3];
    const iter6 = toAsync(['a', 'b', 'c']);
    const res3 = pipe(iter6, zip(iter5), toArray);
    expect(res3).resolves.toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    const iter7 = [1, 2, 3];
    const iter8 = ['a', 'b', 'c'];
    const res4 = pipe(iter8, zip(iter7), toArray);
    expect(res4).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });
});
