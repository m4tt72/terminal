import { getWeather } from '../../api'

export async function weather(args: string[]) {
  const city = args.join('+')

  if (!city)
    return 'Usage: weather [city]. Example: weather casablanca'

  const weather = await getWeather(city)

  return weather
}
