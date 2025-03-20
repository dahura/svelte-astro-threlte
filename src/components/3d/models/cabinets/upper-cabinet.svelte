<script lang="ts">
  import type { BaseCabinet } from './types.ts'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { toggleRightLeftDoor } from '../../motions/doors/toogle-door.svelte.ts'
  import { useTexture } from '@threlte/extras'

  const cabinetColors = {
    white: {
      light: 'rgba(255, 255, 255, 1)', // белый светлый
      default: 'rgba(240, 240, 240, 1)', // белый стандартный
      dark: 'rgba(200, 200, 200, 1)' // белый темный
    },
    beige: {
      light: 'rgba(255, 250, 240, 1)', // бежевый светлый
      default: 'rgba(245, 245, 220, 1)', // бежевый стандартный
      dark: 'rgba(210, 210, 180, 1)' // бежевый темный
    },
    beigeGray: {
      light: 'rgba(230, 225, 215, 1)', // бежево серый светлый
      default: 'rgba(216, 207, 196, 1)', // бежево серый стандартный
      dark: 'rgba(180, 170, 160, 1)' // бежево серый темный
    },
    gray: {
      light: 'rgba(200, 200, 200, 1)', // серый светлый
      default: 'rgba(169, 169, 169, 1)', // серый стандартный
      dark: 'rgba(120, 120, 120, 1)' // серый темный
    },
    lightGray: {
      light: 'rgba(240, 240, 240, 1)', // светло-серый светлый
      default: 'rgba(224, 224, 224, 1)', // светло-серый стандартный
      dark: 'rgba(200, 200, 200, 1)' // светло-серый темный
    }
  } as const

  const metalTexture_1_4k = useTexture('textures/4k/metal-white.jpg', {})
  const metalTexture_2_4k = useTexture('textures/4k/metal-white-2.jpg', {})
  const scratches_dark_1k = useTexture('textures/1k/scratches-dark.jpg', {})
  const scratches_light_1k = useTexture('textures/1k/scratches-light.jpg', {})

  const woodTexture = useTexture('models/textures/wood.png', {
    transform: (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping

      return texture
    }
  }) // Adjust path as needed
  const handleTexture = useTexture('models/textures/metal.png', {
    transform: (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping

      return texture
    }
  })

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

{#await Promise.all( [woodTexture, handleTexture, metalTexture_1_4k, metalTexture_2_4k, scratches_dark_1k, scratches_light_1k] ) then [woodMap, handleMap, metalMap_1, metalMap_2, scratches_dark, scratches_light]}
  <T.Group position={[position.x, position.y, position.z]}>
    <!-- Левая стенка -->
    <T.Mesh position={[-width / 2 + 1, 0, 0]}>
      <T.BoxGeometry args={[2, height, depth]} />
      <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
    </T.Mesh>

    <!-- Правая стенка -->
    <T.Mesh position={[width / 2 - 1, 0, 0]}>
      <T.BoxGeometry args={[2, height, depth]} />
      <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
    </T.Mesh>

    <!-- Задняя стенка -->
    <T.Mesh position={[0, 0, -depth / 2 + 1]}>
      <T.BoxGeometry args={[width, height, 2]} />
      <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
    </T.Mesh>

    <!-- Верх шкафа -->
    <T.Mesh position={[0, height / 2 - 1, 0]}>
      <T.BoxGeometry args={[width, 2, depth]} />
      <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
    </T.Mesh>

    <!-- Низ шкафа -->
    <T.Mesh position={[0, -height / 2 + 1, 0]}>
      <T.BoxGeometry args={[width, 2, depth]} />
      <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
    </T.Mesh>

    <!-- Полки -->
    {#each Array(shelves) as _, i}
      <T.Mesh position={[0, -height / 2 + (i + 1) * shelfHeight, 0]}>
        <T.BoxGeometry args={[width - 4, 2, depth]} />
        <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
      </T.Mesh>
    {/each}

    <!-- Левая дверь -->
    <T.Group position={[-width / 2 + 1, 0, depth / 2]} rotation.y={$leftDoorRotation}>
      <T.Mesh position={[doorWidth / 2, 0, 0]} onclick={toggleLeft}>
        <T.BoxGeometry args={[doorWidth, height - 2, 2]} />
        <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />

        <!-- Ручка левой двери -->
        <T.Mesh position={[doorWidth / 2 - 5, 0, 1]}>
          <T.BoxGeometry args={[9, 60, 4]} />
          <T.MeshStandardMaterial map={handleMap} />
        </T.Mesh>
      </T.Mesh>
    </T.Group>

    <!-- Правая дверь -->
    <T.Group position={[width / 2 - 1, 0, depth / 2]} rotation.y={$rightDoorRotation}>
      <T.Mesh position={[-doorWidth / 2, 0, 0]} onclick={toggleRight}>
        <T.BoxGeometry args={[doorWidth, height - 2, 2]} />
        <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />

        <!-- Ручка правой двери -->
        <T.Mesh position={[-doorWidth / 2 + 5, 0, 1]}>
          <T.BoxGeometry args={[9, 60, 4]} />
          <T.MeshStandardMaterial map={handleMap} />
        </T.Mesh>
      </T.Mesh>
    </T.Group>
  </T.Group>
{/await}
