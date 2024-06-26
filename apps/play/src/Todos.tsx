import { useEffect, useState } from 'react';
import { API, setAppState, useAppState } from './store';

export default function Simple() {
  const [text, setText] = useState('');
  const todos = useAppState((s) => s.app.todos);

  useEffect(() => {
    console.log('Todos rendered');
  });

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
      <div>
        <input onChange={(e) => setText(e.target.value)} />
        <button
          onClick={() =>
            setAppState((s) => {
              s.app.todos.push(text);
            })
          }
        >
          Add todo
        </button>
        <div style={{ marginTop: '15px' }}>
          <button
            type="button"
            onClick={() =>
              setAppState((s) => {
                s.app.todos = [];
                s.app.count = 0;
              })
            }
          >
            clear
          </button>
          <button type="button" onClick={() => API.reset()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
