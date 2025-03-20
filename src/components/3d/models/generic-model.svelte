<script lang="ts">
  import type { GenericModelProps } from './types.ts'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { useTexture } from '@threlte/extras'
  import { toggleDrawerAnimation } from '../motions/drawer/toggle-drawer.svelte.ts'
  import { toggleRightLeftDoor } from '../motions/doors/toogle-door.svelte.ts'

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
  const { toggleLeft, toggleRight, leftDoorRotation, rightDoorRotation } = toggleRightLeftDoor()

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
  const doorPosition = (
    model: GenericModelProps,
    count: number,
    index: number
  ): [x: number, y: number, z: number] => {
    const halfWidth = model.dimensions.width / 4
    const depthOffset = model.dimensions.depth / 2 - 1

    if (count === 1) {
      return [0, 0, depthOffset]
    }
    if (count === 2) {
      return index % 2 === 0 ? [-halfWidth + 2, 0, depthOffset] : [halfWidth - 2, 0, depthOffset]
    }
    return [0, 0, depthOffset]
  }

  const doorRotation = (count: number, index: number) => {
    if (count === 1) {
      return 0
    }
    if (count === 2) {
      return index % 2 === 0 ? $leftDoorRotation : $rightDoorRotation
    }
    return 0
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

    <!-- Полки -->
    {#if model.shelves}
      {#each Array(model.shelves.count) as _, i}
        <T.Mesh position={[0, -model.dimensions.height / 2 + (i + 1) * shelfHeight, 0]}>
          <T.BoxGeometry args={[model.dimensions.width - 4, 2, model.dimensions.depth]} />
          <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
        </T.Mesh>
      {/each}
    {/if}

    <!-- Двери -->
    {#if model.doors}
      {#each Array(model.doors.count) as _, i}
        {#if model.doors.count === 2}
          <T.Group
            position={[-model.dimensions.width / 2 + 1, 0, model.dimensions.depth / 2]}
            rotation.y={$leftDoorRotation}
          >
            <T.Mesh position={[model.dimensions.width / 4, 0, 0]} onclick={toggleLeft}>
              <T.BoxGeometry args={[model.dimensions.width / 2, model.dimensions.height - 2, 2]} />
              <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />

              <!-- Ручка левой двери -->
              <T.Mesh position={[model.dimensions.width / 4 - 5, 0, 1]}>
                <T.BoxGeometry args={[9, 60, 4]} />
                <T.MeshStandardMaterial map={handleMap} />
              </T.Mesh>
            </T.Mesh>
          </T.Group>

          <!-- Правая дверь -->
          <T.Group
            position={[model.dimensions.width / 2 - 1, 0, model.dimensions.depth / 2]}
            rotation.y={$rightDoorRotation}
          >
            <T.Mesh position={[-model.dimensions.width / 4, 0, 0]} onclick={toggleRight}>
              <T.BoxGeometry args={[model.dimensions.width / 2, model.dimensions.height - 2, 2]} />
              <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />

              <!-- Ручка правой двери -->
              <T.Mesh position={[-model.dimensions.width / 4 + 5, 0, 1]}>
                <T.BoxGeometry args={[9, 60, 4]} />
                <T.MeshStandardMaterial map={handleMap} />
              </T.Mesh>
              <!-- Ручка  двери -->
            </T.Mesh>
          </T.Group>
        {/if}
        {#if model.doors.count === 1}
          <T.Group
            position={[model.dimensions.width / 2 - 1, 0, model.dimensions.depth / 2]}
            rotation.y={$rightDoorRotation}
          >
            <T.Mesh position={[-model.dimensions.width / 2, 0, 0]} onclick={toggleRight}>
              <T.BoxGeometry args={[model.dimensions.width, model.dimensions.height - 2, 2]} />
              <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />
              <!-- Ручка  двери -->
              <T.Mesh position={[-model.dimensions.width / 2 + 5, 0, 1]}>
                <T.BoxGeometry args={[9, 60, 4]} />
                <T.MeshStandardMaterial map={handleMap} />
              </T.Mesh>
              <!-- Ручка  двери -->
            </T.Mesh>
          </T.Group>
        {/if}
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
