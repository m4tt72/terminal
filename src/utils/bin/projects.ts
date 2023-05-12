import { getProjects } from '../../api';
import { Command } from '../../interfaces/command';
import { generateCommandUsage } from '../generateCommandUsage';

const projects = async (): Promise<string> => {
  const projects = await getProjects();

  return projects
    .filter((repo) => !repo.fork)
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};

export const projectsCommand: Command = {
  name: 'projects',
  description: 'To get my projects.',
  usage: generateCommandUsage({ usage: 'projects' }),
  execute() {
    return projects();
  },
};
