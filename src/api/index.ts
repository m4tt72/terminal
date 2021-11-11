import axios from 'axios';

export const getProjects = async () => {
  const { data } = await axios.get('https://api.github.com/users/m4tt72/repos');

  const projects = data
    .filter((repo) => !repo.fork)
    .map(
      (repo) =>
        `<a href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    );
  return projects;
};

export const getBio = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/m4tt72/m4tt72/master/README.md',
  );

  return data;
};
