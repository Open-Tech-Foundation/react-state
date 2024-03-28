import { useEffect } from 'react';
import { setAppState, useAppState } from './store';
import { sleep } from '@opentf/std';

export default function Counter() {
  const count = useAppState((s) => s.app.count);

  useEffect(() => {
    console.log('Counter rendered');
  });

  async function sqrt(n: number): Promise<number> {
    await sleep(1000);
    return new Promise((resolve) => {
      resolve((n + 1) ** 2);
    });
  }

  return (
    <div style={{ padding: '25px' }}>
      <h1>Counter</h1>
      <div>Count: {count}</div>
      <button
        onClick={() =>
          setAppState(async (s) => {
            // s.app.count = await sqrt(s.app.count);
            s.app.count++;
          })
        }
      >
        Increment
      </button>
    </div>
  );
}
