import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
import shallowDiffObjs from './shallowDiffObjs';

export interface HookConfig {
  set: boolean;
  shallow: boolean;
}

export type Selector<State, T> = (state: State) => T;

export type Hook<State> = {
  (selector: null): null;
  (selector: null, config: { set: true }): SetState<State>;
  <T>(selector: Selector<State, T>): T;
  <T>(selector: Selector<State, T>, config: { set: true }): [
    T,
    SetState<State>
  ];
  <T>(selector: Selector<State, T>, config: { set: false; shallow: true }): T;
  <T>(selector: Selector<State, T>, config: { set: true; shallow: true }): [
    T,
    SetState<State>
  ];
  <T>(selector: Selector<State, T>, config: { shallow: true }): T;
};

export type SetStateCallback<State> = (
  state: State
) => Partial<State> | Promise<Partial<State>>;

export type SetState<State> = (
  obj: Partial<State> | SetStateCallback<State>,
  replace?: boolean
) => Promise<void>;

type ListenerFn = () => void;

export default function createState<State>(initialState: State): Hook<State> {
  let state: State & Partial<State> = { ...initialState };
  const listerners = new Set<ListenerFn>();

  const setState: SetState<State> = async (obj, replace = false) => {
    const objValue = typeof obj === 'function' ? await obj(state) : obj;
    state = replace ? (objValue as State) : Object.assign({}, state, objValue);
    listerners.forEach((l) => {
      l();
    });
  };

  const subscribe = (lf: ListenerFn) => {
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

  return useStateHook;
}
