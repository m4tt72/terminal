import axios from 'axios';

export const getProjects = async () => {
  const { data } = await axios.get('https://api.github.com/users/m4tt72/repos');

  const projects = data
    .filter((repo) => !repo.fork)
    .map((repo) => repo.html_url);
  return projects;
};

export const getBio = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/m4tt72/m4tt72/master/README.md',
  );

  return data;
};
