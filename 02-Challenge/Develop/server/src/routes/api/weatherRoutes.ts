import { Router, type Request, type Response } from 'express';
import WeatherService from '../../service/weatherService.js';
import HistoryService from '../../service/historyService.js';

const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;
  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName); // Save city to search history
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HistoryService.removeCity(id);
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from history' });
  }
});

export default router;

// // TODO: POST Request with city name to retrieve weather data
// router.post('/', (req: Request, res: Response) => {
//   // TODO: GET weather data from city name
//   // TODO: save city to search history
// });

// // TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {});

// // * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {});

