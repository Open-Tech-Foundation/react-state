import { createState } from '@opentf/react-state';

const useAppState = createState({
  fruits: { Apple: 5, Mango: 2, Banana: 7 },
});

export default function App() {
  const [fruits, setAppState] = useAppState((s) => s.fruits, { set: true });

  const renderFruits = () => {
    let items = [];
    for (const key in fruits) {
      if (Object.hasOwnProperty.call(fruits, key)) {
        items.push(
          <li>
            {key}: {fruits[key]}
          </li>
        );
      }
    }

    return items;
  };

  return (
    <div>
      <h3>Fruits:</h3>
      <ul>{renderFruits()}</ul>
      <button
        onClick={() => setAppState((s) => ({ fruits: { Orange: 8, Kiwi: 3 } }), true)}
      >
        Next page
      </button>
    </div>
  );
}
