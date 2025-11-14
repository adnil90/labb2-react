import { useLocation, useNavigate } from "react-router-dom";
import { ForecastTable } from "../components/ForecastTable";
import { useForecast } from "../hooks/useForecast";
import type { GeoResult } from "../lib/openMeteo";

const FALLBACK_LAT = Number(import.meta.env.VITE_DEFAULT_LAT ?? 59.3293);
const FALLBACK_LON = Number(import.meta.env.VITE_DEFAULT_LON ?? 18.0686);

export default function LocationDetails() {
  const nav = useNavigate();
  const location = useLocation();

  const state = location.state as GeoResult | undefined;
  const searchParams = new URLSearchParams(location.search);

  const lat =
    state?.latitude ??
    (searchParams.get("lat") ? Number(searchParams.get("lat")) : FALLBACK_LAT);

  const lon =
    state?.longitude ??
    (searchParams.get("lon") ? Number(searchParams.get("lon")) : FALLBACK_LON);

  const name = state?.name ?? searchParams.get("name") ?? "Location";
  const country = state?.country ?? searchParams.get("country") ?? "";

  const { data, isLoading, isError, error } = useForecast(lat, lon);

  return (
    <section>
      <button
        onClick={() => nav(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      <h2>
        {name} {country ? `(${country})` : ""}
      </h2>

      <p>
        Coordinates: {lat.toFixed(3)}, {lon.toFixed(3)}
      </p>

      {isLoading && <p role="status">Loading forecast…</p>}
      {isError && (
        <p role="alert">Could not load forecast: {(error as Error).message}</p>
      )}

      {data && (
        <ForecastTable
          dates={data.daily.time}
          min={data.daily.temperature_2m_min}
          max={data.daily.temperature_2m_max}
        />
      )}

      {!isLoading && !isError && !data && (
        <p>No forecast available right now.</p>
      )}
    </section>
  );
}
