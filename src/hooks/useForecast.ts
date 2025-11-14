import { useQuery } from "@tanstack/react-query";
import { getDailyForecast } from "../lib/openMeteo";

export function useForecast(lat: number, lon: number) {
  return useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: ({ signal }) => getDailyForecast(lat, lon, signal),
    enabled: Number.isFinite(lat) && Number.isFinite(lon),
  });
}
