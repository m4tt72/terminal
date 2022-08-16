import { getProjects } from '../../api';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();

  return projects
    .filter((repo) => !repo.fork)
    .map(
      (repo) =>
        `<a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.name}</a>`,
    )
    .join('\n');
};
