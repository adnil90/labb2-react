import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { searchCities, type GeoResult } from "../lib/openMeteo";

export default function Home() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<GeoResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    setErr(null);
    try {
      const controller = new AbortController();
      const cities = await searchCities(query, controller.signal);
      setResults(cities);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function itemHref(c: GeoResult) {
    const params = new URLSearchParams();
    params.set("lat", String(c.latitude));
    params.set("lon", String(c.longitude));
    params.set("name", c.name);
    params.set("country", c.country);
    if (c.admin1) params.set("admin1", c.admin1);
    return `/item/${c.id}?${params.toString()}`;
  }

  return (
    <section>
      <h2>Find a city</h2>
      <form
        onSubmit={onSubmit}
        aria-label="City search"
      >
        <label htmlFor="q">City</label>
        <input
          id="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Stockholm"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={loading}
          aria-disabled={loading}
        >
          Search
        </button>
      </form>

      {loading && (
        <p
          role="status"
          aria-live="polite"
        >
          Loading…
        </p>
      )}
      {err && <p role="alert">Could not load cities: {err}</p>}
      {!loading && !err && results?.length === 0 && q && (
        <p>No results for “{q}”.</p>
      )}

      <ul aria-label="Search results">
        {results?.map((c) => (
          <li key={c.id}>
            <Link to={itemHref(c)}>
              {c.name}, {c.country}
              {c.admin1 ? ` (${c.admin1})` : ""} — [{c.latitude.toFixed(2)},
              {c.longitude.toFixed(2)}]
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
