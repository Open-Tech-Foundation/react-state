Create shared **states** using the function.

`createState<State>(initialState: State): Hook<State>`

- **State**: The type or interface of the state.

- **initialState**: Pass an object to initialize the state, defaults to `undefined`, it should be an empty object (`{}`).

- **Hook**: A custom `React` hook function is returned after creating a state.

### Example

```ts
import { createState } from '@open-tech-world/react-state';

const useAppState = createState({});
```

### Hook function

Use the hook function in the `React` components.

`useAppState<State>(selector?: (state) => any, config?: Partial<HookConfig>): state | Partial<state> | [state, setFn]`

`HookConfig = { set: boolean, shallow: boolean}`

- **selector**: A function, that is used to select some or complete `state` objects, and the current state will be passed to the function as an argument.

- **{ set: boolean }**: If `true`, it returns `set` function in the form of `[state, setFn]`.

- **{ shallow: boolean }**: If `true`, it shallow diffs the selected objects with the state changes.

#### Select everything from the state

```tsx
const state = useAppState((s) => s);
```

#### Select a single object from the state

```tsx
const obj = useAppState((s) => s.obj);
```

#### Select multiple objects from the state

```tsx
const obj1 = useAppState((s) => s.obj1);
const obj2 = useAppState((s) => s.obj2);
```

#### Select with set state function

```tsx
const [obj, setState] = useAppState((s) => s.obj, { set: true });
```

#### Select custom objects from the state and enable shallow diff

```tsx
const {obj1, obj2} = useAppState((s) => {obj1: s.obj1, obj2: s.obj2 }, {shallow: true});
```
