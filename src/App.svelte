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
      data-website-id={import.meta.env.VITE_TRACKING_SITE_ID}
      src={import.meta.env.VITE_TRACKING_URL}
    ></script>
  {/if}
</svelte:head>
<iframe src="/music.mp3" title="music" allow="autoplay" style="display:none" id="iframeAudio">
</iframe> 

<main
  class="h-full border-2 rounded-md p-4 overflow-auto text-xs sm:text-sm md:text-base"
  style={`background-color: ${$theme.background}; color: ${$theme.foreground}; border-color: ${$theme.green};`}>
  <div class="overlay"></div>
<div class="scanline"></div>
<header class="site clearfix">
  <div class="col one">
    <img src="logo.svg" alt="591 Systems" width="740" height="729" id="logo-v" />
  </div>
  <div class="col two">
    <h4>591 Systems (tm) <br /> <b>H</b>euristically <b>E</b>ncrypted <b>R</b>ealtime <b>O</b>perating <b>S</b>ystem (HEROS)</h4>
    <p>----------------------------------------</p>
    <p>HEROS v 1.0.0</p>
    <p>(c)2022 591 Industries</p>
    <p>- Server 591 -</p>
  </div>
</header>
  <History />

  <div class="flex flex-col md:flex-row">
    
    <Ps1 />

    <Input />
  </div>
</main>
