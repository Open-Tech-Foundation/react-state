---
sidebar_position: 3
slug: set-state
---

import {SandBox} from '@opentf/react-sandbox';

import setStateWithObj from '!!raw-loader!@site/src/examples/setStateWithObj';
import setStateWithFn from '!!raw-loader!@site/src/examples/setStateWithFn';
import replaceState from '!!raw-loader!@site/src/examples/replaceState';

The set function is used to change the values in the state.

The `set` function accepts a function as the first argument, and the function is called with the state snapshot.

By default, the object returned from the `set` function is `merged` into the state. To `replace`, pass `true` as the second argument to the `set` function.

:::tip
The `set` function can be `sync` or `async`.
:::

### Set value to the state object using object

<SandBox deps={['@opentf/react-state']} code={setStateWithObj} />

### Change the state value using function

<SandBox deps={['@opentf/react-state']} code={setStateWithFn} />

### Replace an object in the state

<SandBox deps={['@opentf/react-state']} code={replaceState} />
