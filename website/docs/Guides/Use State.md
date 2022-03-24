---
sidebar_position: 2
---

Use the created `hook` function in the `React` components.

The `selector` function must be passed to get `some` or `complete` state objects.

### Hook with no selector

```ts
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({});

function MyComponent() {
  const state = useAppState();
  console.log(state); // undefined
  return <div />;
}
```
:::caution
Avoid using the hook without a selector.
:::

### Hook with default selector

It selects everything in the state.

```ts
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({});

function MyComponent() {
  const state = useAppState((s) => s);
  console.log(state); // {}
  return <div />;
}
```

### Hook with single object selector

```ts
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({ theme: 'Light' });

function MyComponent() {
  const theme = useAppState((s) => s.theme);
  console.log(theme); // Light
  return <div />;
}
```

### Multiple Hooks with single object selector

```ts
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({ theme: 'Light', lang: 'en-us' });

function MyComponent() {
  const theme = useAppState((s) => s.theme);
  const lang = useAppState((s) => s.lang);
  console.log(theme); // Light
  console.log(lang); // en-us
  return <div />;
}
```

### Multiple objects selector with single hook

If you want to select multiple state objects within a single object, use the `shallow` diff configuration.

```ts
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({
  settings: { theme: 'Light', lang: 'en-us' },
});

function MyComponent() {
  const { theme, lang } = useAppState(
    (s) => ({
      theme: s.settings.theme,
      lang: s.settings.lang,
    }),
    { shallow: true }
  );
  console.log(theme); // Light
  console.log(lang); // en-us
  return <div />;
}
```
