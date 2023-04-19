import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js';
import shallowDiffObjs from './shallowDiffObjs';
import type { Hook, ListenerFn, SetState, API, SubscribeFn } from './types';

/**
 * It creates a store with initial values.
 */
export default function create<State>(
  initialState: State
): [Hook<State>, SetState<State>, API<State>] {
  let state: State & Partial<State> = { ...initialState };
  const listerners = new Set<ListenerFn<State>>();

  const setState: SetState<State> = async (obj, replace = false) => {
    const objValue = typeof obj === 'function' ? await obj(state) : obj;
    state = replace ? (objValue as State) : Object.assign({}, state, objValue);
    listerners.forEach((l) => l(state));
  };

  const getState = () => {
    return state;
  };

  const subscribe: SubscribeFn<State> = (lf: ListenerFn<State>) => {
    listerners.add(lf);
    return () => listerners.delete(lf);
  };

  const destroy = () => {
    listerners.clear();
  };

  const useStateHook: Hook<State> = (selector, config) => {
    const value = useSyncExternalStoreWithSelector(
      subscribe,
      () => state,
      () => state,
      () => selector?.(state),
      config?.shallow
        ? (a, b) => shallowDiffObjs(a as object, b as object)
        : undefined
    );

    return value;
  };

  const api: API<State> = {
    get: getState,
    set: setState,
    subscribe,
    destroy,
  };

  return [useStateHook, setState, api];
}
