import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(__dirname, '../data/searchHistory.json');

// Define a City class
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4(); // Assign a unique ID when the city is created
    this.name = name;
  }
}

class HistoryService {
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(cities, null, 2));
  }

  public async getCities(): Promise<City[]> {
    return await this.read();
  }

  public async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const city = new City(cityName);
    cities.push(city);
    await this.write(cities);
  }

  public async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();

// TODO: Define a City class with name and id properties

// TODO: Complete the HistoryService class
// TODO: Define a read method that reads from the searchHistory.json file
// TODO: Define a write method that writes the updated cities array to the searchHistory.json file
// private async write(cities: City[]) {}
// TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
// TODO Define an addCity method that adds a city to the searchHistory.json file
// * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
