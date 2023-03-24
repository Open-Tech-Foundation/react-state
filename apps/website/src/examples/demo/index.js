import useAppState from './store';
import Counter from './Counter';
import './styles.css';

export default function App() {
  const [count, setAppState] = useAppState((s) => s, { set: true });

  return (
    <div className="app">
      <button onClick={() => setAppState((s) => ({ count: s.count + 1 }))}>
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
