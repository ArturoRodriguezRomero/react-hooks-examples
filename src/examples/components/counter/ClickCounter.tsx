import React, { useState } from "react";

interface Props {
  initial: number;
}

export const ClickCounter: React.FC<Props> = props => {
  const [counter, setCounter] = useState<number>(props.initial);

  const onClick = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <p>You have clicked {counter} times</p>
      <button onClick={onClick}>Click me</button>
    </>
  );
};
