<div align="center">

# React State

⚡ by [OPEN TECH FOUNDATION](https://open-tech-foundation.pages.dev/)

[![Build](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml/badge.svg)](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml)

</div>

> A shared/global state management library for React.

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

Using pnpm

```shell
pnpm add @opentf/react-state
```

## Usage

```jsx
import { create } from '@opentf/react-state';

const [useAppState, setAppState, api] = createState({ count: 0 });

api.subscribe(console.log)

function App() {
  const count = useAppState((s) => s.count);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setAppState((s) => ({ count: s.count + 1 }))}>
        Change State
      </button>
    </>
  );
}
```

## Usage (TypeScript)

```tsx
import { create } from '@opentf/react-state';

interface AppState {
  name: string;
  age: number;
}

const appState: AppState = { name: 'Xyz', age: '25' };

const [useAppState, setAppState, api] = createState(appState);

api.subscribe(console.log)

function App() {
  const state = useAppState((s) => s);

  return (
    <>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <button onClick={() => setState((s) => ({ name: '' }))}>
        Change State
      </button>
    </>
  );
}
```

## Documentation

Visit [https://react-app-state.pages.dev/](https://react-app-state.pages.dev/) for complete doucmentation.

## License

Copyright (c) 2021, [Thanga Ganapathy](https://github.com/Thanga-Ganapathy) ([MIT License](./LICENSE)).
