import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
import shallowDiffObjs from './shallowDiffObjs';
import {
  Hook,
  HookConfig,
  ListenerFn,
  Selector,
  SetState,
  SubscribeFn,
} from './types';

export default function createState<State>(initialState: State): Hook<State>;
export default function createState<State>(
  initialState: State,
  api: true
): [
  Hook<State>,
  { getState: () => State; setState: SetState<State>; subscribe: SubscribeFn }
];
export default function createState<State>(initialState: State, api?: boolean) {
  let state: State & Partial<State> = { ...initialState };
  const listerners = new Set<ListenerFn>();

  const setState: SetState<State> = async (obj, replace = false) => {
    const objValue = typeof obj === 'function' ? await obj(state) : obj;
    state = replace ? (objValue as State) : Object.assign({}, state, objValue);
    listerners.forEach((l) => {
      l();
    });
  };

  const getState = () => {
    return state;
  };

  const subscribe: SubscribeFn = (lf: ListenerFn) => {
    listerners.add(lf);
    return () => listerners.delete(lf);
  };

  const useStateHook: Hook<State> = <ST>(
    selector: Selector<State, ST> | null,
    config?: Partial<HookConfig>
  ) => {
    const value = useSyncExternalStoreWithSelector(
      subscribe,
      () => state,
      null,
      () => selector?.(state),
      config?.shallow
        ? (a, b) =>
            shallowDiffObjs(a as unknown as object, b as unknown as object)
        : undefined
    );

    if (selector === null && config?.set) {
      return setState;
    }

    if (selector !== null && config?.set) {
      return [value, setState] as const;
    }

    return value;
  };

  if (api) {
    return [useStateHook, { getState, setState, subscribe }];
  }

  return useStateHook;
}
