<!-- ColorSelector.svelte -->
<script lang="ts">
  import { modelColorsStore } from '$/stores/redactor/colors-store'
  import type { Color } from './constants'
  import { COLORS } from '$/shared/constants/colors'
  import { cn } from '$lib/utils'
  import { createCountStore } from '$/stores/count-store.svelte'

  const colors = modelColorsStore.$get

  function selectColor(color: Color) {
    modelColorsStore.update((state) => ({ ...state, currentColor: color }))
  }
</script>

<div class="flex flex-wrap">
  {#each $colors.availableColors as color}
    <button
      aria-label={`Select ${color} color`}
      type="button"
      onclick={() => selectColor(color)}
      style={`background-color: ${COLORS[color].default}`}
      class={cn(
        // `bg-[${COLORS[color].default}]`,
        // `bg-[${COLORS[color].default_hex}]`,

        'w-12 h-12 inline-block m-1 cursor-pointer',
        $colors.currentColor === color && `border-2 border-[${COLORS[color].dark_hex}]`
      )}
    >
    </button>
  {/each}
</div>
