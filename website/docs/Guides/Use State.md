---
sidebar_position: 2
---

import {SandBox} from '@open-tech-world/react-examples-sandbox';

import useStateWithoutSelector from '!!raw-loader!@site/src/examples/useStateWithoutSelector';
import useStateWithDefaultSelector from '!!raw-loader!@site/src/examples/useStateWithDefaultSelector';
import useStateWithSingleObj from '!!raw-loader!@site/src/examples/useStateWithSingleObj';
import useStateWithMultipleObj from '!!raw-loader!@site/src/examples/useStateWithMultipleObj';
import uSWithMulObjsSingleSel from '!!raw-loader!@site/src/examples/uSWithMulObjsSingleSel';
import uSWithMulObjsSingleSelArr from '!!raw-loader!@site/src/examples/uSWithMulObjsSingleSelArr';

Use the created `hook` function in the `React` components.

The `selector` function must be passed to get `some` or `complete` state objects.

### Hook with no selector

:::caution
Avoid using the hook without a selector.
:::

<SandBox lib="react-state" code={useStateWithoutSelector} />

### Hook with default selector

It selects everything in the state.

<SandBox lib="react-state" code={useStateWithDefaultSelector} />

### Hook with single object selector

<SandBox lib="react-state" code={useStateWithSingleObj} />

### Multiple Hooks with single object selector

<SandBox lib="react-state" code={useStateWithMultipleObj} />

### Multiple objects selector with single hook

If you want to select multiple state objects within a single object, use the `shallow` diff configuration.

<SandBox lib="react-state" code={uSWithMulObjsSingleSel} />

### Multiple objects selector with single hook (Array)

If you want to select multiple state objects within a single object, use the `shallow` diff configuration.

<SandBox lib="react-state" code={uSWithMulObjsSingleSelArr} />
