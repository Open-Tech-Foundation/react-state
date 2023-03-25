import { create } from '@opentf/react-state';

const [useAppState] = create({ theme: 'Light' });

export default function App() {
  const theme = useAppState((s) => s.theme);

  return <div>Theme: {theme}</div>;
}
