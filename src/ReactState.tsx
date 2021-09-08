import * as React from 'react';

interface IProps {
  thing: string;
}

function ReactState(props: IProps): React.ReactNode {
  return <div>Hello {props.thing}!</div>;
}

export default ReactState;
