import { getBio } from '../../api';

const about = async (args: string[]): Promise<string> => {
  const bio = await getBio();

  return bio;
};

export default about;
