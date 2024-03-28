import { useEffect } from 'react';
import { useAppState } from './store';

export default function Result() {
  const { count, todos } = useAppState((s) => ({
    count: s.app.count,
    todos: s.app.todos.length,
  }));

  useEffect(() => {
    console.log('Result rendered');
  });

  return (
    <div style={{ padding: '25px' }}>
      <h1>Result</h1>
      <div>Count: {count}</div>
      <div>Todos: {todos}</div>
    </div>
  );
}
