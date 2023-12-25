import { getBio } from '../../api';

export const about = async (_args: string[]): Promise<string> => {
  const bio = await getBio();

  return bio;
};
