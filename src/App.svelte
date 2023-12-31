<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import type { Command } from './interfaces/command';

  let input: HTMLInputElement;
  let command = '';
  let history: Array<Command> = [];
  let isFocused = false;
  let hostname = window.location.hostname;
  let historyIndex = -1;

  const commands: Record<string, (args: string[]) => Promise<string> | string> =
    {
      help: () => 'Available commands: ' + Object.keys(commands).join(', '),
      hostname: () => hostname,
      pwd: () => '/home/guest',
      whoami: () => 'guest',
      clear: () => {
        history = [];

        return '';
      },
      echo: (args: string[]) => args.join(' '),
      curl: async (args: string[]) => {
        if (args.length === 0) {
          return 'curl: no URL provided';
        }

        const url = args[0];
        try {
          const response = await fetch(url);
          const data = await response.text();

          return data;
        } catch (error) {
          return `curl: could not fetch URL ${url}`;
        }
      },
    };

  const handleFocus = () => {
    isFocused = true;
  };

  const handleBlur = () => {
    isFocused = false;
  };

  onMount(() => {
    input.focus();

    window.addEventListener('click', () => input.focus());
  });

  afterUpdate(() => {
    input.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });

  onDestroy(() => {
    window.removeEventListener('click', () => input.focus());
  });

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const [commandName, ...args] = command.split(' ');
      const commandFunction = commands[commandName];

      if (commandFunction) {
        const output = await commandFunction(args);

        if (commandName !== 'clear') {
          history = [...history, { command, outputs: [output] }];
        }
      } else {
        const output = `${commandName}: command not found`;

        history = [...history, { command, outputs: [output] }];
      }

      command = '';
    } else if (event.key === 'ArrowUp') {
      if (historyIndex < history.length - 1) {
        historyIndex++;

        command = history[history.length - 1 - historyIndex].command;
      }

      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      if (historyIndex > -1) {
        historyIndex--;
        command =
          historyIndex >= 0
            ? history[history.length - 1 - historyIndex].command
            : '';
      }
      event.preventDefault();
    } else if (event.key === 'Tab') {
      event.preventDefault();

      const autoCompleteCommand = Object.keys(commands).find((cmd) =>
        cmd.startsWith(command),
      );

      if (autoCompleteCommand) {
        command = autoCompleteCommand;
      }
    }
  };
</script>

<main class="h-full border-2 rounded-md border-green-600 p-4 overflow-auto">
  {#each history as { command, outputs }}
    <div>
      <div class="flex flex-row">
        <h1 class="font-bold text-green-600">
          <span class="text-orange-600">guest</span>@{hostname}:<span
            class="text-white">~$</span
          >
        </h1>

        <p class="text-white px-3">{command}</p>
      </div>

      {#each outputs as output}
        <p class="text-white">{output}</p>
      {/each}
    </div>
  {/each}

  <div class="flex flex-row">
    <h1 class="font-bold text-green-600">
      <span class="text-orange-600">guest</span>@{hostname}:<span
        class="text-white">~$</span
      >
    </h1>

    <div class="input-container">
      <input
        id="command-input"
        name="command-input"
        aria-label="Command input"
        class="w-full px-3 bg-transparent outline-none caret-green-600 selection:text-white"
        type="text"
        bind:value={command}
        on:keydown={handleKeyDown}
        bind:this={input}
        on:focus={handleFocus}
        on:blur={handleBlur}
      />

      {#if isFocused}
        <div class="block-caret" style="left: {command.length}ch"></div>
      {/if}
    </div>
  </div>
</main>

<style>
  .input-container {
    position: relative;
    width: 100%;
  }

  .input-container input {
    caret-color: transparent;
  }

  .input-container .block-caret {
    position: absolute;
    top: 2px; /* Add this line */
    width: 10px;
    height: 1.2em;
    background-color: currentColor;
    animation: blink 1s infinite;
    margin-left: 14px;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
</style>
