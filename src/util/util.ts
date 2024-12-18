import { Result, ok, err } from "neverthrow";

export function traverse<T, U>(
  items: T[],
  fn: (item: T) => Result<U, Error>,
): Result<U[], Error> {
  return items.reduce<Result<U[], Error>>((acc, item) => {
    return acc.isOk() ? fn(item).map((value) => [...acc.value, value]) : acc;
  }, ok([]));
}
