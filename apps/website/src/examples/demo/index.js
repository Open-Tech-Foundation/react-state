import { useAppState, setCounterState } from './store';
import Header from './Header';
import Counter from './Counter';
import './styles.css';

export default function App() {
  const mode = useAppState((s) => s.mode);

  return (
    <div className="app" data-theme={mode}>
      <Header />
      <button onClick={() => setCounterState((s) => ({ count: s.count + 1 }))}>
        INCREMENT
      </button>
      <div>
        <Counter />
        <Counter />
        <Counter />
      </div>
    </div>
  );
}
