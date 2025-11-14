import { useQuery } from "@tanstack/react-query";
import { searchCities } from "../lib/openMeteo";

export const useGeocoding = (query: string) =>
  useQuery({
    queryKey: ["geocode", query],
    queryFn: ({ signal }) => searchCities(query, signal),
    enabled: query.trim().length > 0,
  });
