import React, { useContext } from "react";

enum Themes {
  Dark = "Dark",
  Light = "Light"
}

const ThemeContext = React.createContext<Themes>(Themes.Dark);

export const ThemeProvider: React.FC = () => (
  <ThemeContext.Provider value={Themes.Dark}>
    <ButtonRow></ButtonRow>
  </ThemeContext.Provider>
);

const ButtonRow: React.FC = () => (
  <section>
    <Button></Button>
    <Button></Button>
    <Button></Button>
  </section>
);

const Button: React.FC = () => {
  const theme = useContext(ThemeContext);

  const className = "button " + theme;

  return <button className={className}></button>;
};
