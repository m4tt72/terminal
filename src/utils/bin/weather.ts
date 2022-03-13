import { getWeather } from '../../api';
//weather function
const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');

  if (!city) {
    return 'Usage: weather [city]. Example: weather casablanca';
  }

  const weather = await getWeather(city);

  return weather;
};

export default weather;
