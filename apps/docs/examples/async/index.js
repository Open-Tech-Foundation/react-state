import { create } from '@opentf/react-state';
import { Form, useField } from '@opentf/react-form';

const appState = {
  loading: false,
  packages: [],
  total: 0,
};

const { useAppState, setAppState } = create(appState);

const Search = () => {
  const SearchField = ({ name, placeholder }) => {
    const { field } = useField(name);

    return (
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder={placeholder}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    );
  };

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          setAppState({ loading: true });
          const response = await fetch(
            `https://registry.npmjs.com/-/v1/search?text=${values.pkgName}&size=10`
          );
          setAppState({ loading: false });
          setAppState(async (s) => {
            const result = await response.json();
            console.log(result);
            s.packages = result.objects;
            s.total = result.total;
          });
        }}
      >
        <div className="flex justify-center items-center">
          <SearchField name="pkgName" placeholder="Type keywords" />
          <button className="btn btn-sm btn-primary ml-2">Search npm</button>
        </div>
      </Form>
    </div>
  );
};

const Status = () => {
  const total = useAppState((s) => s.total);

  if (total === 0) {
    return (
      <div className="flex justify-center mt-5">
        <span>No results.</span>
      </div>
    );
  }

  return <div className="mt-2 text-sm text-warning">Packages found: {total}</div>;
};

const Package = ({ data }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-2 w-full">
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <p>{data.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-xs">Install Now</button>
        </div>
      </div>
    </div>
  );
};

const List = () => {
  const { packages, loading } = useAppState((s) => ({
    packages: s.packages,
    loading: s.loading,
  }));

  return (
    <div className="mt-3">
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
      <div className="flex flex-col">
        {!loading &&
          packages.map((p, i) => <Package key={i} data={p.package} />)}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="p-5">
      <Search />
      <Status />
      <List />
    </div>
  );
}
