import { getWeather } from '../../api';
import type { Command } from '../../interfaces/command';
import { Missing, MissingType } from '../errors/Missing';
import { generateCommandUsage } from '../generateCommandUsage';
import { getArguments } from '../parseCommand';

async function weather(inputCmd: string) {
  const city = getArguments(inputCmd).join('+');

  if (!city) throw new Missing(MissingType.Options, 'city');

  const weather = await getWeather(city);

  return weather;
}

export const weatherCommand: Command = {
  name: 'weather',
  description: 'To get the weather of a city.',
  usage: generateCommandUsage({
    usage: 'weather [city]',
    example: 'weather casablanca',
  }),
  execute(inputCmd: string) {
    return weather(inputCmd);
  },
};
