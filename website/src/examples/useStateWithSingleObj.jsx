import { createState } from '@open-tech-world/react-state';

const useAppState = createState({ theme: 'Light' });

export default function App() {
  const theme = useAppState((s) => s.theme);

  return <div>Theme: {theme}</div>;
}
