import { ADT, match } from "./helpers";
import { Error } from "./error";

type Result<A, B> = ADT<{
  Ok: { value: A };
  Err: { value: B };
}>;

const unwrap = <A, B extends string>(expr: Result<A, B>) =>
  match(expr)({
    Ok: ({ value }) => value,
    Err: ({ value }) => Error.raise(value),
  });

const Result = {
  Ok: <A, B = never>(value: A): Result<A, B> => ({ tag: "Ok", value }),
  Err: <B, A = never>(value: B): Result<A, B> => ({ tag: "Err", value }),
  unwrap,
};

(() => {
  const value = Result.Err("should fail");
  console.log(Result.unwrap(value));
})();
