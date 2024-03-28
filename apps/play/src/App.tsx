import { useEffect } from 'react';
import './App.css';
import Counter from './Counter';
import Result from './Result';
import Todos from './Todos';
import { setAppState, useAppState } from './store';
import Dummmy from './Dummy';

function App() {
  const { theme, userName } = useAppState(
    (s) => ({
      theme: s.theme,
      userName: s.app.user.name,
    })
  );

  useEffect(() => {
    console.log('App rendered');
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>React State Playground</h1>
        <div>
          <span>Welcome, {userName}</span>
          <button
            onClick={() => {
              const t = theme === 'Light' ? 'Dark' : 'Light';
              setAppState({ theme: t });
            }}
          >
            {theme}
          </button>
          <button
            onClick={() => {
              setAppState((s) => {
                s.app.user.details.signin = true;
              });
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          marginTop: '25px',
        }}
      >
        <Counter />
        <Todos />
        <Result />
        <div />
      </div>
      <Dummmy />
    </div>
  );
}

export default App;
