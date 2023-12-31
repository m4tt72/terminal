<script lang="ts">
  import Ps1 from './components/Ps1.svelte';
  import Input from './components/Input.svelte';
  import History from './components/History.svelte';
</script>

<main class="h-full border-2 rounded-md border-green-600 p-4 overflow-auto">
  <History />

  <div class="flex flex-row">
    <Ps1 />

    <Input />
  </div>
</main>
