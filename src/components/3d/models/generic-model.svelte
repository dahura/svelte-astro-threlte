<script lang="ts">
  import type { GenericModelProps } from './types.ts'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { useTexture } from '@threlte/extras'
  import { toggleDrawerAnimation } from '../motions/drawer/toggle-drawer.svelte.ts'

  let {
    model,
    position
  }: { model: GenericModelProps; position: { x: number; y: number; z: number } } = $props()

  // Загрузка текстур
  const woodTexture = useTexture('models/textures/wood.png', {
    transform: (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      return texture
    }
  })

  const handleTexture = useTexture('models/textures/metal.png', {
    transform: (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      return texture
    }
  })

  const { toggleDrawer: toggle } = toggleDrawerAnimation()

  // Высота каждой полки/ящика
  const shelfHeight = model.dimensions.height / (model.shelves?.count ?? 1)
  let drawerPositions = $state(Array(model.drawers?.count ?? 0).fill(0))

  async function toggleDrawer(index: number) {
    const isOpen = drawerPositions[index] > 0
    const targetPosition = isOpen ? 0 : model.dimensions.depth / 2

    await toggle({
      from: drawerPositions[index],
      to: targetPosition,
      onUpdate: (value) => {
        drawerPositions[index] = value
      }
    })
  }
</script>

{#await Promise.all([woodTexture, handleTexture]) then [woodMap, handleMap]}
  <T.Group position={[position.x, position.y, position.z]}>
    <!-- Левая стенка -->
    <T.Mesh position={[-model.dimensions.width / 2 + 1, 0, 0]}>
      <T.BoxGeometry args={[2, model.dimensions.height, model.dimensions.depth]} />
      <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
    </T.Mesh>

    <!-- Правая стенка -->
    <T.Mesh position={[model.dimensions.width / 2 - 1, 0, 0]}>
      <T.BoxGeometry args={[2, model.dimensions.height, model.dimensions.depth]} />
      <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
    </T.Mesh>

    <!-- Задняя стенка -->
    <T.Mesh position={[0, 0, -model.dimensions.depth / 2 + 1]}>
      <T.BoxGeometry args={[model.dimensions.width, model.dimensions.height, 2]} />
      <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
    </T.Mesh>

    <!-- Верх шкафа -->
    <T.Mesh position={[0, model.dimensions.height / 2 - 1, 0]}>
      <T.BoxGeometry args={[model.dimensions.width, 2, model.dimensions.depth]} />
      <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />
    </T.Mesh>

    <!-- Низ шкафа -->
    <T.Mesh position={[0, -model.dimensions.height / 2 + 1, 0]}>
      <T.BoxGeometry args={[model.dimensions.width, 2, model.dimensions.depth]} />
      <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />
    </T.Mesh>

    <!-- Двери -->
    {#if model.doors}
      {#each Array(model.doors.count) as _, i}
        <T.Mesh position={[0, 0, model.dimensions.depth / 2]}>
          <T.BoxGeometry
            args={[model.dimensions.width / model.doors.count - 4, model.dimensions.height - 2, 2]}
          />
          <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />
        </T.Mesh>
      {/each}
    {/if}

    <!-- Ящики -->
    {#if model.drawers}
      {#each Array(model.drawers.count) as _, i}
        <T.Group
          position={[
            0,
            -model.dimensions.height / 2 + i * shelfHeight + shelfHeight / 2,
            drawerPositions[i]
          ]}
        >
          <T.Mesh position={[0, 0, model.dimensions.depth / 2]} onclick={() => toggleDrawer(i)}>
            <T.BoxGeometry args={[model.dimensions.width - 4, shelfHeight - 2, 2]} />
            <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />
          </T.Mesh>

          <!-- Ручка ящика -->
          {#if model.handles}
            <T.Mesh position={[0, 0, 1]}>
              <T.BoxGeometry args={[60, 4, 4]} />
              <T.MeshStandardMaterial map={handleMap} />
            </T.Mesh>
          {/if}

          <!-- Боковины и дно ящика -->
          <T.Mesh position={[0, -shelfHeight / 2 + 1, 0]}>
            <T.BoxGeometry args={[model.dimensions.width - 8, 2, model.dimensions.depth - 4]} />
            <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
          </T.Mesh>

          <T.Mesh position={[-model.dimensions.width / 2 + 4, 0, 0]}>
            <T.BoxGeometry args={[2, shelfHeight - 2, model.dimensions.depth - 4]} />
            <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
          </T.Mesh>

          <T.Mesh position={[model.dimensions.width / 2 - 4, 0, 0]}>
            <T.BoxGeometry args={[2, shelfHeight - 2, model.dimensions.depth - 4]} />
            <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
          </T.Mesh>

          <T.Mesh position={[0, 0, -model.dimensions.depth / 2 + 2]}>
            <T.BoxGeometry args={[model.dimensions.width - 8, shelfHeight - 2, 2]} />
            <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
          </T.Mesh>
        </T.Group>
      {/each}
    {/if}
  </T.Group>
{/await}
