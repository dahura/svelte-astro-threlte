<script lang="ts">
  import { T } from '@threlte/core'
  import { writable } from 'svelte/store'
  import type { BaseCabinet } from './types'

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

  // Door rotation states with writable for interactive control
  const leftDoorRotation = writable(0)
  const rightDoorRotation = writable(0)
  const MAX_ROTATION = Math.PI / 2 // 90 degrees

  let isDraggingLeft = false
  let isDraggingRight = false
  let startX = 0

  function onMouseDown(event: MouseEvent, isLeftDoor: boolean) {
    startX = event.clientX
    if (isLeftDoor) {
      isDraggingLeft = true
    } else {
      isDraggingRight = true
    }
  }

  function onMouseMove(event: MouseEvent) {
    if (isDraggingLeft || isDraggingRight) {
      const deltaX = event.clientX - startX
      const rotationChange = (deltaX / 100) * MAX_ROTATION // Adjust sensitivity as needed

      if (isDraggingLeft) {
        leftDoorRotation.update((current) =>
          Math.max(0, Math.min(MAX_ROTATION, current + rotationChange))
        )
      } else if (isDraggingRight) {
        rightDoorRotation.update((current) =>
          Math.max(-MAX_ROTATION, Math.min(0, current + rotationChange))
        )
      }

      startX = event.clientX
    }
  }

  function onMouseUp() {
    isDraggingLeft = false
    isDraggingRight = false
  }

  // Add event listeners for mouse move and up
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
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
    <T.Mesh position={[doorWidth / 2, 0, 0]} on:mousedown={(e) => onMouseDown(e, true)}>
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
    <T.Mesh position={[-doorWidth / 2, 0, 0]} on:mousedown={(e) => onMouseDown(e, false)}>
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

<style>
  :global(canvas) {
    cursor: pointer;
  }
</style>
