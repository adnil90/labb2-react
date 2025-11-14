export type GeoResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  timezone?: string;
};

export type GeoResponse = {
  results?: GeoResult[];
};

export type DailyForecast = {
  time: string[]; // ISO dates
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: DailyForecast;
};

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCities(q: string, signal?: AbortSignal) {
  const u = new URL(GEOCODE_URL);
  u.searchParams.set("name", q);
  u.searchParams.set("count", "10");
  u.searchParams.set("language", "en");
  u.searchParams.set("format", "json");

  const r = await fetch(u, { signal });
  if (!r.ok) throw new Error(`Geocoding failed: ${r.status}`);
  const data = (await r.json()) as GeoResponse;
  return data.results ?? [];
}

export async function getDailyForecast(
  lat: number,
  lon: number,
  signal?: AbortSignal,
) {
  const u = new URL(FORECAST_URL);
  u.searchParams.set("latitude", String(lat));
  u.searchParams.set("longitude", String(lon));
  u.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");
  u.searchParams.set("timezone", "auto");

  const r = await fetch(u, { signal });
  if (!r.ok) throw new Error(`Forecast failed: ${r.status}`);
  return (await r.json()) as ForecastResponse;
}
