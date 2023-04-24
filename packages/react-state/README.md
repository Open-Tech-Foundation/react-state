<div align="center">

# React State

⚡ by [OPEN TECH FOUNDATION](https://open-tech-foundation.pages.dev/)

[![Build](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml/badge.svg)](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml)

</div>

> A shared/global state management library for React.

## [View Demo](https://react-app-state.pages.dev/#demo)

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

const [useAppState, setAppState, api] = create({ count: 0 });

api.subscribe(console.log);

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
import React from 'react';
import { create } from '@opentf/react-state';

interface AppState {
  isLogin: boolean;
  user: {
    id: string;
    name: string;
  } | null;
  theme: string;
}

const appState: AppState = {
  isLogin: true,
  user: { id: 'abcdef', name: 'XXX' },
  theme: 'Dark',
};

const [useAppState, setAppState, api] = create(appState);

api.subscribe(console.log);

export default function App() {
  const { isLogin, user, theme } = useAppState((s) => s);

  function handleLogout() {
    setAppState((s) => ({ ...s, user: null, isLogin: false }));
  }

  return (
    <div data-theme={theme}>
      <p>Welcome {isLogin ? user?.name : 'Guest!'}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

## Documentation

Please visit [https://react-app-state.pages.dev/](https://react-app-state.pages.dev/) to get started.

## License

Copyright (c) 2021, [Thanga Ganapathy](https://github.com/Thanga-Ganapathy) ([MIT License](../../LICENSE)).
