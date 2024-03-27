import './App.css';
import Simple from './Simple';

function App() {
  return (
    <div>
      <h1>React State Playground</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          marginTop: '25px',
        }}
      >
        <div />
        <Simple />
        <div />
      </div>
    </div>
  );
}

export default App;
