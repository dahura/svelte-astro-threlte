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
  <!-- Внутренний свет для лучшей видимости содержимого -->
  <T.PointLight
    position={[0, height / 2 - 5, 0]}
    intensity={1.5}
    color={0xffffff}
    distance={Math.max(width, depth) * 2}
  />
</T.Mesh>
