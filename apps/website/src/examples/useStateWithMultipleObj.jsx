import { createState } from '@opentf/react-state';

const useAppState = createState({ theme: 'Light', lang: 'en-us' });

export default function App() {
  const theme = useAppState((s) => s.theme);
  const lang = useAppState((s) => s.lang);

  return (
    <div>
      <div>Theme: {theme}</div>
      <div>Lang: {lang}</div>
    </div>
  );
}
