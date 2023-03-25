import { create } from '@opentf/react-state';

const [useAppState, setAppState] = create({
  fruits: { Apple: 5, Mango: 2, Banana: 7 },
});

export default function App() {
  const fruits = useAppState((s) => s.fruits);

  const renderFruits = () => {
    let items = [];
    for (const key in fruits) {
      items.push(
        <li>
          {key}: {fruits[key]}
        </li>
      );
    }

    return items;
  };

  return (
    <div>
      <h3>Fruits:</h3>
      <ul>{renderFruits()}</ul>
      <button
        onClick={() =>
          setAppState((s) => ({ fruits: { Orange: 8, Kiwi: 3 } }), true)
        }
      >
        Replace fruits
      </button>
    </div>
  );
}
