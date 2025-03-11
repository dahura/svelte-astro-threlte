<script lang="ts">
  import { T } from '@threlte/core'
  import type { Door } from './types'

  const {
    width = 30,
    height = 85,
    color = '#aaaaaa',
    position = [0, 0, 0],
    hingeSide = 'right'
  }: Door = $props()

  const hingeOffset = hingeSide === 'left' ? -width / 2 : width / 2
  const doorPosition: [number, number, number] = [
    position[0] + hingeOffset,
    position[1],
    position[2]
  ]
</script>

<T.Mesh {doorPosition}>
  <T.BoxGeometry args={[width, height, 1]} />
  <T.MeshStandardMaterial {color} />
</T.Mesh>
