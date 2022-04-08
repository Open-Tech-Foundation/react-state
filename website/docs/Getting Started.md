---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

<Tabs
defaultValue="npm"
values={[
{label: 'npm', value: 'npm'},
{label: 'Yarn', value: 'yarn'},
]}>
<TabItem value="npm">

```shell
npm install @open-tech-world/react-state
```

</TabItem>
  <TabItem value="yarn">

```shell
yarn add @open-tech-world/react-state
```

  </TabItem>
</Tabs>

## Usage

```jsx
import { createState } from '@open-tech-world/react-state';

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
import { createState } from '@open-tech-world/react-state';

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
