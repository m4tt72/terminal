<script lang="ts">
  import Ps1 from './lib/Ps1.svelte';
  import { history } from './stores/history';
  import Input from './lib/Input.svelte';
</script>

<main class="h-full border-2 rounded-md border-green-600 p-4 overflow-auto">
  {#each $history as { command, outputs }}
    <div>
      <div class="flex flex-row">
        <Ps1 />

        <p class="text-white px-3">{command}</p>
      </div>

      {#each outputs as output}
        <p class="text-white">{output}</p>
      {/each}
    </div>
  {/each}

  <div class="flex flex-row">
    <Ps1 />

    <Input />
  </div>
</main>
