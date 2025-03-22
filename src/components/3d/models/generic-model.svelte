<script lang="ts">
  import type { GenericModelProps } from './types.ts'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { useTexture } from '@threlte/extras'
  import { toggleDrawerAnimation } from '../motions/drawer/toggle-drawer.svelte.ts'
  import { toggleRightLeftDoor } from '../motions/doors/toogle-door.svelte.ts'

  let { model }: { model: GenericModelProps } = $props()

  const MATERIAL_THICKNESS = 2

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

  // Обновленная функция для корректировки высот ящиков
  function adjustDrawerSizes(sizes: number[], maxHeight: number): number[] {
    console.log('maxHeight', maxHeight)
    const totalHeight = sizes.reduce((sum, size) => sum + size, 0)
    console.log('totalHeight', totalHeight)

    const isTotalHeightGreaterThanMaxHeight = totalHeight > maxHeight
    console.log('isTotalHeightGreaterThanMaxHeight', isTotalHeightGreaterThanMaxHeight)
    if (isTotalHeightGreaterThanMaxHeight) {
      const scaleFactor = maxHeight / totalHeight
      return sizes.map((size) => size * scaleFactor)
    }
    return sizes
  }

  // Применение корректировки к размерам ящиков
  let adjustedDrawerSizes = model.drawers
    ? adjustDrawerSizes(model.drawers.sizes, model.dimensions.height)
    : []

  // Вычисление оставшегося пространства
  const totalUsedHeight = adjustedDrawerSizes.reduce((sum, size) => sum + (size > 0 ? size : 0), 0)
  const remainingSpace = model.dimensions.height - totalUsedHeight

  // Вычисление высоты каждого пропуска
  const numberOfGaps = adjustedDrawerSizes.filter((size) => size === 0).length
  const gapHeight = numberOfGaps > 0 ? remainingSpace / numberOfGaps : 0

  // Новая функция для получения позиции элемента (ящика или полки)
  function getElementPosition(index: number): number {
    let position = -model.dimensions.height / 2
    for (let i = 0; i <= index; i++) {
      position += adjustedDrawerSizes[i] > 0 ? adjustedDrawerSizes[i] : gapHeight
    }
    return (
      position - (adjustedDrawerSizes[index] > 0 ? adjustedDrawerSizes[index] / 2 : gapHeight / 2)
    )
  }

  // Новая функция для получения высоты ящика
  function getDrawerHeight(index: number): number {
    if (!model.drawers || !adjustedDrawerSizes) return shelfHeight
    return adjustedDrawerSizes[index] ?? 0
  }

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
  <T.Group position={[model.position.x, model.position.y, model.position.z]}>
    <!-- Цоколь -->
    {#if model.dimensions.plinthHeight}
      <T.Mesh position={[0, -model.dimensions.height / 2 + model.dimensions.plinthHeight / 2, 0]}>
        <T.BoxGeometry
          args={[
            model.dimensions.width,
            model.dimensions.plinthHeight,
            model.dimensions.depth * 0.8
          ]}
        />
        <T.MeshStandardMaterial color={model.material.carcassColor} />
      </T.Mesh>
    {/if}

    <!-- Основная часть модели -->
    <T.Group position={[0, model.dimensions.plinthHeight ?? 0, 0]}>
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
      <T.Mesh position={[0, model.dimensions.height / 2 - MATERIAL_THICKNESS, 0]}>
        <T.BoxGeometry
          args={[model.dimensions.width, MATERIAL_THICKNESS, model.dimensions.depth]}
        />
        <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />
      </T.Mesh>

      <!-- Низ шкафа -->
      <T.Mesh position={[0, -model.dimensions.height / 2 + MATERIAL_THICKNESS, 0]}>
        <T.BoxGeometry
          args={[model.dimensions.width, MATERIAL_THICKNESS, model.dimensions.depth]}
        />
        <T.MeshStandardMaterial map={woodMap} color={model.material.facadeColor} />
      </T.Mesh>

      <!-- Ящики -->
      {#if model.drawers}
        {#each Array(model.drawers.count) as _, i}
          {#if adjustedDrawerSizes[i] > 0}
            <T.Group position={[0, getElementPosition(i), drawerPositions[i]]}>
              <T.Mesh position={[0, 0, model.dimensions.depth / 2]} onclick={() => toggleDrawer(i)}>
                <T.BoxGeometry
                  args={[model.dimensions.width - 4, getDrawerHeight(i) - MATERIAL_THICKNESS, 2]}
                />
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
              <T.Mesh position={[0, -getDrawerHeight(i) / 2 + MATERIAL_THICKNESS / 2, 0]}>
                <T.BoxGeometry
                  args={[
                    model.dimensions.width - 8,
                    MATERIAL_THICKNESS,
                    model.dimensions.depth - 4
                  ]}
                />
                <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
              </T.Mesh>

              <T.Mesh position={[-model.dimensions.width / 2 + 4, 0, 0]}>
                <T.BoxGeometry
                  args={[
                    MATERIAL_THICKNESS,
                    getDrawerHeight(i) - MATERIAL_THICKNESS,
                    model.dimensions.depth - 4
                  ]}
                />
                <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
              </T.Mesh>

              <T.Mesh position={[model.dimensions.width / 2 - 4, 0, 0]}>
                <T.BoxGeometry
                  args={[
                    MATERIAL_THICKNESS,
                    getDrawerHeight(i) - MATERIAL_THICKNESS,
                    model.dimensions.depth - 4
                  ]}
                />
                <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
              </T.Mesh>

              <T.Mesh position={[0, 0, -model.dimensions.depth / 2 + MATERIAL_THICKNESS]}>
                <T.BoxGeometry
                  args={[
                    model.dimensions.width - 8,
                    getDrawerHeight(i) - MATERIAL_THICKNESS,
                    MATERIAL_THICKNESS
                  ]}
                />
                <T.MeshStandardMaterial map={woodMap} color={model.material.carcassColor} />
              </T.Mesh>
            </T.Group>
          {/if}
        {/each}
      {/if}

      <!-- Полки -->
      {#if model.shelves}
        {#each Array(model.shelves.count) as _, i}
          <T.Mesh
            position={[
              0,
              getElementPosition(i) +
                (adjustedDrawerSizes[i] > 0 ? adjustedDrawerSizes[i] / 2 : gapHeight / 2),
              0
            ]}
          >
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
              position={[
                -model.dimensions.width / 2 + MATERIAL_THICKNESS,
                0,
                model.dimensions.depth / 2
              ]}
              rotation.y={$leftDoorRotation}
            >
              <T.Mesh position={[model.dimensions.width / 4, 0, 0]} onclick={toggleLeft}>
                <T.BoxGeometry
                  args={[model.dimensions.width / 2, model.dimensions.height - 2, 2]}
                />
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
                <T.BoxGeometry
                  args={[model.dimensions.width / 2, model.dimensions.height - 2, 2]}
                />
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
    </T.Group>
  </T.Group>
{/await}
