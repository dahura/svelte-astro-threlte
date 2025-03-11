<script lang="ts">
  import { T } from '@threlte/core'

  const {
    width = 592,
    height = 720,
    depth = 592,
    color = '#cccccc',
    position = [0, 0, 0] as [number, number, number]
  } = $props()
</script>

<T.Group {position}>
  <!-- Основной корпус (Задняя и боковые стенки) -->
  <T.Mesh position={[width / 4, height / 2, -depth / 4]}>
    <T.BoxGeometry args={[width / 2, height, depth / 2]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>

  <!-- Верхняя крышка -->
  <T.Mesh position={[width / 4, height, -depth / 4]}>
    <T.BoxGeometry args={[width / 2, 2, depth / 2]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>

  <!-- Полка (примерная высота = 1/2 от шкафа) -->
  <T.Mesh position={[width / 4, height / 2, -depth / 4]}>
    <T.BoxGeometry args={[width / 2, 2, depth / 2]} />
    <T.MeshStandardMaterial color="#b3b3b3" />
  </T.Mesh>
</T.Group>
