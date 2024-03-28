import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import { create } from '../src';

describe('create with API', () => {
  test('State API', async () => {
    let renderCount = 0;
    const [useAppState, setState, api] = create({ counter: 0 });
    const Counter = () => {
      renderCount++;
      const counter = useAppState((s) => s.counter);

      return (
        <div>
          <div>Counter: {counter}</div>
        </div>
      );
    };

    const SetCounter = () => {
      renderCount++;
      return (
        <div>
          <button
            onClick={() =>
              setState((state) => ({ counter: state.counter + 1 }))
            }
          >
            Increment
          </button>
        </div>
      );
    };

    const App = () => {
      return (
        <div>
          <Counter />
          <SetCounter />
        </div>
      );
    };
    render(<App />);
    expect(renderCount).toBe(2);
    expect(api.get()).toEqual({ counter: 0 });
    expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Increment'));
    await waitFor(() => {
      expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
      expect(renderCount).toBe(3);
    });
    expect(api.get()).toEqual({ counter: 1 });

    const unSub = api.subscribe(console.log);
    act(() => {
      api.set({ counter: api.get().counter + 1 });
    });
    await waitFor(() => {
      expect(api.get()).toEqual({ counter: 2 });
    });
    await waitFor(() => {
      expect(screen.getByText(/Counter: 2/)).toBeInTheDocument();
      expect(renderCount).toBe(4);
    });
    unSub();
    api.destroy();
    fireEvent.click(screen.getByText('Increment'));
    await waitFor(() => {
      expect(screen.getByText(/Counter: 2/)).toBeInTheDocument();
      expect(renderCount).toBe(4);
    });
  });
});
