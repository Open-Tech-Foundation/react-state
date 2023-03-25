import { create } from '@opentf/react-state';

const [useAppState, setAppState, api] = create({ mode: 'Light' });

api.subscribe(console.log);

const [useCounterState, setCounterState, counterAPI] = create({ count: 0 });

counterAPI.subscribe(console.log);

export { useAppState, setAppState, useCounterState, setCounterState };
