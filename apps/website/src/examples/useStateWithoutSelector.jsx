import { create } from '@opentf/react-state';

const [useAppState] = create({});

export default function App() {
  const state = useAppState();

  console.log(state);

  return <pre>{JSON.stringify(state, null, 4)}</pre>;
}
