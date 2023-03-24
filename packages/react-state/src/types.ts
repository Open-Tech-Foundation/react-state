export interface HookConfig {
  shallow: boolean;
}

export type Selector<State, T> = (state: State) => T;

export type Hook<State> = <T>(
  selector: Selector<State, T>,
  config?: HookConfig
) => T;

export type SetStateCallback<State> = (
  state: State
) => Partial<State> | Promise<Partial<State>>;

export type SetState<State> = (
  obj: Partial<State> | SetStateCallback<State>,
  replace?: boolean
) => Promise<void>;

export type ListenerFn<T> = (state: T) => void;

export type UnSubscribeFn = () => boolean;

export type SubscribeFn<T> = (lFn: ListenerFn<T>) => UnSubscribeFn;

export type API<T> = {
  /** Returns the current state */
  get: () => T;
  /** Merge or replace values in the state */
  set: SetState<T>;
  /** Subscribes to the state, called on every state change */
  subscribe: SubscribeFn<T>;
  /** It removes all listeners */
  destroy: () => void;
};
