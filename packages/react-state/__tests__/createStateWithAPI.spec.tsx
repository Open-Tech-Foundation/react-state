import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { createState } from '../src';

let logSpy: jest.SpyInstance, errorSpy: jest.SpyInstance;

beforeAll(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  logSpy.mockRestore();
  errorSpy.mockRestore();
});

describe('createState with API', () => {
  test('State API', async () => {
    const [useAppState, api] = createState({ counter: 0 }, true);
    const Counter = () => {
      console.log('Render Counter');
      const counter = useAppState((s) => s.counter);

      return (
        <div>
          <div>Counter: {counter}</div>
        </div>
      );
    };

    const SetCounter = () => {
      console.log('Render SetCounter');
      const setState = useAppState(null, { set: true });

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
    expect(api.getState()).toEqual({ counter: 0 });
    expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Increment'));
    await waitFor(() => {
      expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
      expect(logSpy).toBeCalledTimes(3);
    });
    expect(api.getState()).toEqual({ counter: 1 });

    const unSub = api.subscribe(console.log);
    api.setState({ counter: api.getState().counter + 1 });
    await waitFor(() => {
      expect(api.getState()).toEqual({ counter: 2 });
    });
    await waitFor(() => {
      expect(screen.getByText(/Counter: 2/)).toBeInTheDocument();
      expect(logSpy).toBeCalledTimes(5);
    });
    unSub();
  });
});
