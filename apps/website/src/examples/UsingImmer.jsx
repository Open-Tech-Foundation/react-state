import { memo, useCallback, useState } from 'react';
import { produce } from 'immer';
import { create } from '@opentf/react-state';

const [useAppState, setAppState] = create({
  todos: [
    {
      id: 'React',
      title: 'Learn React',
      done: true,
    },
    {
      id: 'Immer',
      title: 'Try immer',
      done: false,
    },
  ],
});

export default function App() {
  const [text, setText] = useState('');
  const todos = useAppState((s) => s.todos);
  const unfinishedTodoCount = todos.filter(
    (todo) => todo.done === false
  ).length;

  const handleToggle = useCallback((id) => {
    setAppState((s) =>
      produce(s, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      })
    );
  }, []);

  const handleAdd = useCallback(() => {
    setAppState((s) =>
      produce(s, (draft) => {
        draft.todos.push({
          id: 'todo_' + Math.random(),
          title: text,
          done: false,
        });
      })
    );
  }, [text]);

  return (
    <div>
      <input onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishedTodoCount}
    </div>
  );
}

const Todo = memo(({ todo, onToggle }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.done}
      onClick={() => onToggle(todo.id)}
    />
    {todo.title}
  </li>
));
