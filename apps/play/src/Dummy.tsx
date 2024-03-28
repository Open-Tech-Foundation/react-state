import { useEffect } from 'react';
import { useAppState } from './store';

export default function Dummmy() {
  const keys = useAppState((s) => Object.keys(s));
  useEffect(() => {
    console.log('Dummy rendered', keys);
  });

  return <div>Dummy component</div>;
}
