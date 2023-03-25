import { create } from '@opentf/react-state';

const [useAppState, setAppState] = create({ theme: 'Light', lang: 'en-us' });

export default function App() {
  const state= useAppState((s) => s);

  return (
    <div>
      <div>Theme: {state.theme}</div>
      <div>Lang: {state.lang}</div>
      <button
        onClick={() =>
          setAppState((s) => ({ theme: s.theme === 'Dark' ? 'Light' : 'Dark' }))
        }
      >
        Toggle Theme
      </button>
    </div>
  );
}
