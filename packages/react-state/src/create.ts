import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js';
import { Draft, createDraft, finishDraft } from 'immer';
import { clone, isFn, isShallowEql, shallowMerge } from '@opentf/std';
import type { ListenerFn, SetStateVal, Selector } from './types';

/**
 * Creates a store with initial value.
 */
export default function create<T>(initialState: T) {
  let state = clone(initialState);
  const listerners = new Set<ListenerFn<T>>();

  const setState = async (val: SetStateVal<T>, replace = false) => {
    let nextState;
    if (isFn(val)) {
      const draft = createDraft(state as object);
      await val(draft as Draft<T>);
      nextState = finishDraft(draft);
    } else {
      nextState = val;
    }
    state = replace
      ? (nextState as T)
      : (shallowMerge(state as object, nextState) as T);
    listerners.forEach((l) => l(state));
  };

  const getState = () => state;

  const subscribe = (lf: ListenerFn<T>) => {
    listerners.add(lf);
    return () => listerners.delete(lf);
  };

  const destroy = () => {
    listerners.clear();
  };

  function useStateHook<ST extends T, RT>(selector: Selector<ST, RT>) {
    const value = useSyncExternalStoreWithSelector(
      subscribe,
      () => state,
      () => state,
      () => selector?.(state as ST) as RT,
      (a, b) => isShallowEql(a, b)
    );

    return value;
  }

  const api = {
    /** Returns the current state */
    get: getState,
    /** Merge or replace values in the state */
    set: setState,
    /** Resets the current state to the initial state */
    reset: (newState?: T) => {
      setState(clone(newState ?? initialState), true);
    },
    /** Subscribes to the state, called on every state change */
    subscribe,
    /** It removes all listeners */
    destroy,
  };

  return {
    useAppState: useStateHook,
    setAppState: setState,
    api,
  };
}
