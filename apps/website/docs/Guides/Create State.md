---
sidebar_position: 1
slug: create-state
---

Create shared states using the `create` function.

Pass an `object` to `initialize` the state.

It returns an array with a custom `hook` function, `set` state function and `api` object.

Use the `hook` in your `React` components to `select` your state, and the components will `re-render` when the state changes.

### Initialize the state with values

```tsx
import { create } from '@opentf/react-state';

const [useState, setState, api] = create({});
```

:::info
It is recommended to create a `state` with the `plain` JS object.
:::

:::tip
You can create multiple shared states for your app.
:::
