---
sidebar_position: 3
---

import {SandBox} from '@opentf/react-sandbox';

import setStateWithObj from '!!raw-loader!@site/src/examples/setStateWithObj';
import setStateWithFn from '!!raw-loader!@site/src/examples/setStateWithFn';
import replaceState from '!!raw-loader!@site/src/examples/replaceState';

The set function is used to change the values in the state.

You can get the state `set` function reference by passing an option to `config` object.

Pass `{set: true}` to the hook function as config object.

Once you enable the `set` function, the `hook` will return an `array` containing the `state` objects and a `set` function.

The `set` function accepts a function as the first argument, and the function is called with the state.

By default, the object returned from the `set` function is `merged` into the state. To `replace`, pass `true` as the second argument to the `set` function.

:::tip
The `set` function can be `sync` or `async`.
:::

### Set value to the state object using object

<SandBox deps={['@open-tech-world/react-state']} code={setStateWithObj} />

### Change the state value using function

<SandBox lib="react-state" code={setStateWithFn} />

### Replace an object in the state

<SandBox lib="react-state" code={replaceState} />
