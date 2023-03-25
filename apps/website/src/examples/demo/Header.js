import { setAppState, useAppState } from "./store";

export default function Header() {
  const mode = useAppState((s) => s.mode);

  const toggleTheme = () => {
    setAppState((s) => ({ mode: s.mode === 'Light' ? 'Dark' : 'Light' }));
  };

  return (
    <div className="header">
      <button onClick={toggleTheme}>
        {mode === 'Light' ? '🔆' : '🌙'} Toggle
      </button>
    </div>
  );
}
