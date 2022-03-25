import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import produce from 'immer';

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

  test('Set state only hook fn', async () => {
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
    await waitFor(() => {
      expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
      expect(logSpy).toBeCalledTimes(3);
    });
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

  it('Changes the initial value', async () => {
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
    await waitFor(() => {
      expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
    });
  });

  test('The same state value in two components using the hook', async () => {
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
    await waitFor(() => {
      expect(screen.getAllByText(/Counter: 1/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Counter: 1/)[1]).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByRole('button')[1]);
    await waitFor(() => {
      expect(screen.getAllByText(/Counter: 2/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Counter: 2/)[1]).toBeInTheDocument();
    });
  });

  test('Rendering only the component that selected values changed', async () => {
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
          <div>{user.signin ? `Welcome ${user.name}` : 'Welcome Guest'}</div>
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
    await waitFor(() => {
      expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
      expect(logSpy).toBeCalledTimes(4);
    });
    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByText(/Welcome Guest/)).toBeInTheDocument();
      expect(logSpy).toBeCalledTimes(5);
    });
  });

  it('Constructs a single object with multiple state-picks', () => {
    const useAppState = createState({
      products: { mobiles: ['M1', 'M2'], laptops: ['L1'] },
    });

    const Products = () => {
      const { mobiles, laptops } = useAppState((s) => ({
        mobiles: s.products.mobiles,
        laptops: s.products.laptops,
      }));
      return (
        <div>
          <div>{mobiles}</div>
          <div>{laptops}</div>
        </div>
      );
    };

    const App = () => {
      return (
        <>
          <Products />
        </>
      );
    };
    render(<App />);
    expect(screen.getByText(/M1/)).toBeInTheDocument();
    expect(screen.getByText(/M2/)).toBeInTheDocument();
    expect(screen.getByText(/L1/)).toBeInTheDocument();
  });

  test('Shallow diff single array for multiple state-picks', async () => {
    const useAppState = createState({
      settings: { theme: 'Dark' },
      products: { mobiles: ['M1', 'M2'], laptops: ['L1'] },
    });

    const Products = () => {
      console.log('Render Products');

      const [mobiles, laptops] = useAppState(
        (s) => [s.products.mobiles, s.products.laptops],
        { shallow: true }
      );
      return (
        <div>
          <ul>
            {mobiles.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
          <ul>
            {laptops.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      );
    };

    const CreateProduct = () => {
      console.log('Render CreateProduct');
      const setState = useAppState(null, { set: true });
      return (
        <div>
          <button
            onClick={() =>
              setState(
                (s) =>
                  produce(s, (draft) => {
                    draft.products.mobiles.push(
                      'M' + Math.random().toString().slice(-10, -5)
                    );
                  }),
                true
              )
            }
          >
            Add Mobile
          </button>
          <button
            onClick={() =>
              setState(
                (s) =>
                  produce(s, (draft) => {
                    draft.products.laptops.push(
                      'L' + Math.random().toString().slice(-10, -5)
                    );
                  }),
                true
              )
            }
          >
            Add Laptop
          </button>
        </div>
      );
    };

    function Header() {
      console.log('Render Header');
      const [settings, setState] = useAppState((s) => s.settings, {
        set: true,
      });

      return (
        <div>
          Theme: {settings.theme}{' '}
          <button
            onClick={() =>
              setState((s) => ({
                settings: {
                  theme: s.settings.theme === 'Dark' ? 'Light' : 'Dark',
                },
              }))
            }
          >
            Toggle
          </button>
        </div>
      );
    }

    const App = () => {
      return (
        <>
          <Header />
          <Products />
          <CreateProduct />
        </>
      );
    };
    render(<App />);
    expect(screen.getByText(/M1/)).toBeInTheDocument();
    expect(screen.getByText(/M2/)).toBeInTheDocument();
    expect(screen.getByText(/L1/)).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(screen.getByText('Add Mobile'));
    });
    fireEvent.click(screen.getByText('Add Laptop'));
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(5);
      expect(logSpy).toBeCalledTimes(5);
    });
    fireEvent.click(screen.getByText('Toggle'));
    await waitFor(() => {
      expect(screen.getByText('Theme: Light')).toBeInTheDocument();
      expect(logSpy).toBeCalledTimes(6);
    });
  });

  test('Replacing the state instead of merging', async () => {
    const useAppState = createState({
      settings: { theme: 'Dark' },
      user: { name: 'xxx' },
    });
    const App = () => {
      const [{ settings, user }, setAppState] = useAppState(
        (s) => ({ settings: s.settings, user: s.user }),
        { set: true, shallow: true }
      );
      return (
        <>
          <div>Theme: {settings.theme}</div>
          <div>{user ? `Welcome ${user.name}` : 'Welcome Guest'}</div>
          <button
            onClick={() =>
              setAppState(
                (s) =>
                  produce(s, (draft) => {
                    delete draft.user;
                  }),
                true
              )
            }
          >
            Logout
          </button>
        </>
      );
    };
    render(<App />);
    expect(screen.getByText('Theme: Dark')).toBeInTheDocument();
    expect(screen.getByText('Welcome xxx')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByText('Welcome Guest')).toBeInTheDocument();
    });
  });

  test('Async actions', async () => {
    const useCounterState = createState({ counter: 0 });

    function Counter() {
      console.log('Render Counter');
      const [counter, set] = useCounterState((state) => state.counter, {
        set: true,
      });

      const increment = (value) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(value + 1), 500);
        });
      };

      return (
        <div>
          <div>Counter: {counter}</div>
          <button
            onClick={() =>
              set(async (s) => ({ counter: await increment(s.counter) }))
            }
          >
            +1
          </button>
        </div>
      );
    }

    const App = () => {
      console.log('Render App');

      return (
        <div>
          <Counter />
        </div>
      );
    };

    render(<App />);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Counter: 1')).toBeInTheDocument();
    });
  });
});
