import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Favorites() {
  const [favs, setFavs] = useLocalStorage<
    {
      id: number;
      name: string;
      country: string;
      admin1?: string;
      latitude: number;
      longitude: number;
    }[]
  >("favs", []);

  function remove(id: number) {
    setFavs((prev) => prev.filter((f) => f.id !== id));
  }

  if (favs.length === 0) {
    return <p>You have no favorites yet.</p>;
  }

  return (
    <section>
      <h2>Your favorites</h2>
      <ul>
        {favs.map((f) => (
          <li key={f.id}>
            <Link
              to={`/location/${f.id}`}
              state={f}
            >
              {f.name}, {f.country}
              {f.admin1 ? ` (${f.admin1})` : ""} — [{f.latitude.toFixed(2)},
              {f.longitude.toFixed(2)}]
            </Link>{" "}
            <button
              onClick={() => remove(f.id)}
              aria-label={`Remove ${f.name} from favorites`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
