<script lang="ts">
  import type { BaseCabinet } from './types.ts'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { toggleRightLeftDoor } from '../../motions/doors/toogle-door.svelte.ts'

  type Event = THREE.Intersection & {
    intersections: THREE.Intersection[]
    object: THREE.Object3D
    eventObject: THREE.Object3D
    camera: THREE.Camera
    delta: THREE.Vector2
    nativeEvent: PointerEvent
    pointer: THREE.Vector2
    ray: THREE.Ray
    stopPropagation: () => void
    stopped: boolean
  }

  const {
    width = 120,

    height = 45,
    depth = 40,
    color = '#fff',
    position = [0, 0, 0],
    shelves = 1,
    doorColor = '#e6e6e6',
    handleColor = '#333'
  }: BaseCabinet = $props()

  const shelfHeight = height / (shelves + 1)
  const doorWidth = width / 2 - 1
  const { toggleLeft, toggleRight, leftDoorRotation, rightDoorRotation } = toggleRightLeftDoor()
</script>

<T.Group {position}>
  <!-- Левая стенка -->
  <T.Mesh position={[-width / 2 + 1, 0, 0]}>
    <T.BoxGeometry args={[2, height, depth]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>

  <!-- Правая стенка -->
  <T.Mesh position={[width / 2 - 1, 0, 0]}>
    <T.BoxGeometry args={[2, height, depth]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>

  <!-- Задняя стенка -->
  <T.Mesh position={[0, 0, -depth / 2 + 1]}>
    <T.BoxGeometry args={[width, height, 2]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>

  <!-- Верх шкафа -->
  <T.Mesh position={[0, height / 2 - 1, 0]}>
    <T.BoxGeometry args={[width, 2, depth]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>

  <!-- Низ шкафа -->
  <T.Mesh position={[0, -height / 2 + 1, 0]}>
    <T.BoxGeometry args={[width, 2, depth]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>

  <!-- Полки -->
  {#each Array(shelves) as _, i}
    <T.Mesh position={[0, -height / 2 + (i + 1) * shelfHeight, 0]}>
      <T.BoxGeometry args={[width - 4, 2, depth]} />
      <T.MeshStandardMaterial {color} />
    </T.Mesh>
  {/each}

  <!-- Левая дверь -->
  <T.Group position={[-width / 2 + 1, 0, depth / 2]} rotation.y={$leftDoorRotation}>
    <T.Mesh position={[doorWidth / 2, 0, 0]} onclick={toggleLeft}>
      <T.BoxGeometry args={[doorWidth, height - 2, 2]} />
      <T.MeshStandardMaterial color={doorColor} />

      <!-- Ручка левой двери -->
      <T.Mesh position={[doorWidth / 2 - 5, 0, 1]}>
        <T.BoxGeometry args={[3, 20, 2]} />
        <T.MeshStandardMaterial color={handleColor} />
      </T.Mesh>
    </T.Mesh>
  </T.Group>

  <!-- Правая дверь -->
  <T.Group position={[width / 2 - 1, 0, depth / 2]} rotation.y={$rightDoorRotation}>
    <T.Mesh position={[-doorWidth / 2, 0, 0]} onclick={toggleRight}>
      <T.BoxGeometry args={[doorWidth, height - 2, 2]} />
      <T.MeshStandardMaterial color={doorColor} />

      <!-- Ручка правой двери -->
      <T.Mesh position={[-doorWidth / 2 + 5, 0, 1]}>
        <T.BoxGeometry args={[3, 20, 2]} />
        <T.MeshStandardMaterial color={handleColor} />
      </T.Mesh>
    </T.Mesh>
  </T.Group>
</T.Group>
