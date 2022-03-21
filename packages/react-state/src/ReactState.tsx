import { ReactNode } from 'react';

interface IProps {
  thing: string;
}

function ReactState(props: IProps): ReactNode {
  return <div>Hello {props.thing}!</div>;
}

export default ReactState;
