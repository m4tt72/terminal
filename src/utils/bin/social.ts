import config from '../../../config.json';

export const instagram = async (args: string[]): Promise<string> => {
  const username = (config.social as any).instagram;

  if (username) {
    window.open(`https://www.instagram.com/${username}/`);

    return 'Opening instagram...';
  }

  return "Instagram profile not found.";
};

export const github = async (args: string[]): Promise<string> => {
  const username = (config.social as any).github;

  if (username) {
    window.open(`https://github.com/${username}/`);

    return 'Opening github...';
  }

  return "Github profile not found.";
};

export const linkedin = async (args: string[]): Promise<string> => {
  const username = (config.social as any).linkedin;

  if (username) {
    window.open(`https://www.linkedin.com/in/${username}/`);

    return 'Opening linkedin...';
  }

  return "Linkedin profile not found.";
};
