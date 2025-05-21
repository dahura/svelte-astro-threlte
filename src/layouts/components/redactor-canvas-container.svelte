<script lang="ts">
  import type { Snippet } from 'svelte'

  interface RedactorCanvasZoneProps {
    children: Snippet
    isChatVisible: boolean
  }

  const { children, isChatVisible }: RedactorCanvasZoneProps = $props()
</script>

<div
  class="absolute inset-0 transition-all duration-150 ease-in-out"
  style={isChatVisible ? 'bottom: 20rem' : 'bottom: 0'}
>
  <div class="w-full h-full">
    {@render children?.()}
  </div>
</div>
