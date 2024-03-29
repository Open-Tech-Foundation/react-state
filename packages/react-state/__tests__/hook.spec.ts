import { renderHook, act, waitFor } from '@testing-library/react';

import { create } from '../src';

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
const { useAppState, setAppState } = create(state);

describe('Hook', () => {
  test('With null selector', () => {
    const { result } = renderHook(() => useAppState(null));
    expect(result.current).toBeUndefined();
  });

  test('With selector returns null', () => {
    const { result } = renderHook(() => useAppState(() => null));
    expect(result.current).toBeNull();
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

  test('Select a value from the state & update it by object', () => {
    const { result } = renderHook(() => useAppState((s) => s.theme));
    expect(result.current).toEqual('Dark');
    act(() => {
      setAppState({ theme: 'Light' });
    });
    expect(result.current).toEqual('Light');
  });

  test('Select a value from the state & update it by callback', async () => {
    const { result } = renderHook(() => useAppState((s) => s.count));
    expect(result.current).toEqual(5);
    act(() => {
      setAppState((s) => {
        s.count = s.count + 1;
      });
    });
    await waitFor(() => expect(result.current).toEqual(6));
  });

  test('Shallow diff', async () => {
    const { result } = renderHook(() =>
      useAppState((s) => ({ user: s.user, fruits: s.fruits }))
    );
    act(() => {
      setAppState?.((s) => {
        s.fruits.push('Banana');
      });
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        user: state.user,
        fruits: [...state.fruits, 'Banana'],
      })
    );
  });
});
