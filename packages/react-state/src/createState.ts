import { useEffect, useReducer, useRef } from 'react';

type State = object;

type hookFn = (selector: Partial<State>, boolean) => Partial<State>;
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

  return (selector, set = false) => {
    if (typeof selector != 'function') {
      if (set) {
        return setState;
      }

      return;
    }
    const [, dispatch] = useReducer((s) => s + 1, 0);
    const selectorValueRef = useRef(selector(state));

    useEffect(() => {
      const listener = () => {
        const sv = selector(state);
        if (sv !== selectorValueRef.current) {
          selectorValueRef.current = sv;
          dispatch();
        }
      };

      subscribe(listener);
    }, [selector]);

    if (set) {
      return [selectorValueRef.current, setState];
    }

    return selectorValueRef.current;
  };
}
