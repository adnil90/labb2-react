import { useQuery } from "@tanstack/react-query";
import { getDailyForecast } from "../lib/openMeteo";

export const useForecast = (lat: number, lon: number) =>
  useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: ({ signal }) => getDailyForecast(lat, lon, signal),
    enabled: Number.isFinite(lat) && Number.isFinite(lon),
  });
