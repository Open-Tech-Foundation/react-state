import { setAppState, useAppState } from './store';

export default function Header() {
  const mode = useAppState((s) => s.mode);

  const toggleTheme = () => {
    setAppState((s) => {
      s.mode = s.mode === 'Light' ? 'Dark' : 'Light';
    });
  };

  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">React State</a>
      </div>
      <div className="flex-none">
        <div className="flex flex-row-reverse">
          {mode === 'Light' ? '🔆' : '🌙'}
          <input
            type="checkbox"
            className="toggle"
            checked={mode === 'Dark'}
            onChange={toggleTheme}
          />
        </div>
      </div>
    </div>
  );
}
