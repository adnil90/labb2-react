import { Link } from "react-router-dom";
import type { GeoResult } from "../lib/openMeteo";

type Props = {
  city: GeoResult;
  isFavorited: boolean;
  onToggleFavorite: (city: GeoResult) => void;
};

function buildHref(c: GeoResult) {
  const params = new URLSearchParams();
  params.set("lat", String(c.latitude));
  params.set("lon", String(c.longitude));
  params.set("name", c.name);
  params.set("country", c.country);
  if (c.admin1) params.set("admin1", c.admin1);
  return `/item/${c.id}?${params.toString()}`;
}

export function SearchResultItem({
  city: c,
  isFavorited,
  onToggleFavorite,
}: Props) {
  return (
    <li style={{ marginBottom: 8 }}>
      <Link to={buildHref(c)}>
        {c.name}, {c.country}
        {c.admin1 ? ` (${c.admin1})` : ""} — [{c.latitude.toFixed(2)},{" "}
        {c.longitude.toFixed(2)}]
      </Link>{" "}
      <button
        onClick={() => onToggleFavorite(c)}
        aria-pressed={isFavorited}
        aria-label={`${isFavorited ? "Remove" : "Add"} ${c.name}${
          c.admin1 ? ` (${c.admin1})` : ""
        } to favorites`}
      >
        {isFavorited ? "★ Favorited" : "☆ Favorite"}
      </button>
    </li>
  );
}
