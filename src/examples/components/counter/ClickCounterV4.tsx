import React, { useEffect } from "react";
import { useCounter } from "../../hooks/useCounter";

interface Props {
  initial: number;
}

export const ClickCounterV4: React.FC<Props> = props => {
  const { value, next, previous } = useCounter(props.initial);

  const onPrevious = () => {
    previous();
  };

  const onNext = () => {
    next();
  };

  useEffect(() => {
    document.title = value.toString();
  }, [value]);

  const isMaxValue = value === 5;
  const isMinValue = value === -5;

  return (
    <>
      <button onClick={onPrevious} disabled={isMinValue}>
        Previous
      </button>
      {value}
      <button onClick={onNext} disabled={isMaxValue}>
        Next
      </button>
    </>
  );
};
