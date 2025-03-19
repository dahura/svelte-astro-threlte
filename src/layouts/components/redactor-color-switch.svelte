<!-- ColorSelector.svelte -->
<script lang="ts">
  import { modelColorsStore } from '$/stores/redactor/colors-store'
  import type { Color } from './constants'
  import { COLORS } from '$/shared/constants/colors'
  import { cn } from '$lib/utils'

  const { currentColor, availableColors } = modelColorsStore.get()

  function selectColor(color: Color) {
    modelColorsStore.update((state) => ({ ...state, currentColor: color }))
  }
</script>

<div>
  {#each availableColors as color}
    <button
      aria-label={`Select ${color} color`}
      type="button"
      onclick={() => selectColor(color)}
      class={cn(
        `bg-[${COLORS[color].default}]`,
        'w-12 h-12 inline-block m-1 cursor-pointer',
        currentColor === color && 'border-2 border-black'
      )}
    >
    </button>
  {/each}
</div>
