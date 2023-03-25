---
sidebar_position: 2
slug: getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

```mdx-code-block
<Tabs>
<TabItem value="npm">
```

```bash
npm install @opentf/react-state
```

```mdx-code-block
</TabItem>
<TabItem value="yarn">
```

```bash
yarn add @opentf/react-state
```

```mdx-code-block
</TabItem>
<TabItem value="pnpm">
```

```bash
pnpm add @opentf/react-state
```

```mdx-code-block
</TabItem>
</Tabs>
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
import { create } from '@opentf/react-state';

interface AppState {
  name: string;
  age: number;
}

const appState: AppState = { name: 'Xyz', age: 25 };

const [useAppState, setAppState, api] = create(appState);

api.subscribe(console.log);

function App() {
  const state = useAppState((s) => s);

  return (
    <>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <button onClick={() => setAppState((s) => ({ name: '' }))}>
        Change State
      </button>
    </>
  );
}
```
