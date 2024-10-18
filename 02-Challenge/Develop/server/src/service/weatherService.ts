import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = process.env.OPENWEATHER_API_KEY;

  private async fetchLocationData(city: string): Promise<Coordinates> {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
    const response = await axios.get(url);
    const data = response.data[0];
    return { lat: data.lat, lon: data.lon };
  }
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  // Fetch weather data using coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
    const response = await axios.get(url);
    return response.data;
  }

  // Parse the current weather data from the response
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.list[0];
    return {
      city: response.city.name,
      date: currentWeather.dt_txt,
      icon: currentWeather.weather[0].icon,
      iconDescription: currentWeather.weather[0].description,
      tempF: currentWeather.main.temp,
      windSpeed: currentWeather.wind.speed,
      humidity: currentWeather.main.humidity,
    };
  }

  // Complete getWeatherForCity method to fetch and return the weather for a city
  public async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
