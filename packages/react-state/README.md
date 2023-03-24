<div align="center">

# React State

⚡ by [Open Tech World](https://open-tech-foundation.pages.dev/)

[![Build](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml/badge.svg)](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@opentf/react-state/latest?label=Min%2BGZip)](https://bundlephobia.com/package/@opentf/react-state)

</div>

> A shared state management library for React.

## Features

- Simple API
- No context providers
- Components are re-rendered only when the selector value changes
- It can shallow diff custom selector objects
- It supports async actions
- TypeScript support

## Installation

Using npm

```shell
npm install @opentf/react-state
```

Using Yarn

```shell
yarn add @opentf/react-state
```

## Usage

```jsx
import { createState } from '@opentf/react-state';

const useAppState = createState({});

function App() {
  const [state, setState] = useAppState((s) => s, { set: true });
  console.log(state);

  return (
    <>
      <button onClick={() => setState((s) => ({ obj: value }))}>
        Change State
      </button>
    </>
  );
}
```

## Usage (TypeScript)

```tsx
import { createState } from '@opentf/react-state';

interface AppState {
  obj1: type1;
  obj2: type2;
}

const appState: AppState = { obj1: value, obj2: value };

const useAppState = createState(appState);

function App() {
  const [state, setState] = useAppState((s) => s, { set: true });
  console.log(state);

  return (
    <>
      <button onClick={() => setState((s) => ({ obj1: newValue }))}>
        Change State
      </button>
    </>
  );
}
```

## Documentation

Please read the complete documentation at: [https://react-app-state.pages.dev/](https://react-app-state.pages.dev/)

## License

Copyright (c) 2021, [Thanga Ganapathy](https://github.com/Thanga-Ganapathy) ([MIT License](../../LICENSE)).
