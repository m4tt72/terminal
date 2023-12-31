<script lang="ts">
  import Ps1 from './lib/Ps1.svelte';
  import Input from './lib/Input.svelte';
  import History from './lib/History.svelte';
</script>

<main class="h-full border-2 rounded-md border-green-600 p-4 overflow-auto">
  <History />

  <div class="flex flex-row">
    <Ps1 />

    <Input />
  </div>
</main>
