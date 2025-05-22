import './app.css';
import App from './App.svelte';
import { mount } from 'svelte';

const target = document.getElementById('app');
let app: any = null;
if (target) {
  app = mount(App, {
    target,
  });
} else {
  console.error('Could not find element with id "app"');
}

export default app;
