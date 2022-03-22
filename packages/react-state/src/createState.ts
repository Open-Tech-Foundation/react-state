import { useEffect, useReducer, useRef } from 'react';
import shallowDiffObjs from './shallowDiffObjs';

type State = object;

interface SelectorConfig {
  set: boolean;
  shallow: boolean;
}

type hookFn = (
  selector: Partial<State> | Record<string, Pick<State, keyof State>>,
  config?: Partial<SelectorConfig>
) => Partial<State>;
type setStateFn = (state: State) => Partial<State>;
type listenerFn = () => void;

export default function createState<State>(initialState: State): hookFn {
  let state: State = initialState;
  const listerners = new Set<listenerFn>();

  const setState = (fn: setStateFn) => {
    const obj = fn(state as unknown as object);
    state = Object.assign({}, state, obj);
    listerners.forEach((l) => l());
  };

  const subscribe = (lf: listenerFn) => {
    listerners.add(lf);
  };

  return (selector, config) => {
    if (typeof selector != 'function') {
      if (config?.set) {
        return setState;
      }

      return;
    }
    const [, dispatch] = useReducer((s) => s + 1, 0);
    const selectorValueRef = useRef(selector(state));

    useEffect(() => {
      const listener = () => {
        const sv = selector(state);
        if (config?.shallow) {
          if (!shallowDiffObjs(selectorValueRef.current, sv)) {
            selectorValueRef.current = sv;
            dispatch();
          }
          return;
        }
        if (sv !== selectorValueRef.current) {
          selectorValueRef.current = sv;
          dispatch();
        }
      };

      subscribe(listener);
    }, [selector, config?.shallow]);

    if (config?.set) {
      return [selectorValueRef.current, setState];
    }

    return selectorValueRef.current;
  };
}
