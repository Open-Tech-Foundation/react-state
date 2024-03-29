import { create } from '@opentf/react-state';

const {useAppState, setAppState, api} = create({ mode: 'Light', count: 0 });

api.subscribe(console.log);

export { useAppState, setAppState };
