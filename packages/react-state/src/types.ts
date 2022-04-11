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

export type ListenerFn = () => void;
export type UnSubscribeFn = () => boolean;
export type SubscribeFn = (lFn: ListenerFn) => UnSubscribeFn;

export type StateAPI<T> = {
  getState: () => T;
  setState: SetState<T>;
  subscribe: SubscribeFn;
};
