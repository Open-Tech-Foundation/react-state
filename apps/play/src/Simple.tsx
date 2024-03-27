import { useState } from 'react';
import { create } from '../../../packages/react-state/src';

const [useAppState, setAppState, API] = create({ todos: ['Buy oranges'] });

API.subscribe(console.log);

export default function Simple() {
  const [text, setText] = useState('');
  const todos = useAppState((s) => s.todos);

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
          onClick={() => setAppState((s) => ({ todos: [...s.todos, text] }))}
        >
          Add todo
        </button>
        <div style={{ marginTop: '15px' }}>
          <button type="button" onClick={() => API.reset()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
