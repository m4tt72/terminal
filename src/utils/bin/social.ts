import config from '../../../config.json';

export const instagram = async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open(`https://www.instagram.com/${config.social.instagram}/`);
  }, 1000);

  return 'Opening instagram...';
};

export const github = async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open(`https://github.com/${config.social.github}/`);
  }, 1000);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  }, 1000);

  return 'Opening linkedin...';
};

export const telegram = async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open(`https://t.me/${config.social.telegram}/`);
  }, 1000);

  return 'Opening Telegram...';
};
