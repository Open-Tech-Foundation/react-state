<img align="left" src="https://open-tech-foundation.pages.dev/img/Logo.svg" width="50" height="50">

&nbsp;[OPEN TECH FOUNDATION](https://open-tech-foundation.pages.dev/)
<div align="center">

# React State

[![Build](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml/badge.svg)](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml)

</div>

> A shared/global state management library for React.

# [View Demo](https://react-app-state.pages.dev/#demo) | [Documentation](https://react-app-state.pages.dev/)

## Features

- Simple API
- No context providers
- Components are re-rendered only when the selector value changes
- It can shallow diff custom selector objects
- It supports async actions
- TypeScript support

## Installation

```shell
npm install @opentf/react-state
```

```shell
yarn add @opentf/react-state
```

```shell
pnpm add @opentf/react-state
```

```shell
bun add @opentf/react-state
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

## License

Copyright (c) 2021, [Thanga Ganapathy](https://github.com/Thanga-Ganapathy) ([MIT License](./LICENSE)).
