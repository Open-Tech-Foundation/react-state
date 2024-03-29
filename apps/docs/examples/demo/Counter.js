import { useAppState } from './store';

export default function Counter() {
  const count = useAppState((s) => s.count);

  return (
    <div className="inline-flex mx-5">
      <span className="countdown font-mono text-6xl">
        <span style={{ '--value': count }}></span>
      </span>
    </div>
  );
}
