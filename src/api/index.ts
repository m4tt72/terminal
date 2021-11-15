import axios from 'axios';

export const getProjects = async () => {
  const { data } = await axios.get('https://api.github.com/users/m4tt72/repos');

  return data;
};

export const getBio = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/m4tt72/m4tt72/master/README.md',
  );

  return data;
};

export const getWeather = async (city: string) => {
  const { data } = await axios.get(`/api/weather/${city}`);

  return data;
};

export const getQuote = async () => {
  const { data } = await axios.get('http://api.quotable.io/random');

  return {
    quote: `“${data.content}” — ${data.author}`,
  };
};
