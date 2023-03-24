import { Form, Field } from '@open-tech-foundation/react-form';
import { createState } from '@opentf/react-state';
import { useState } from 'react';

import './styles.css';

const appState = {
  packages: [],
  total: 0
};

const useAppState = createState(appState);

const Search = () => {
  const [loading, setLoading] = useState(false);
  const setState = useAppState(null, { set: true });
  return (
    <div className="search-form">
      <Form
        onSubmit={async (values) => {
          setLoading(true);
          const response = await fetch(
            `https://registry.npmjs.com/-/v1/search?text=${values.pkgName}&size=5`
          );
          setLoading(false);
          setState(async () => {
            const result = await response.json();
            console.log(result);
            return { packages: result.objects, total: result.total };
          });
        }}
      >
        <Field name="pkgName" type="search" placeholder="Package name" />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search npm'}
        </button>
      </Form>
    </div>
  );
};

const Status = () => {
  const total = useAppState((s) => s.total);

  return <div className="status">Results found: {total}</div>;
};

const Package = ({ data }) => {
  return (
    <div className="package">
      <h3>{data.name}</h3>
      <p>{data.description}</p>
    </div>
  );
};

const List = () => {
  const packages = useAppState((s) => s.packages);

  return (
    <div className="package-list">
      {packages.map((p, i) => (
        <Package key={i} data={p.package} />
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h2>Async Actions</h2>
      <Search />
      <Status />
      <List />
    </div>
  );
}
