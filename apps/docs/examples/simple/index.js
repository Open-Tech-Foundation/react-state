import { useState } from 'react';
import { create } from '@opentf/react-state';
import { countBy } from '@opentf/std';

const State = {
  todos: [
    { id: 1, text: 'Buy Eggs', done: true },
    { id: 2, text: 'Buy Oranges', done: false },
  ],
};
const { useAppState, setAppState } = create(State);

function TodoItem({ todo, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
    </li>
  );
}

export default function App() {
  const [text, setText] = useState('');
  const todos = useAppState((s) => s.todos);
  const todosCount = countBy(todos, (t) => (t.done ? 'Done' : 'Not'));

  const handleToggle = (id) => {
    setAppState((s) => {
      const todo = s.todos.find((t) => t.id === id);
      todo.done = !todo.done;
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map((t, i) => (
          <TodoItem key={i} todo={t} onToggle={handleToggle} />
        ))}
      </ul>
      <div>
        <input onChange={(e) => setText(e.target.value)} />
        <button
          onClick={() =>
            setAppState((s) => {
              s.todos.push({ id: 'todo_' + Math.random(), text, done: false });
            })
          }
        >
          Add todo
        </button>
      </div>

      <div style={{ marginTop: '25px' }}>
        {!todosCount['Not'] && `👍 You've made it.`}
        {todosCount['Not'] && `Tasks left: ${todosCount['Not']}`}
      </div>
    </div>
  );
}
