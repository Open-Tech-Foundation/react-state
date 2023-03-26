---
sidebar_position: 2
slug: use-state
---

import {SandBox} from '@opentf/react-sandbox';

import useStateWithoutSelector from '!!raw-loader!@site/src/examples/useStateWithoutSelector';
import useStateWithDefaultSelector from '!!raw-loader!@site/src/examples/useStateWithDefaultSelector';
import useStateWithSingleObj from '!!raw-loader!@site/src/examples/useStateWithSingleObj';
import uSWithMulObjsSingleSel from '!!raw-loader!@site/src/examples/uSWithMulObjsSingleSel';

Use the created `hook` function in the `React` components.

The `selector` function must be passed to get `some` or `complete` state objects.

### Hook with no selector

:::caution
Avoid using the hook without a selector.
:::

<SandBox deps={["@opentf/react-state"]} code={useStateWithoutSelector} />

### Hook with default selector

It selects everything in the state.

<SandBox deps={["@opentf/react-state"]} code={useStateWithDefaultSelector} />

### Hook with single object selector

<SandBox deps={["@opentf/react-state"]} code={useStateWithSingleObj} />

### Hook with multiple objects selector

If you want to select multiple state objects within a single object, use the `shallow` diff configuration.

<SandBox deps={["@opentf/react-state"]} code={uSWithMulObjsSingleSel} />
