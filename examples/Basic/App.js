import { createState } from '@opentf/react-state';

import './styles.css';

const useCounterState = createState({ counter: 0 });

const Counter = () => {
  const [counter, setCounterState] = useCounterState((s) => s.counter, {
    set: true
  });
  return (
    <div className="counter">
      <button
        onClick={() => setCounterState((s) => ({ counter: s.counter - 1 }))}
      >
        -
      </button>
      <div className="counter-value">{counter}</div>
      <button
        onClick={() => setCounterState((s) => ({ counter: s.counter + 1 }))}
      >
        +
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>COUNTER</h1>
      <Counter />
    </div>
  );
}
