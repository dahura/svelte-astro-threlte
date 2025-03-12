<script lang="ts">
  import { Tween } from 'svelte/motion'
  import type { BaseCabinet } from './types'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
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

  const leftDoorRotation = new Tween(0)
  const rightDoorRotation = new Tween(0)
  const MAX_ROTATION = Math.PI / 2 // 90 degrees

  let isLeftDoorOpen = false
  let isRightDoorOpen = false
  let isDragging = false
  let startX = 0
  let startY = 0
  let activeDoor: 'left' | 'right' | null = null // Отслеживаем, какая дверь активна
  let dragArea = { x: 0, y: 0, width: 0, height: 0 } // Область захвата

  // Проверка на удержание левой кнопки мыши
  function isLeftMouseButtonDown(event: PointerEvent): boolean {
    return event.buttons === 1 // Проверка, если левая кнопка мыши зажата
  }

  function toggleLeftDoor() {
    isLeftDoorOpen = !isLeftDoorOpen
    leftDoorRotation.set(isLeftDoorOpen ? -MAX_ROTATION : 0)
  }

  function toggleRightDoor() {
    isRightDoorOpen = !isRightDoorOpen
    rightDoorRotation.set(isRightDoorOpen ? MAX_ROTATION : 0)
  }

  function startDrag(event: Event, door: 'left' | 'right') {
    if (activeDoor) return // Если уже какая-то дверь двигается, не начинаем новую перетаскивание

    if (!isLeftMouseButtonDown(event.nativeEvent)) return // Дверь двигается только если левая кнопка мыши зажата

    activeDoor = door // Устанавливаем активную дверь
    isDragging = true
    startX = event.pointer.x
    startY = event.pointer.y

    // Устанавливаем область захвата (за дверью)
    dragArea = {
      x: event.pointer.x - startX,
      y: event.pointer.y - startY,
      width: doorWidth,
      height: height
    }
  }

  function dragLeftDoor(event: Event) {
    if (!isDragging || activeDoor !== 'left') return
    if (!isLeftMouseButtonDown(event.nativeEvent)) return // Проверяем, зажата ли левая кнопка мыши

    const deltaX = event.pointer.x - startX
    const deltaY = event.pointer.y - startY

    // Отслеживаем положение двери относительно области захвата
    leftDoorRotation.set(leftDoorRotation.current + (deltaY - dragArea.y) / 0.5)
  }

  function dragRightDoor(event: Event) {
    if (!isDragging || activeDoor !== 'right') return
    if (!isLeftMouseButtonDown(event.nativeEvent)) return // Проверяем, зажата ли левая кнопка мыши

    const deltaX = event.pointer.x - startX
    const deltaY = event.pointer.y - startY

    // Отслеживаем положение двери относительно области захвата
    rightDoorRotation.set(rightDoorRotation.current + (deltaY - dragArea.y) / 0.5)
  }

  function endDrag() {
    isDragging = false
    activeDoor = null // Завершаем перетаскивание и сбрасываем активную дверь
  }
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
  <T.Group position={[-width / 2 + 1, 0, depth / 2]} rotation.y={leftDoorRotation.current}>
    <T.Mesh
      position={[doorWidth / 2, 0, 0]}
      onpointerdown={(event: Event) => startDrag(event, 'left')}
      onpointermove={dragLeftDoor}
      onpointerup={endDrag}
      onpointercancel={endDrag}
    >
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
  <T.Group position={[width / 2 - 1, 0, depth / 2]} rotation.y={rightDoorRotation.current}>
    <T.Mesh
      position={[-doorWidth / 2, 0, 0]}
      onpointerdown={(event: Event) => startDrag(event, 'right')}
      onpointermove={dragRightDoor}
      onpointerup={endDrag}
      onpointercancel={endDrag}
    >
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
