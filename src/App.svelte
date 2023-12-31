<script lang="ts">
  import Ps1 from './components/Ps1.svelte';
  import Input from './components/Input.svelte';
  import History from './components/History.svelte';
  import { theme } from './stores/theme';
</script>

<svelte:head>
  {#if import.meta.env.VITE_TRACKING_ENABLED === 'true'}
    <script
      async
      defer
      data-website-id={import.meta.env.VITE_TRACKING_WEBSITE_ID}
      src={import.meta.env.VITE_TRACKING_URL}
    ></script>
  {/if}
</svelte:head>

<main
  class="h-full border-2 rounded-md p-4 overflow-auto"
  style={`background-color: ${$theme.background}; color: ${$theme.foreground}; border-color: ${$theme.green};`}
>
  <History />

  <div class="flex flex-row">
    <Ps1 />

    <Input />
  </div>
</main>
