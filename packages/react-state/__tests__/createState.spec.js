import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { createState } from '../src';

const useAppState = createState({
  counter: 0,
});

function App() {
  const counter = useAppState((state) => state.counter);
  return (
    <div>
      <span>Counter: {counter}</span>
    </div>
  );
}

describe('App', () => {
  test('createState', () => {
    render(<App />);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });
});
