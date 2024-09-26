import { pipe, toArray, toIterValue, each } from '../core';

const logMessage = (message: any) => {
  console.log(message);
};

describe('each', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // console.log를 모킹합니다.
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // 테스트가 끝난 후 원래 상태로 복원합니다.
    consoleSpy.mockRestore();
  });

  it('each with array', () => {
    const arr = [1, 2, 3];

    let sum = 0;

    const res = toArray(each(x => (sum += x), arr));

    expect(res).toEqual([1, 2, 3]);
    expect(sum).toEqual(6);
  });

  it('each with array 2', () => {
    const arr = [1, 2, 3];

    let sum = 0;

    const res = each(x => (sum += x), arr);

    expect(toIterValue(res)).toBe(1);
    expect(sum).toEqual(1);

    expect(toIterValue(res)).toBe(2);
    expect(sum).toEqual(3);

    expect(toIterValue(res)).toBe(3);
    expect(sum).toEqual(6);
  });

  it('each with array 3', () => {
    const arr = [1, 2, 3];

    const res = pipe(arr, each(logMessage), toArray);

    expect(res).toEqual([1, 2, 3]);
    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });
});
