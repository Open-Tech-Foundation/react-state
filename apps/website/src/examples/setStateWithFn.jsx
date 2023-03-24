import { createState } from '@opentf/react-state';

const useAppState = createState({ theme: 'Light', lang: 'en-us' });

export default function App() {
  const [state, setAppState] = useAppState((s) => s, { set: true });

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
