import { createState } from '@open-tech-world/react-state';

const useAppState = createState({ user: { name: 'Xxx' } });

export default function App() {
  const [user, setAppState] = useAppState((s) => s.user, { set: true });

  return (
    <div>
      <div>{user ? `Welcome ${user.name}` : 'Welcome Guest!'}</div>
      <button onClick={() => setAppState({ user: null })}>Logout</button>
    </div>
  );
}
