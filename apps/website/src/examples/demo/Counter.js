import { useCounterState } from './store';

export default function Counter() {
  const count = useCounterState((s) => s.count);

  return <div className="counter">{count}</div>;
}
