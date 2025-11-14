import { type FormEvent, useMemo, useState } from "react";
import { SearchForm } from "../components/SearchForm";
import { SearchResultItem } from "../components/SearchResultItem";
import { useGeocoding } from "../hooks/useGeocoding";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { GeoResult } from "../lib/openMeteo";

type Fav = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [q, setQ] = useState("");
  const { data, isLoading, isError, error, refetch } = useGeocoding(q);
  const [favs, setFavs] = useLocalStorage<Fav[]>("favs", []);
  const results: GeoResult[] | null = useMemo(
    () => (data ? data : null),
    [data],
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!q.trim()) return;
    refetch();
  }

  const isFav = (id: number) => favs.some((f) => f.id === id);

  function toggleFav(c: GeoResult) {
    setFavs((prev) =>
      prev.some((f) => f.id === c.id)
        ? prev.filter((f) => f.id !== c.id)
        : [
            ...prev,
            {
              id: c.id,
              name: c.name,
              country: c.country,
              admin1: c.admin1,
              latitude: c.latitude,
              longitude: c.longitude,
            },
          ],
    );
  }

  return (
    <section>
      <h2>Find a city</h2>

      <SearchForm
        value={q}
        loading={isLoading}
        onChange={setQ}
        onSubmit={onSubmit}
      />

      {isLoading && (
        <p
          role="status"
          aria-live="polite"
        >
          Loading…
        </p>
      )}
      {isError && (
        <p role="alert">Could not load cities: {(error as Error).message}</p>
      )}
      {!isLoading && !isError && results?.length === 0 && q && (
        <p>No results for “{q}”.</p>
      )}

      <ul aria-label="Search results">
        {results?.map((c) => (
          <SearchResultItem
            key={c.id}
            city={c}
            isFavorited={isFav(c.id)}
            onToggleFavorite={toggleFav}
          />
        ))}
      </ul>
    </section>
  );
}
