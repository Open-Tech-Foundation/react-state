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
