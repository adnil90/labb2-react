import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Fav = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export default function Favorites() {
  const [favs, setFavs] = useLocalStorage<Fav[]>("favs", []);

  function remove(id: number) {
    setFavs((prev) => prev.filter((f) => f.id !== id));
  }

  function itemHref(f: Fav) {
    const params = new URLSearchParams();
    params.set("lat", String(f.latitude));
    params.set("lon", String(f.longitude));
    params.set("name", f.name);
    params.set("country", f.country);
    if (f.admin1) params.set("admin1", f.admin1);
    return `/item/${f.id}?${params.toString()}`;
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
            <Link to={itemHref(f)}>
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
