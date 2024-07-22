import pipe from '../pipe/pipe';
import concat from './concat';

describe('concat', () => {
  it('concat with one array', () => {
    const iter1 = [1, 2, 3];

    const res = concat(iter1);

    expect([...res]).toEqual([1, 2, 3]);
  });

  it('concat with two array', () => {
    const iter1 = [1, 2, 3];
    const iter2 = [4, 5, 6];

    const res = concat(iter1, iter2);

    expect([...res]).toEqual([1, 2, 3, 4, 5, 6]);
    const res2 = concat(iter1, iter2);

    expect(res2.next().value).toBe(1);
    expect(res2.next().value).toBe(2);
    expect(res2.next().value).toBe(3);
    expect(res2.next().value).toBe(4);
    expect(res2.next().value).toBe(5);
    expect(res2.next().value).toBe(6);
    expect(res2.next().done).toBe(true);
  });

  it('concat with three array', () => {
    const iter1 = [1, 2, 3];
    const iter2 = [4, 5, 6];
    const iter3 = [7, 8, 9];

    const res = concat(iter1, iter2, iter3);

    expect([...res]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const res2 = concat(iter1, iter2, iter3);

    expect(res2.next().value).toBe(1);
    expect(res2.next().value).toBe(2);
    expect(res2.next().value).toBe(3);
    expect(res2.next().value).toBe(4);
    expect(res2.next().value).toBe(5);
    expect(res2.next().value).toBe(6);
    expect(res2.next().value).toBe(7);
    expect(res2.next().value).toBe(8);
    expect(res2.next().value).toBe(9);
    expect(res2.next().done).toBe(true);
  });

  it('concat with different type of iterable', () => {
    const iter1 = [1, 2, 3];
    const iter2 = [{ a: 1 }, { a: 2 }, { a: 3 }];

    const res = concat(iter1, iter2);

    expect([...res]).toEqual([1, 2, 3, { a: 1 }, { a: 2 }, { a: 3 }]);
  });

  it('concat with empty array', () => {
    const iter1 = [1, 2, 3];
    const iter2: never[] = [];
    const iter3 = ['a', 'b', 'c'];

    const res = concat(iter1, iter2, iter3);

    expect([...res]).toEqual([1, 2, 3, 'a', 'b', 'c']);
  });
});
