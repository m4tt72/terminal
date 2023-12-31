<script lang="ts">
  import { history } from '../stores/history';
  import Ps1 from './Ps1.svelte';
</script>

{#each $history as { command, outputs }}
  <div>
    <div class="flex flex-row">
      <Ps1 />

      <p class="text-white px-3">{command}</p>
    </div>

    {#each outputs as output}
      <p class="text-white whitespace-pre-wrap">{output}</p>
    {/each}
  </div>
{/each}
