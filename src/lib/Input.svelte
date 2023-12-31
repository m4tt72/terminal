<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import { history } from '../stores/history';
  import { commands } from '../utils/commands';

let command = '';
  let isFocused = false;
  let historyIndex = -1

  let input: HTMLInputElement;

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
          $history = [...$history, { command, outputs: [output] }];
        }
      } else {
        const output = `${commandName}: command not found`;

        $history = [...$history, { command, outputs: [output] }];
      }

      command = '';
    } else if (event.key === 'ArrowUp') {
      if (historyIndex < $history.length - 1) {
        historyIndex++;

        command = $history[$history.length - 1 - historyIndex].command;
      }

      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      if (historyIndex > -1) {
        historyIndex--;
        command =
          historyIndex >= 0
            ? $history[$history.length - 1 - historyIndex].command
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
