import { createState } from '@opentf/react-state';

const useAppState = createState({ theme: 'Light' });

export default function App() {
  const theme = useAppState((s) => s.theme);

  return <div>Theme: {theme}</div>;
}
