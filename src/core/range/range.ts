/**
 * @description
 * - range 함수는 특정 범위의 숫자를 생성합니다.
 * - 시작값, 종료값, 그리고 옵션으로 단계(step)를 지정하여 숫자 시퀀스를 생성합니다.
 *
 * @example
 * - 기본 사용법
 * ```
 * const numbers = [...range(5)]; // 출력: [0, 1, 2, 3, 4]
 * const numbers2 = toArray(range(5)); // 출력: [0, 1, 2, 3, 4]
 * ```
 *
 * @example
 * - 시작값과 종료값 지정
 * ```
 * const numbers = [...range(2, 5)]; // 출력: [2, 3, 4]
 * const numbers2 = toArray(range(2, 5)); // 출력: [2, 3, 4]
 * ```
 *
 * @example
 * - 단계(step) 지정
 * ```
 * const numbers = [...range(2, 10, 2)]; // 출력: [2, 4, 6, 8]
 * const numbers2 = toArray(range(2, 10, 2)); // 출력: [2, 4, 6, 8]
 * ```
 *
 * @example
 * - 음수 단계 지정
 * ```
 * const numbers = [...range(5, 0, -1)]; // 출력: [5, 4, 3, 2, 1]
 * const numbers2 = toArray(range(5, 0, -1)); // 출력: [5, 4, 3, 2, 1]
 * ```
 *
 * @example
 * - pipe와 함께 사용
 * ```
 * const result = pipe(range(5), toArray); // 출력: [0, 1, 2, 3, 4]
 *
 * const result2 = pipe(range(2, 5), toArray); // 출력: [2, 3, 4]
 *
 * const result3 = pipe(range(2, 10, 2), toArray); // 출력: [2, 4, 6, 8]
 * ```
 *
 * @url https://github.com/gangnamssal/mori-ts/wiki/range
 */

export default function* range(start = 0, stop = start, step = 1): Iterable<number> {
  if (arguments.length === 1) start = 0;
  if (arguments.length < 3 && start > stop) step *= -1;
  if (start > stop && step > 0) step *= -1;

  if (start < stop) {
    while (start < stop) {
      yield start;
      start += step;
    }
  } else {
    while (start > stop) {
      yield start;
      start += step;
    }
  }
}
