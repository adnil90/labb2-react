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
