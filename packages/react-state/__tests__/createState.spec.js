import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { createState } from '../src';

let logSpy, errorSpy;

beforeAll(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  logSpy.mockRestore();
  errorSpy.mockRestore();
});

describe('createState', () => {
  test('Invalid values passed to createState', () => {
    let useAppState = createState();
    const App = () => {
      const counter = useAppState((state) => state.counter);
      return (
        <div>
          <div>Counter: {counter}</div>
        </div>
      );
    };
    expect(() => render(<App />)).toThrow();
    useAppState = createState(null);
    expect(() => render(<App />)).toThrow();
    useAppState = createState('');
    render(<App />);
    expect(screen.getByText(/Counter:/)).toBeInTheDocument();
    useAppState = createState([]);
    expect(screen.getByText(/Counter:/)).toBeInTheDocument();
    useAppState = createState({});
    expect(screen.getByText(/Counter:/)).toBeInTheDocument();
  });

  test('Empty hook fn', () => {
    const useAppState = createState({ counter: 0 });
    const App = () => {
      const state = useAppState();
      return (
        <div>
          <div>Counter: {state?.counter || 'Start'}</div>
        </div>
      );
    };
    render(<App />);
    expect(screen.getByText(/Counter: Start/)).toBeInTheDocument();
  });

  test('Set state only hook fn', () => {
    const useAppState = createState({ counter: 0 });
    const Counter = () => {
      console.log('Render Counter');
      const counter = useAppState((state) => state.counter);

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
    expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
    expect(logSpy).toBeCalledTimes(2);
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
    expect(logSpy).toBeCalledTimes(3);
  });

  it('Displays the initial value', () => {
    const useAppState = createState({ counter: 0 });
    const App = () => {
      const counter = useAppState((state) => state.counter);
      return (
        <div>
          <div>Counter: {counter}</div>
        </div>
      );
    };
    render(<App />);
    expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
  });

  it('Fetches everything from the state', () => {
    const useAppState = createState({
      user: { name: 'xxx' },
      theme: 'Dark',
      settings: { lang: 'en-us' },
    });
    const App = () => {
      const state = useAppState((state) => state);
      return (
        <div>
          <div>User: {state.user.name}</div>
          <div>Theme: {state.theme}</div>
          <div>Language: {state.settings.lang}</div>
        </div>
      );
    };
    render(<App />);
    expect(screen.getByText('User: xxx')).toBeInTheDocument();
    expect(screen.getByText('Theme: Dark')).toBeInTheDocument();
    expect(screen.getByText('Language: en-us')).toBeInTheDocument();
  });

  it('Changes the initial value', () => {
    const useAppState = createState({ counter: 0 });
    const App = () => {
      const [counter, setAppState] = useAppState((state) => state.counter, {
        set: true,
      });
      return (
        <div>
          <div>Counter: {counter}</div>
          <button
            onClick={() =>
              setAppState((state) => ({ counter: state.counter + 1 }))
            }
          >
            Increment
          </button>
        </div>
      );
    };
    render(<App />);
    expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
  });

  test('The same state value in two components using the hook', () => {
    const useAppState = createState({ counter: 0 });
    const Counter = () => {
      const [counter, setAppState] = useAppState((state) => state.counter, {
        set: true,
      });
      return (
        <div>
          <div>Counter: {counter}</div>
          <button
            onClick={() =>
              setAppState((state) => ({ counter: state.counter + 1 }))
            }
          >
            Increment
          </button>
        </div>
      );
    };
    const App = () => {
      return (
        <>
          <Counter />
          <Counter />
        </>
      );
    };
    render(<App />);
    expect(screen.getAllByText(/Counter: 0/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Counter: 0/)[1]).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getAllByText(/Counter: 1/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Counter: 1/)[1]).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getAllByText(/Counter: 2/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Counter: 2/)[1]).toBeInTheDocument();
  });

  test('Rendering only the component that selected values changed', () => {
    const useAppState = createState({
      counter: 0,
      user: { name: 'xxx', signin: true },
    });

    const Counter = () => {
      console.log('Rendering Counter');
      const [counter, setAppState] = useAppState((state) => state.counter, {
        set: true,
      });
      return (
        <div>
          <div>Counter: {counter}</div>
          <button
            onClick={() =>
              setAppState((state) => ({ counter: state.counter + 1 }))
            }
          >
            Increment
          </button>
        </div>
      );
    };

    const User = () => {
      console.log('Rendering User');
      const [user, setAppState] = useAppState((state) => state.user, {
        set: true,
      });
      return (
        <div>
          <div>{user.name ? `Welcome ${user.name}` : 'Welcome Guest'}</div>
          <button
            onClick={() =>
              setAppState((state) => ({
                user: { ...state.user, signin: false },
              }))
            }
          >
            Logout
          </button>
        </div>
      );
    };

    const App = () => {
      console.log('Rendering App');
      return (
        <>
          <User />
          <Counter />
        </>
      );
    };
    render(<App />);
    expect(logSpy).toBeCalledTimes(3);
    expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Welcome xxx/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
    expect(logSpy).toBeCalledTimes(4);
    fireEvent.click(screen.getByText('Logout'));
    waitFor(() => {
      expect(screen.getByText(/Welcome Guest/)).toBeInTheDocument();
      expect(logSpy).toBeCalledTimes(5);
    });
  });
});
