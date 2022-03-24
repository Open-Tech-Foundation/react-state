---
sidebar_position: 1
---

Create shared states using the `createState` function.

Pass an `object` to `initialize` the state.

It returns a custom `hook` function.

Use the `hook` in your `React` components to `select` your state, and the components will `re-render` when the state changes.

### Default

```tsx
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({});
```

### Initialize the state with values

```tsx
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({ theme: 'Dark' });
```

:::info
It is recommended to create a `state` with the `plain` JS object.
:::

:::tip
You can create multiple shared states for your app.
:::