/**
 * @description
 * - 주어진 시간(ms) 동안 대기한 후 지정된 값을 반환하거나 기본값인 undefined를 반환합니다.
 * - 주로 비동기 작업 시 특정 시간 동안 대기해야 할 때 유용하게 사용됩니다.
 *
 * @example
 * - 기본 사용법
 * ```
 * const result = await delay(1000, 1);
 * 
 * console.log(result); // 1초 대기 후 출력: 1
 * ```
 *
 * @example
 * - 값 없이 사용
 * ```
 * const result = await delay(1000);
 * 
 * console.log(result); // 1초 대기 후 출력: undefined
 * ```

 * @example
 * - pipe와 함께 사용
 * ```
 * const start = Date.now();
 * 
 * const res = await pipe(
 *  [1, 2, 3],
 *  toAsync,
 *  map(value => delay(1000, value)),
 *  toArray,
 * );
 * 
 * const end = Date.now();
 * 
 * console.log(res); // 각 요소를 1초씩 대기 후 처리 출력: [1, 2, 3]
 * console.log(`Elapsed time: ${end - start}ms`); // time: 약 3000ms
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/delay
 */

function delay(time: number): Promise<void>;

function delay<A>(time: number, value: A): Promise<A>;

function delay<A>(time: number, value?: A): Promise<A | undefined> {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.catch(reject);
    }

    setTimeout(() => {
      resolve(value);
    }, time);
  });
}
export default delay;
