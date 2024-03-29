import { useAppState, setAppState } from './store';
import Header from './Header';
import Counter from './Counter';

export default function App() {
  const mode = useAppState((s) => s.mode);
  const classNames = `${mode === 'Light' ? 'bg-white' : 'bg-dark'} pb-5`;
  return (
    <div className={classNames} data-mode="light">
      <Header />
      <div className="flex justify-center mt-5">
        <Counter />
        <Counter />
        <Counter />
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="btn btn-sm btn-success"
          onClick={() =>
            setAppState((s) => {
              s.count++;
            })
          }
        >
          INCREMENT
        </button>
      </div>
    </div>
  );
}
