<script lang="ts">
  import { T } from '@threlte/core'
  import type { Drawer } from './types'

  const {
    width = 40,
    depth = 50,
    color = '#888888',
    position = [0, 0, 0],
    handleColor = '#000000'
  }: Drawer = $props()
</script>

<T.Mesh {position}>
  <!-- Корпус ящика -->
  <T.BoxGeometry args={[width, 15, depth]} />
  <T.MeshStandardMaterial {color} />
</T.Mesh>

<!-- Ручка ящика -->
<T.Mesh position={[position[0], position[1] + 7, position[2] + depth / 2]}>
  <T.BoxGeometry args={[width / 3, 1, 2]} />
  <T.MeshStandardMaterial color={handleColor} />
</T.Mesh>
