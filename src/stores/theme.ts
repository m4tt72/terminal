import { writable } from 'svelte/store';
import themes from '../../themes.json';
import type { Theme } from '../interfaces/theme';

const defaultTheme: Theme = themes.find((t) => t.name === 'GruvboxDark')!;

export const theme = writable<Theme>(
  JSON.parse(localStorage.getItem('theme') || JSON.stringify(defaultTheme)),
);

theme.subscribe((value) => {
  localStorage.setItem('theme', JSON.stringify(value));
});
