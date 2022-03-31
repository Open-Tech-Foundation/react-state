import { useCallback, useEffect, useReducer, useRef } from 'react';
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

type listenerFn = () => void;

export default function createState<State>(initialState: State): Hook<State> {
  let state: State & Partial<State> = initialState;
  const listerners = new Set<listenerFn>();

  const setState: SetState<State> = async (obj, replace = false) => {
    const objValue = typeof obj === 'function' ? await obj(state) : obj;
    state = replace ? (objValue as State) : Object.assign({}, state, objValue);
    listerners.forEach((l) => {
      l();
    });
  };

  const subscribe = (lf: listenerFn) => {
    listerners.add(lf);
  };

  const unSubscribe = (lf: listenerFn) => {
    listerners.delete(lf);
  };

  const useStateHook: Hook<State> = <ST>(
    selector: Selector<State, ST> | null,
    config?: Partial<HookConfig>
  ) => {
    const [, dispatch] = useReducer((s) => s + 1, 0);
    const selectorValueRef = useRef(
      typeof selector === 'function' ? selector(state) : null
    );

    const listener = useCallback(() => {
      if (selector === null) {
        return;
      }
      const sv = selector(state);
      if (config?.shallow) {
        if (
          !shallowDiffObjs(
            selectorValueRef.current as unknown as object,
            sv as unknown as object
          )
        ) {
          selectorValueRef.current = sv;
          dispatch();
        }
        return;
      }
      if (sv !== selectorValueRef.current) {
        selectorValueRef.current = sv;
        dispatch();
      }
    }, [config?.shallow, selector]);

    useEffect(() => {
      if (!selector) {
        return;
      }
      subscribe(listener);
      return () => {
        unSubscribe(listener);
      };
    }, [listener, selector]);

    if (selectorValueRef.current === null) {
      if (!config?.set) return;
      return setState;
    }

    if (config?.set) {
      return [selectorValueRef.current, setState] as const;
    }

    return selectorValueRef.current;
  };

  return useStateHook;
}
