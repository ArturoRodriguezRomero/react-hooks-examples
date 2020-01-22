# React Hooks - Tutorial

Este tutorial es una introducción a los Hooks de React 16.8

## Índice

- [¿Qué es un Hook?](#que-es)
- [useState](#use-state)
- [Creando un Hook propio](#creación-hook)
- [useEffect](#use-effect)
- [State Binding](#state-binding)
- [useContext](#use-context)

## ¿Qué es un Hook?

Un Hook es un mecanísmo que nos permite usar estado y otras características en un **componente funcional**.

Hasta la introducción de Hooks, los componentes funcionales tenían este aspecto:

```javascript
export const SimpleButton: React.FC<Props> = props => {
  return (
    <button className="simple-button" onClick={props.onClick}>
      {props.title}
    </button>
  );
};
```

Se utilizaban principalmente para:

- Componentes simples sin estado.
- Estilos reutilizables.

Con la API de Hooks, los componentes funcionales pasan a tener el mismo potencial que los componentes de clases. Y de manera más declarativa y sencilla.

## useState

`useState` es un Hook que nos permite guardar y modificar un estado en un componente funcional.

En el siguiente ejemplo se muestra un componente que cuenta cuantas veces se pulsa un botón.

```javascript
import React, { useState } from "react";

interface Props {
  initial: number;
}

export const ClickCounter: React.FC<Props> = props => {
  const [counter, setCounter] = useState < number > props.initial; // (A)

  const onClick = () => {
    setCounter(counter + 1); // (B)
  };

  return (
    <>
      <p>You have clicked {counter} times</p>
      <button onClick={onClick}>Click me</button>
    </>
  );
};
```

En `(A)` se está declarando el estado utilizado para contar las pulsaciones.

`useState` es una función que recibe un parámetro. Este es el valor inicial del estado.

`useState` devuelve un Array con dos posiciones:

- La primera es el valor actual del estado.
- La segunda es una función que permite modificar el estado.

La razón por la que se devuelve un Array y no un objeto es que un Array nos permite renombrar fácilmente los valores devueltos. Tanto como el estado como la función pueden tener cualquier nombre.

En `(B)` se está utilizando la función que modifica el estado.
Siempre que el estado de un componente funcional cambia, este se ejecuta de nuevo.

## Creando un Hook propio {#creacion-hook}

Uno de los objetivos principales de los Hooks es la reutilización de código común entre componentes.
En el siguiente ejemplo se va a crear un Hook propio que encapsule la lógica de un contador.

```javascript
import { useState } from "react";

export const useCounter = (initial: number) => {
  // (A)

  const [counter, setCounter] = useState(initial); // (B)

  const add = (value: number) => setCounter(counter + value); // (C)

  const next = () => add(1);

  const previous = () => add(-1);

  return { value: counter, next, previous }; // (D)
};
```

```javascript
import React from "react";
import { useCounter } from "../hooks/useCounter";

interface Props {
  initial: number;
}

export const ClickCounter: React.FC<Props> = props => {
  const { value, next, previous } = useCounter(props.initial); // (E)

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
```

En `(A)` se declara el Hook. Los Hooks son funciones que pueden recibir parámetros.

En `(B)` se declara el estado interno del Hook con el valor inicial del parámetro.

En `(C)` se declara la función `add` que se ocupará de modificar el estado.

En `(D)` se devuelven las variables y funciones a las que queremos tener acceso desde el componente.
En este Hook, se devuelve un objeto con las propiedades `value`, `next`, `previous`.
No se está devolviendo la función `add`. No es necesario y en este caso no queremos dar el poder de cambiar el estado desde el componente directamente, sin pasar por `next` o `previous`.

En `(E)` declaramos que queremos usar nuestro Hook `useCounter`.

## useEffect {#use-effect}

`useEffect` nos permite ejecutar un efecto secundario cuando se modifica una **prop** o un estado de **useState**.

En el siguiente ejemplo cambia el título del documento cuando el estado del contador cambie.

```javascript
import React, { useEffect } from "react";
import { useCounter } from "../hooks/useCounter";

interface Props {
  initial: number;
}

export const ClickCounter: React.FC<Props> = props => {
  const { value, next, previous } = useCounter(props.initial);

  const onPrevious = () => {
    previous();
  };

  const onNext = () => {
    next();
  };

  useEffect(() => {
    // (A)
    document.title = value.toString(); // (B)
  }, [value]); // (C)

  return (
    <>
      <button onClick={onPrevious}>Previous</button>
      {value}
      <button onClick={onNext}>Next</button>
    </>
  );
};
```

En `(A)`, vemos que `useEffect` es una función que recibe dos parámetros.
El primero es el callback, que se va a ejecutar cuando alguna de las dependencias cambie. Aquí se cambia el título del documento `(B)`.
En `(C)` declaramos las dependencias del efecto. Siempre que alguna de las dependencias cambie, el efecto se volverá a ejecutar.

## State Binding {#state-binding}

Sabiendo que los componentes funcionales se vuelven a ejecutar siempre que cambie una prop o estado, podemos servirnos de esto para cambiar la respuesta HTML fácilmente.

```javascript
import React, { useEffect } from "react";
import { useCounter } from "../../hooks/useCounter";

interface Props {
  initial: number;
}

export const ClickCounter: React.FC<Props> = props => {
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

  // (A)
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
```

En `(A)`, estamos declarando dos variables que controlarán si los botones de previous o next están deshabilitados.

## useContext {#use-context}

useContext es un Hook que nos permite acceder al contexto de un Provider. En el siguiente ejemplo se implementa un contexto para guardar el tema de la aplicación.

```javascript
import React, { useContext } from "react";

enum Themes {
  Dark = "Dark",
  Light = "Light"
}

const ThemeContext = React.createContext<Themes>(Themes.Dark); // (A)

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
  const theme = useContext(ThemeContext); // (B)

  const className = "button " + theme;

  return <button className={className}></button>;
};

```

En `(A)` se declara un contexto para almacenar el tema.
En `(B)` se utiliza el Hook `useContext` para obtener acceso al contexto superior.

## Dependencias {#dependencias}

- React 16.12.0
- Typescript 3.7.2

## Referencias {#referencias}

Para seguir con Hooks, aquí está la documentación oficial:

[reactjs.org/docs/hooks-intro](https://es.reactjs.org/docs/hooks-intro.html)

# React Hooks - Tutorial
