import { create } from '@opentf/react-state';

const [useAppState] = create({
  isLogin: true,
  user: { id: '123' },
  preferences: { theme: 'Dark' },
});

export default function App() {
  const state = useAppState((s) => s);

  console.log(state);

  return <pre>{JSON.stringify(state, null, 4)}</pre>;
}
