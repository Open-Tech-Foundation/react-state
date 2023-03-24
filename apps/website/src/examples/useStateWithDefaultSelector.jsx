import { createState } from '@opentf/react-state';

const useAppState = createState({
  isLogin: true,
  user: { id: 'abc123' },
  preferences: { theme: 'Dark' },
});

export default function App() {
  const state = useAppState((s) => s);

  return (
    <button
      onClick={() => {
        alert(JSON.stringify(state, null, 4));
      }}
    >
      Show State
    </button>
  );
}
