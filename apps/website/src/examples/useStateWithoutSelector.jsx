import { createState } from '@opentf/react-state';

const useAppState = createState({});

export default function App() {
  const state = useAppState();

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
