<script lang="ts">
  import { type Snippet } from 'svelte'
  import { T } from '@threlte/core'
  import { pivotPointStore } from '$/stores/pivot-point-store'
  interface IPivotPoint {
    children?: Snippet
    height?: number
    origin?: 'bottom' | 'center' | 'top'
  }

  let { children, height = 0, origin = 'bottom' }: IPivotPoint = $props()

  const pivotOffset = {
    bottom: height / 2,
    center: 0,
    top: -height / 2
  }
</script>

<T.Group position.y={pivotOffset[origin]}>
  {@render children?.()}
</T.Group>
