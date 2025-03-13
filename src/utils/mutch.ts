type Pattern<V> = (v: V) => boolean;
type Handler<V> = (v: V) => V | any;
type Case<V> = {
  pattern: Pattern<V>;
  handler: Handler<V>;
};

/**
 * Создает утилиту для сопоставления с образцом для заданного значения.
 *
 * @param value - Значение, с которым производится сопоставление.
 * @return - Объект, содержащий функции `when`, `_` И `run` для построения цепочки сопоставления с образцом.
 */
export var match = <T>(value: T) => {
  let cases: Case<T>[] = [];

  const when = (valueIs: Pattern<T>, execute: Handler<T>) => (
    (cases = cases.concat({pattern: valueIs, handler: execute})), {when, _, run}
  );
  const _ = (execute: Handler<T>) => ((cases = cases.concat({pattern: () => true, handler: execute})), {run});
  const run = () => cases.find(({pattern}) => pattern(value))?.handler(value);

  return {
    when,
    _
  };
};