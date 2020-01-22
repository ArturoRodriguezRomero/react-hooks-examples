import React, { useEffect } from "react";
import { useCounter } from "../../hooks/useCounter";

interface Props {
  initial: number;
}

export const ClickCounterV3: React.FC<Props> = props => {
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

  return (
    <>
      <button onClick={onPrevious}>Previous</button>
      {value}
      <button onClick={onNext}>Next</button>
    </>
  );
};
