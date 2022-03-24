---
sidebar_position: 3
---

The set function is used to change the values in the state.

You can get the state `set` function reference by passing an option to `config` object.

Pass `{set: true}` to the hook function as config object.

Once you enable the `set` function, the `hook` will return an `array` containing the `state` objects and a `set` function.

The `set` function accepts a function as the first argument, and the function is called with the state.

By default, the object returned from the `set` function is `merged` into the state. To `replace`, pass `true` as the second argument to the `set` function.

:::tip
The `set` function can be `sync` or `async`.
:::

### Change the state's value

```tsx
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({ theme: 'Light' });

function MyComponent() {
  const [theme, setAppState] = useAppState((s) => s.theme, { set: true });
  console.log(theme); // Initially "Light" and "Dark" after the button is clicked
  return (
    <button onClick={() => setAppState((s) => ({ theme: 'Dark' }))}>
      Change to Dark
    </button>
  );
}
```

### Replace an object in the state

```tsx
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({ apples: 5, mangoes: 2, bananas: 7 });

function MyComponent() {
  const [state, setAppState] = useAppState((s) => s, { set: true });
  console.log(state); // Initially => { apples: 5, mangoes: 2, bananas: 7 }, After replace => {oranges: 8}
  return (
    <button onClick={() => setAppState((s) => ({ oranges: 8 }), true)}>
      Only oranges
    </button>
  );
}
```
