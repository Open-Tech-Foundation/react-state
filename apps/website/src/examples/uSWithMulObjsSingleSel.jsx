import { create } from '@opentf/react-state';

const [useAppState, , api] = create({
  settings: { theme: 'Dark', lang: 'en-us' },
});

api.subscribe(console.log);

api.set({ isLogin: true });

export default function App() {
  const { theme, lang } = useAppState(
    (s) => ({
      theme: s.settings.theme,
      lang: s.settings.lang,
    }),
    { shallow: true } // Here, either theme or lang prop changed will trigger rendering of the component.
  );

  return (
    <div>
      <div>Theme: {theme}</div>
      <div>Lang: {lang}</div>
    </div>
  );
}
