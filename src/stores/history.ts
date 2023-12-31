import { writable } from 'svelte/store';
import type { Command } from '../interfaces/command';

export const history = writable<Array<Command>>([]);
