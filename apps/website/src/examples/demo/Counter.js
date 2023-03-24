import useAppState from './store';

export default function Counter() {
  const count = useAppState((s) => s.count);

  return <div className="counter">Count: {count}</div>;
}
