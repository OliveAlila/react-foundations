export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  apparentTemperature: number;
}