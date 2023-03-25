import { create } from '@opentf/react-state';

const [useAppState, setAppState] = create({ user: { name: 'Xxx' } });

export default function App() {
  const user = useAppState((s) => s.user);

  return (
    <div>
      <div>{user ? `Welcome ${user.name}` : 'Welcome Guest!'}</div>
      <button onClick={() => setAppState({ user: null })}>Logout</button>
    </div>
  );
}
