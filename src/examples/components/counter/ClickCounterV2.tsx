import React from "react";
import { useCounter } from "../../hooks/useCounter";

interface Props {
  initial: number;
}

export const ClickCounterV2: React.FC<Props> = props => {
  const { value, next, previous } = useCounter(props.initial);

  const onPrevious = () => {
    previous();
  };

  const onNext = () => {
    next();
  };

  return (
    <>
      <button onClick={onPrevious}>Previous</button>
      {value}
      <button onClick={onNext}>Next</button>
    </>
  );
};
