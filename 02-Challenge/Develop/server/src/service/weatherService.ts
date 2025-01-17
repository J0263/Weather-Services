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
  city!: string;
  date!: string;
  icon!: string;
  iconDescription!: string;
  tempF!: number;
  windSpeed!: number;
  humidity!: number;
  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
class WeatherService {
  private baseURL = 'https://api.openweathermap.org';
  private apiKey = 'a37fbd3ea06fcdae6863671929e727f4';

  // Fetch location data (latitude and longitude) for a given city
  private async fetchLocationData(city: string): Promise<any> {
    const url = `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
    const response = await axios.get(url);
    console.log(response)
    return response.data;
  }

  private destructureLocationData(locationData: any[]): Coordinates {
    const { lat, lon } = locationData[0];
    return {lat, lon};
  }

  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }

  // Fetch weather data for the given coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
    const response = await axios.get(url);
    return response.data;
  }

  // Parse the current weather data from the response
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.list[0]; // Current weather is the first item in the list
    return new Weather(
      response.city.name,
      currentWeather.dt_txt,
      currentWeather.weather[0].icon,
      currentWeather.weather[0].description,
      currentWeather.main.temp,
      currentWeather.wind.speed,
      currentWeather.main.humidity
    );
  }

  // Complete the method to fetch weather for a city
  public async getWeatherForCity(city: string): Promise<Weather> {
    try {
      const coordinates = await this.fetchAndDestructureLocationData(city);
      const weatherData = await this.fetchWeatherData(coordinates);
      return this.parseCurrentWeather(weatherData);
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }
}

export default new WeatherService();


// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
// TODO: Create fetchLocationData method
// TODO: Create destructureLocationData method
// TODO: Create buildGeocodeQuery method
// TODO: Create buildWeatherQuery method
// TODO: Create fetchAndDestructureLocationData method
// TODO: Create fetchWeatherData method
// TODO: Build parseCurrentWeather method
// TODO: Complete buildForecastArray method
// TODO: Complete getWeatherForCity method