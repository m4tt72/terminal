<script lang="ts">
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import Ps1 from './Ps1.svelte';
</script>

{#each $history as { command, outputs }}
  <div>
    <div class="flex flex-row">
      <Ps1 />

      <p style={`color: ${$theme.foreground}`} class="px-3">{command}</p>
    </div>

    {#each outputs as output}
      <p style={`color: ${$theme.foreground}`} class="whitespace-pre-wrap">
        {output}
      </p>
    {/each}
  </div>
{/each}
