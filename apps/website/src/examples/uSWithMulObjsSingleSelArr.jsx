import { createState } from '@opentf/react-state';

const useAppState = createState({
  settings: { theme: 'Dark', lang: 'en-us' },
});

export default function App() {
  const [theme, lang] = useAppState(
    (s) => [s.settings.theme, s.settings.lang],
    { shallow: true }
  );

  return (
    <div>
      <div>Theme: {theme}</div>
      <div>Lang: {lang}</div>
    </div>
  );
}
