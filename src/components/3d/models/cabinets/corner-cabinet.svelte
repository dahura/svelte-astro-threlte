<script lang="ts">
  import type { BaseCabinet } from './types'
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
    radius = 40, // Радиус округлой части
    height = 45,
    depth = 40,
    color = '#fff',
    position = [0, 0, 0],
    shelves = 2,
    doorColor = '#e6e6e6',
    handleColor = '#333'
  }: BaseCabinet = $props()

  const shelfHeight = height / (shelves + 1)
  const { toggleLeft, toggleRight, leftDoorRotation, rightDoorRotation } = toggleRightLeftDoor()
</script>

<T.Group {position}>
  <!-- Корпус (четверть цилиндра) -->
  <T.Mesh position={[0, 0, -depth / 2]}>
    <T.CylinderGeometry args={[radius, radius, height, 32, 1, false, Math.PI / 2, Math.PI / 2]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>

  <!-- Полки -->
  {#each Array(shelves) as _, i}
    <T.Mesh position={[0, -height / 2 + (i + 1) * shelfHeight, -depth / 2]}>
      <T.CylinderGeometry
        args={[radius - 2, radius - 2, 2, 32, 1, false, Math.PI / 2, Math.PI / 2]}
      />
      <T.MeshStandardMaterial {color} />
    </T.Mesh>
  {/each}

  <!-- Левая дверь -->
  <T.Group position={[-radius / 2, 0, depth / 2]} rotation.y={$leftDoorRotation}>
    <T.Mesh position={[radius / 4, 0, 0]} onclick={toggleLeft}>
      <T.CylinderGeometry
        args={[radius / 2, radius / 2, height - 2, 16, 1, false, 0, Math.PI / 4]}
      />
      <T.MeshStandardMaterial color={doorColor} />
      <!-- Ручка -->
      <T.Mesh position={[radius / 4 - 5, 0, 1]}>
        <T.BoxGeometry args={[3, 20, 2]} />
        <T.MeshStandardMaterial color={handleColor} />
      </T.Mesh>
    </T.Mesh>
  </T.Group>

  <!-- Правая дверь -->
  <T.Group position={[radius / 2, 0, depth / 2]} rotation.y={$rightDoorRotation}>
    <T.Mesh position={[-radius / 4, 0, 0]} onclick={toggleRight}>
      <T.CylinderGeometry
        args={[radius / 2, radius / 2, height - 2, 16, 1, false, -Math.PI / 4, Math.PI / 4]}
      />
      <T.MeshStandardMaterial color={doorColor} />
      <!-- Ручка -->
      <T.Mesh position={[-radius / 4 + 5, 0, 1]}>
        <T.BoxGeometry args={[3, 20, 2]} />
        <T.MeshStandardMaterial color={handleColor} />
      </T.Mesh>
    </T.Mesh>
  </T.Group>
</T.Group>
