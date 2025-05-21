<script lang="ts">
  import RedactorChatToggleButton from './redactor-chat-toggle-button.svelte'
  import RedactorChat from './redactor-chat.svelte'
  import RedactorColorSwitch from './redactor-color-switch.svelte'
  import RedactorScene from './redactor-scene.svelte'
  import RedactorTextureSwitcher from './redactor-texture-switcher.svelte'

  let isChatVisible = $state(true)
</script>

<div class="relative flex flex-col h-screen overflow-hidden">
  <!-- Main content area with scene -->

  <div
    class="absolute inset-0 transition-transform duration-150 ease-in-out"
    style={isChatVisible ? 'transform: translateY(0)' : 'transform: translateY(0)'}
  >
    <div class="w-full h-full">
      <!-- Color Switch Component -->
      <!-- Scene Component -->
      <RedactorScene {isChatVisible} />
    </div>
  </div>

  <!-- Chat Toggle Button -->
  <RedactorChatToggleButton bind:isChatVisible />
  <div class="absolute top-0 left-0">
    <!-- <RedactorColorSwitch /> -->
    <RedactorTextureSwitcher />
  </div>

  <!-- AI Chat Section -->
  {#if isChatVisible}
    <div
      class="fixed bottom-0 left-0 right-0 transition-transform duration-150 ease-in-out"
      style="transform: translateY(0)"
    >
      <RedactorChat />
    </div>
  {/if}
</div>

<style>
  /* Only keeping minimal required styles that aren't available in Tailwind */
  :global(.animate-bounce) {
    animation: bounce 1s infinite;
  }

  :global(.animate-pulse) {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
