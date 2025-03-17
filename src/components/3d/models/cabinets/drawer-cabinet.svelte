<script lang="ts">
  import type { BaseCabinet } from './types.ts'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { useTexture } from '@threlte/extras'
  import { toggleDrawerAnimation } from '../../motions/drawer/toggle-drawer.svelte.ts'

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
  }) // Adjust path as needed

  const cabinetColors = {
    white: {
      light: 'rgba(255, 255, 255, 1)',
      default: 'rgba(240, 240, 240, 1)',
      dark: 'rgba(200, 200, 200, 1)'
    },
    beige: {
      light: 'rgba(255, 250, 240, 1)',
      default: 'rgba(245, 245, 220, 1)',
      dark: 'rgba(210, 210, 180, 1)'
    },
    beigeGray: {
      light: 'rgba(230, 225, 215, 1)',
      default: 'rgba(216, 207, 196, 1)',
      dark: 'rgba(180, 170, 160, 1)'
    },
    gray: {
      light: 'rgba(200, 200, 200, 1)',
      default: 'rgba(169, 169, 169, 1)',
      dark: 'rgba(120, 120, 120, 1)'
    },
    lightGray: {
      light: 'rgba(240, 240, 240, 1)',
      default: 'rgba(224, 224, 224, 1)',
      dark: 'rgba(200, 200, 200, 1)'
    }
  } as const

  const {
    width = 120,
    height = 45,
    depth = 40,
    color = '#fff',
    position = [0, 0, 0],
    shelves = 1,
    handleColor = '#333'
  }: BaseCabinet = $props()

  const shelfHeight = height / (shelves + 1)
  let drawerPositions = $state(Array(shelves + 1).fill(0))

  const { toggleDrawer: toggle } = toggleDrawerAnimation()

  async function toggleDrawer(index: number) {
    const isOpen = drawerPositions[index] > 0
    const targetPosition = isOpen ? 0 : depth / 2

    await toggle({
      from: drawerPositions[index],
      to: targetPosition,
      onUpdate: (value) => {
        drawerPositions[index] = value
      }
    })
  }
</script>

{#await Promise.all( [woodTexture, handleTexture, metalTexture_1_4k, metalTexture_2_4k, scratches_dark_1k, scratches_light_1k] ) then [woodMap, handleMap, metalMap_1, metalMap_2, scratches_dark, scratches_light]}
  <T.Group {position}>
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

    <!-- Выдвижные ящики -->
    {#each Array(shelves + 1) as _, i}
      <T.Group position={[0, -height / 2 + i * shelfHeight + shelfHeight / 2, drawerPositions[i]]}>
        <!-- Фронтальная панель ящика -->
        <T.Mesh position={[0, 0, depth / 2]} onclick={() => toggleDrawer(i)}>
          <T.BoxGeometry args={[width - 4, shelfHeight - 2, 2]} />
          <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />

          <!-- Ручка ящика -->
          <T.Mesh position={[0, 0, 1]}>
            <T.BoxGeometry args={[60, 4, 4]} />
            <T.MeshStandardMaterial map={handleMap} />
          </T.Mesh>
        </T.Mesh>

        <!-- Дно ящика -->
        <T.Mesh position={[0, -shelfHeight / 2 + 1, 0]}>
          <T.BoxGeometry args={[width - 8, 2, depth - 4]} />
          <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
        </T.Mesh>

        <!-- Боковые стенки ящика -->
        <T.Mesh position={[-width / 2 + 4, 0, 0]}>
          <T.BoxGeometry args={[2, shelfHeight - 2, depth - 4]} />
          <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
        </T.Mesh>

        <T.Mesh position={[width / 2 - 4, 0, 0]}>
          <T.BoxGeometry args={[2, shelfHeight - 2, depth - 4]} />
          <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
        </T.Mesh>

        <!-- Задняя стенка ящика -->
        <T.Mesh position={[0, 0, -depth / 2 + 2]}>
          <T.BoxGeometry args={[width - 8, shelfHeight - 2, 2]} />
          <T.MeshStandardMaterial map={woodMap} color={cabinetColors.beigeGray.light} />
        </T.Mesh>
      </T.Group>
    {/each}
  </T.Group>
{/await}
