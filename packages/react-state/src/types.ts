import type { Draft } from 'immer';

export type Selector<T, RT> = (state: T) => RT;

export type SetStateVal<T> = Partial<T> | ((val: Draft<T>) => void);

export type ListenerFn<T> = (state: T) => void;
