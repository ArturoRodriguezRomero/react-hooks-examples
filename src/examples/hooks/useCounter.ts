import { useState } from "react";

export const useCounter = (initial: number) => {
  const [counter, setCounter] = useState(initial);

  const add = (value: number) => setCounter(counter + value);

  const next = () => add(1);

  const previous = () => add(-1);

  return { value: counter, next, previous };
};
