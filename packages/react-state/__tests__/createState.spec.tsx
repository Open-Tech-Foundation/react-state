import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import produce from 'immer';

import { create } from '../src';

describe('create', () => {
  test('Set state only hook fn', async () => {
    let renderCount = 0;
    const [useAppState, setState] = create({ counter: 0 });
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

    const ResetCounter = () => {
      renderCount++;

      return (
        <div>
          <button onClick={() => setState({ counter: 0 })}>Reset</button>
        </div>
      );
    };

    const App = () => {
      return (
        <div>
          <Counter />
          <SetCounter />
          <ResetCounter />
        </div>
      );
    };
    render(<App />);
    expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Increment'));
    await waitFor(() => {
      expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
      expect(renderCount).toBe(4);
    });
    fireEvent.click(screen.getByText('Reset'));
    await waitFor(() => {
      expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
      expect(renderCount).toBe(5);
    });
  });

  it('Displays the initial value', () => {
    const [useAppState] = create({ counter: 0 });

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
    const [useAppState] = create({
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
    const [useAppState, setAppState] = create({ counter: 0 });
    const App = () => {
      const counter = useAppState((state) => state.counter);

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
    const [useAppState, setAppState] = create({ counter: 0 });
    const Counter = () => {
      const counter = useAppState((state) => state.counter);
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
    let renderCount = 0;

    const [useAppState, setAppState] = create({
      counter: 0,
      user: { name: 'xxx', signin: true },
    });

    const Counter = () => {
      renderCount++;
      const counter = useAppState((state) => state.counter);
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
      renderCount++;
      const user = useAppState((state) => state.user);
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
      renderCount++;
      return (
        <>
          <User />
          <Counter />
        </>
      );
    };
    render(<App />);
    expect(renderCount).toBe(3);
    expect(screen.getByText(/Counter: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Welcome xxx/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Increment'));
    await waitFor(() => {
      expect(screen.getByText(/Counter: 1/)).toBeInTheDocument();
      expect(renderCount).toBe(4);
    });
    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByText(/Welcome Guest/)).toBeInTheDocument();
      expect(renderCount).toBe(5);
    });
  });

  it('Constructs a single object with multiple state-picks', () => {
    const [useAppState] = create({
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
    let renderCount = 0;
    const [useAppState, setState] = create({
      settings: { theme: 'Dark' },
      products: { mobiles: ['M1', 'M2'], laptops: ['L1'] },
    });

    const Products = () => {
      renderCount++;

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
      renderCount++;
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
      renderCount++;
      const settings = useAppState((s) => s.settings);

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
    await waitFor(() => {
      fireEvent.click(screen.getByText('Add Laptop'));
    });
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(5);
    });
    await waitFor(() => {
      expect(renderCount).toBe(5);
    });
    await waitFor(() => {
      fireEvent.click(screen.getByText('Toggle'));
    });
    await waitFor(() => {
      expect(screen.getByText('Theme: Light')).toBeInTheDocument();
      expect(renderCount).toBe(6);
    });
  });

  test('Replacing the state instead of merging', async () => {
    interface State {
      settings: { theme: string };
      user?: { name: string };
    }
    const [useAppState, setAppState] = create<State>({
      settings: { theme: 'Dark' },
      user: { name: 'xxx' },
    });
    const App = () => {
      const { settings, user } = useAppState(
        (s) => ({ settings: s.settings, user: s.user }),
        { shallow: true }
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
    interface State {
      counter: number;
    }
    const [useCounterState, set] = create<State>({ counter: 0 });

    function Counter() {
      const counter = useCounterState((state) => state.counter);

      const increment = (value: number): Promise<number> => {
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
