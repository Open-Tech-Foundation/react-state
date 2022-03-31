import { renderHook, act } from '@testing-library/react-hooks';
import produce from 'immer';

import { createState } from '../src';

interface State {
  theme: string;
  count: number;
  user?: { id: string };
  fruits: string[];
}

const state: State = {
  theme: 'Dark',
  count: 5,
  user: { id: 'abc' },
  fruits: ['Apple', 'Mango', 'Orange'],
};
const useAppState = createState(state);

describe('Hook', () => {
  test('With null selector', () => {
    const { result } = renderHook(() => useAppState(null));
    expect(result.current).toBeUndefined();
  });

  test('With selector returns null', () => {
    const { result } = renderHook(() => useAppState(() => null));
    expect(result.current).toBeUndefined();
  });

  test('Without selector & get set fn', () => {
    const { result } = renderHook(() => useAppState(null, { set: true }));
    expect(typeof result.current).toBe('function');
  });

  test('Select entire state', () => {
    const { result } = renderHook(() => useAppState((s) => s));
    expect(result.current).toEqual(state);
  });

  test('Select a value from the state', () => {
    const { result } = renderHook(() => useAppState((s) => s.theme));
    expect(result.current).toBe('Dark');
  });

  test('Select multiple values as object from the state', () => {
    const { result } = renderHook(() =>
      useAppState((s) => ({ theme: s.theme, count: s.count }))
    );
    expect(result.current).toEqual({ theme: 'Dark', count: 5 });
  });

  test('Select multiple values as array from the state', () => {
    const { result } = renderHook(() => useAppState((s) => [s.theme, s.count]));
    expect(result.current).toEqual(['Dark', 5]);
  });

  test('Select state & set config true', () => {
    const { result } = renderHook(() => useAppState((s) => s, { set: true }));
    expect(result.current[0]).toEqual(state);
    expect(typeof result.current[1]).toBe('function');
  });

  test('Select a value from the state & update it by object', () => {
    const { result } = renderHook(() =>
      useAppState((s) => s.theme, { set: true })
    );
    expect(result.current[0]).toEqual('Dark');
    expect(typeof result.current[1]).toBe('function');
    act(() => {
      const setFn = result.current[1];
      setFn({ theme: 'Light' });
    });
    expect(result.current[0]).toEqual('Light');
  });

  test('Select a value from the state & update it by callback', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAppState((s) => s.count, { set: true })
    );
    expect(result.current[0]).toEqual(5);
    expect(typeof result.current[1]).toBe('function');

    const setFn = result.current[1];

    act(() => {
      setFn((s) => ({
        count: s.count + 1,
      }));
    });

    await waitForNextUpdate();
    expect(result.current[0]).toEqual(6);
  });

  test('Shallow diff', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAppState((s) => ({ user: s.user, fruits: s.fruits }), {
        set: true,
        shallow: true,
      })
    );
    expect(typeof result.current?.[1]).toBe('function');

    const setFn = result.current?.[1];

    act(() => {
      setFn?.((s) => ({
        fruits: [...s.fruits, 'Banana'],
      }));
    });

    await waitForNextUpdate();
    expect(result.current?.[0]).toEqual({
      user: state.user,
      fruits: [...state.fruits, 'Banana'],
    });
  });

  test('Repalce state with immer', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAppState((s) => s.user, { set: true })
    );

    expect(result.current[0]).toBe(state.user);

    const setFn = result.current[1];
    act(() => {
      setFn(
        (s) =>
          produce(s, (draft) => {
            delete draft.user;
          }),
        true
      );
    });

    await waitForNextUpdate();

    expect(result.current[0]).toBeUndefined();
  });
});
