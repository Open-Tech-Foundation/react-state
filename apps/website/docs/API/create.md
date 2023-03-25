Create shared **states** using the function.

`create<State>(initialState: State): [Hook<State>, SetState<State>, API<State>]`

- **State**: The type or interface of the state.

- **initialState**: Pass an object to initialize the state, defaults to `undefined`, it should be an empty object (`{}`).

- **Hook**: A custom `React` hook function.

- **SetState**: A function to change the values in the state.

- **API**: An object containing methods for connecting the store outside of react.

### Example

```ts
import { create } from '@opentf/react-state';

const [useAppState, setAppState, api] = create({});
```

### useAppState

Use the hook function in the `React` components.

`useAppState<State>(selector?: (state) => any, config?: Partial<HookConfig>): state | Partial<state>`

`HookConfig = {shallow: boolean}`

- **selector**: A function, that is used to select some or complete `state` objects, and the current state will be passed to the function as an argument.

- **{ shallow: boolean }**: If `true`, it shallow diffs the selected objects with the state changes.

### setAppState

Use the function to change the values in the state.

`SetState<State> = (obj: Partial<State> | SetStateCallback<State>, replace?: boolean) => Promise<void>`

- **{ replace: false }**: Default it merges the values into the state, If `true`, it replaces the values in the state.

### api

The api object contains the following methods

- **get**: Use to get the current snapshot of the state.

- **set**: Use to set values into the state.

- **subscribe**: Use to listen for changes in the state, eg: `api.subscribe(console.log)`.

- **destroy**: Use to remove all listeners from the state.
