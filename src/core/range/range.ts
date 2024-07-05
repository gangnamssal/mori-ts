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
