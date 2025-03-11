<script lang="ts">
  import { T } from '@threlte/core'
  import type { BaseCabinet } from './types'

  const {
    width = 60,
    height = 85,
    depth = 60,
    color = '#cccccc',
    position = [0, 0, 0]
  }: BaseCabinet = $props()
</script>

<T.Mesh {position}>
  <T.BoxGeometry args={[width, height, depth]} />
  <T.MeshStandardMaterial {color} />
</T.Mesh>
