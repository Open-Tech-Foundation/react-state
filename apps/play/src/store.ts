import { create } from '../../../packages/react-state/src';

const state = {
  theme: 'Light',
  app: {
    todos: ['Buy eggs'],
    count: 0,
    user: { name: 'Xyz', details: { signin: false } },
  },
};
const { useAppState, setAppState, api: API } = create(state);

API.subscribe(console.log);

export { useAppState, setAppState, API };
