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

```ts
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({});

function App() {
  const state = useAppState((s) => s);
  console.log(state); // {}
}
```
