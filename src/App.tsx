import React from "react";
import { ClickCounter } from "./examples/components/counter/ClickCounter";
import { ClickCounterV2 } from "./examples/components/counter/ClickCounterV2";
import { ClickCounterV3 } from "./examples/components/counter/ClickCounterV3";
import { ClickCounterV4 } from "./examples/components/counter/ClickCounterV4";
import { ThemeProvider } from "./examples/components/theme/ThemeProvider";

const App: React.FC = () => {
  return (
    <>
      <ClickCounter initial={0}></ClickCounter>
      <hr />
      <ClickCounterV2 initial={0}></ClickCounterV2>
      <hr />
      <ClickCounterV3 initial={0}></ClickCounterV3>
      <hr />
      <ClickCounterV4 initial={0}></ClickCounterV4>
      <hr />
      <ThemeProvider></ThemeProvider>
    </>
  );
};

export default App;
