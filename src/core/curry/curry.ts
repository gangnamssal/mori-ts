/**
 * @description
 * - 다중 인수를 취하는 함수를 하나씩 인수를 공급할 수 있는 함수로 변환합니다.
 * - 이 함수는 함수를 부분 적용할 때 유용합니다.
 *
 * @example
 * - 두 인수를 더하는 함수
 * ```
 * const add = curry((a: number, b: number) => a + b);
 * const addOne = add(1);
 * const result = addOne(2);
 *
 * console.log(result); // 출력: 3
 * ```
 *
 * @example
 * - 세 인수를 더하는 함수
 * ```
 * const add = curry((a: number, b: number, c: number) => a + b + c);
 *
 * const addOne = add(1);
 * const addTwo = addOne(2);
 * const result = addTwo(3);
 *
 * console.log(result); // 출력: 6
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/curry
 */

function curry(fn: any, ...args: any) {
  return function inner(...innerArgs: any) {
    const allArgs = args.concat(innerArgs);

    if (allArgs.length >= fn.length) {
      return fn(...allArgs);
    }
    return curry(fn, ...allArgs);
  };
}

export default curry;
