import { useState } from 'react';
import { create } from '@opentf/react-state';

const [useAppState, setAppState] = create({ todos: ['Buy oranges'] });

export default function App() {
  const [text, setText] = useState('');
  const todos = useAppState((s) => s.todos);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((t) => (
          <li>{t}</li>
        ))}
      </ul>
      <div>
        <input onChange={(e) => setText(e.target.value)} />
        <button
          onClick={() => setAppState((s) => ({ todos: [...s.todos, text] }))}
        >
          Add todo
        </button>
      </div>
    </div>
  );
}
