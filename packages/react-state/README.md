<img align="left" src="https://open-tech-foundation.pages.dev/img/Logo.svg" width="50" height="50">

&nbsp;[OPEN TECH FOUNDATION](https://open-tech-foundation.pages.dev/)

<div align="center">

# React State

[![Build](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml/badge.svg)](https://github.com/open-tech-foundation/react-state/actions/workflows/build.yml)

</div>

> A global state manager for React.

<div align="center">

# [View Demo](https://react-app-state.pages.dev/#demo) | [Documentation](https://react-app-state.pages.dev/)

</div>

## Features

- Simple API
- Mutable State Updates
- No Context Providers
- Auto Shallow Diff Computed Props
- TypeScript Support

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

const { useAppState, setAppState, api } = create({ count: 0 });

api.subscribe(console.log);

export default function App() {
  const count = useAppState((s) => s.count);

  return (
    <>
      <p>Count: {count}</p>
      <button
        onClick={() =>
          setAppState((s) => {
            s.count++;
          })
        }
      >
        Increment
      </button>
    </>
  );
}
```

## Related

- [@opentf/react-form](https://react-form.pages.dev/) - A simple form state manager for React.

- [@opentf/react-sandbox](https://github.com/Open-Tech-Foundation/react-sandbox) - The CodeSandbox sandpack wrapper with additional features.

- [@opentf/react-node-repl](https://node-repl.pages.dev/) - The Node.js REPL in a React component.

- [@opentf/std](https://js-std.pages.dev/) - An Extensive JavaScript Standard Library.

## License

Copyright (c) 2021, [Thanga Ganapathy](https://github.com/Thanga-Ganapathy) ([MIT License](../../LICENSE)).
