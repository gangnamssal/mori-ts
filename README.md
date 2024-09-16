# mori-ts

#### mori-ts는 JavaScript 및 TypeScript 개발자를 위한 함수형 프로그래밍 라이브러리입니다. 이 라이브러리는 동기 및 비동기 iterable 객체를 처리하는 데 필요한 다양한 유틸리티 함수를 제공합니다.

#### mori-ts is a functional programming library for JavaScript and TypeScript developers. This library provides various utility functions necessary for handling synchronous and asynchronous iterable objects.

## Index

[1.Install](#install)

[2.Main Function](#main-function)

[3.Concept](#concept)

[3.Core](#core)

- [at](#at)
- [chunk](#chunk)
- [compact](#compact)
- [concat](#concat)
- [concurrent](#concurrent)
- [curry](#curry)
- [delay](#delay)
- [delayEach](#delayeach)
- [delayIter](#delayiter)
- [drop](#drop)
- [each](#each)
- [every](#every)
- [filter](#filter)
- [find](#find)
- [flat](#flat)
- [flatMap](#flatMap)
- [join](#join)
- [length](#length)
- [map](#map)
- [pipe](#pipe)
- [range](#range)
- [reduce](#reduce)
- [reverse](#reverse)
- [some](#some)
- [take](#take)
- [toArray](#toarray)
- [toAsync](#toasync)
- [toIterValue](#toitervalue)
- [zip](#zip)

[4.License](#license)

## Install

npm

```markdown
npm install mori-ts
```

yarn

```markdown
yarn add mori-ts
```

pnpm

```markdown
pnpm install mori-ts
```

## Main Function

- **고차 함수 지원 (Support for Higher-Order Functions) :** 함수들을 조합하여 복잡한 로직을 간단하게 구현할 수 있습니다.

- **지연 평가 (Lazy Evaluation) :** 계산을 필요할 때까지 미루어 성능을 최적화합니다.

- **다양한 iterable 처리 (Handling Various Iterables) :** 배열, 객체, 비동기 iterable 등 다양한 데이터 구조를 지원합니다.

## Concept

### 1. 단일 함수로 사용 (Used as a Single Function)

#### 모든 함수는 단독으로 사용할 수 있습니다.

```ts
import { map, filter, toArray } from 'mori-ts';

const arr = [1, 2, 3, 4, 5];

const mappedResult = toArray(map(a => a * 2, arr));

const filteredResult = toArray(filter(a => a % 2 === 0, arr));
```

### 2. pipe 라인으로 사용 (Used in a Pipeline)

#### 모든 함수는 pipe 라인과 사용할 수 있습니다.

```ts
import { pipe, map, range, filter, toArray } from 'mori-ts';

const res = pipe(
  range(1, 10),
  map(a => a * 2),
  filter(a => a % 2),
  toArray,
);
```

## Core

### at

- 주어진 인덱스에 해당하는 요소를 반환합니다.

- 인덱스가 음수일 경우, 배열의 끝에서부터 요소를 반환합니다.

- 동기 및 비동기 iterable 모두를 지원합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/at

### chunk

- 주어진 동기 및 비동기 iterable를 지정된 크기만큼의 배열로 나누어 반환합니다.

- 동기 및 비동기 iterable 모두를 지원합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/chunk

### compact

- 주어진 동기 및 비동기 iterable에서 falsy 값을 제거하여 반환합니다.

- 동기 및 비동기 iterable 모두를 지원합니다.

- 예시(Example): https://github.com/gangnamssal/mori-ts/wiki/compact

### concat

- 주어진 동기 iterable들을 연결하여 하나의 iterable로 반환합니다.

- 배열, 객체 배열, 빈 배열 등 다양한 타입의 iterable을 처리할 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/concat

### concurrent

- 비동기 작업을 병렬로 처리할 수 있도록 도와줍니다.

- 이 함수는 비동기 iterable을 처리할 때 동시에 실행할 최대 작업 수를 제한하여 병목 현상을 줄이고 성능을 향상시킵니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/concurrent

### curry

- 다중 인수를 취하는 함수를 하나씩 인수를 공급할 수 있는 함수로 변환합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/curry

### delay

- 주어진 시간(ms) 동안 대기한 후 지정된 값을 반환하거나 기본값인 undefined를 반환합니다.

- 주로 비동기 작업 시 특정 시간 동안 대기해야 할 때 유용하게 사용됩니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/delay

### delayEach

- 주어진 지연 시간 동안 각 요소를 대기하면서 제공된 iterable을 반환하는 함수입니다.

- 이 함수는 동기 및 비동기 iterable 모두를 지원하며, 비동기 작업에서 각 요소의 처리를 일정 시간 간격으로 지연시킬 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/delayEach

### delayIter

- 주어진 지연 시간(ms) 동안 각 요소의 반환을 대기하며 iterable을 생성하는 함수입니다.

- 이 함수는 동기와 비동기 iterable 모두를 지원합니다. 이를 통해 각 요소가 일정한 시간 간격으로 처리되도록 제어할 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/delayIter

### drop

- 처음 n개의 요소를 생략하고, 나머지 요소를 반환하는 함수입니다.

- 동기 및 비동기 iterable을 모두 지원합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/drop

### each

- 각 요소에 대해 지정된 함수를 실행하는 고차 함수입니다.

- 원본 iterable을 변경하지 않고 그대로 반환합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/each

### every

- 모든 요소가 특정 조건을 만족하는지 확인하는 함수입니다.

- 조건을 만족하면 true를, 하나라도 만족하지 않으면 false를 반환합니다.

- 동기 및 비동기 iterable 모두에서 작동할 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/every

### filter

- 주어진 조건을 만족하는 요소만 포함된 iterable을 반환합니다.

- 조건을 만족하지 않는 요소는 제외됩니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/filter

### find

- 주어진 조건을 만족하는 첫 번째 요소를 찾습니다.

- 조건을 만족하는 요소가 발견되면 해당 요소를 반환하고, 조건을 만족하는 요소가 없으면 undefined를 반환합니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/find

### flat

- 중첩된 iterable을 평평하게 만들어 단일 레벨의 iterable로 변환합니다.

- 깊이의 제어 없이 배열을 단일 레벨로 펼칩니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/flat

### flatMap

- iterable의 각 요소에 대해 제공된 함수를 적용하고, 결과로 얻어진 배열을 평평하게(flatten) 만들어 반환합니다.

- 각 요소를 변환하여 여러 값을 생성한 뒤, 이 값을 단일 레벨로 펼쳐줍니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/flatMap

### join

- iterable의 요소들을 지정된 구분자(separator)로 연결하여 하나의 문자열로 반환합니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/join

### length

- length 함수는 iterable의 요소 개수를 반환합니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/length

### map

- 주어진 함수를 iterable의 각 요소에 적용하여 새로운 이터러블을 생성합니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/map

### pipe

- 여러 개의 함수를 연결하여 데이터를 처리합니다.

- 이 함수는 입력값을 첫 번째 함수에 전달하고, 각 함수의 출력값을 다음 함수의 입력값으로 사용하는 방식으로 작동합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/pipe

### range

- range 함수는 특정 범위의 숫자를 생성합니다.

- 시작값, 종료값, 그리고 옵션으로 단계(step)를 지정하여 숫자 시퀀스를 생성합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/range

### reduce

- iterable 객체의 요소를 하나의 값으로 축소합니다.

- 누산기(accumulator)와 현재 값(current value)을 기반으로 최종 결과를 계산합니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/reduce

### reverse

- iterable 객체의 요소를 역순으로 반환합니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- 문자열, Map, Set 등 다양한 iterable 객체를 지원합니다.

- pipe 함수와 함께 사용하여 다양한 조합의 함수 체인을 만들 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/reverse

### some

- 주어진 조건을 만족하는 요소가 iterable 객체에 존재하는지를 검사합니다.

- 조건이 참인 요소가 하나라도 있으면 true를 반환하고, 그렇지 않으면 false를 반환합니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/some

### take

- iterable에서 처음 n개의 요소를 추출합니다.

- 동기 및 비동기 iterable 모두에서 사용될 수 있습니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/take

### toArray

- iterable을 배열로 변환하는 유틸리티 함수입니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/toArray

### toAsync

- iterable을 비동기 iterable로 변환합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/toAsync

### toIterValue

- toIterValue 함수는 주어진 iterable 객체에서 값을 추출합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/toIterValue

### zip

- 두 개의 iterable(반복 가능한 객체)을 병합하여 각각의 요소를 쌍으로 묶은 새로운 iterable을 생성합니다.

- **예시(Example)** : https://github.com/gangnamssal/mori-ts/wiki/zip

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
