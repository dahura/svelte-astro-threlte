<script lang="ts">
  import { T } from '@threlte/core'
  import type { Shelf } from './types'

  const {
    width = 60,
    depth = 60,
    thickness = 2,
    color = '#ffffff',
    position = [0, 0, 0]
  }: Shelf = $props()
</script>

<T.Mesh {position}>
  <T.BoxGeometry args={[width, thickness, depth]} />
  <T.MeshStandardMaterial {color} />
</T.Mesh>
