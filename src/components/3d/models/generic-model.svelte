<script lang="ts">
  import type { GenericModelProps } from './types.ts'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { useTexture } from '@threlte/extras'
  import { toggleDrawerAnimation } from '../motions/drawer/toggle-drawer.svelte.ts'
  import { toggleRightLeftDoor } from '../motions/doors/toogle-door.svelte.ts'
  import { default as Drawer } from './parts/drawers/drawers.svelte'

  let { model }: { model: GenericModelProps } = $props()

  const MATERIAL_THICKNESS = 12
  const WALL_THICKNESS = 4
  const FACADE_THICKNESS = 2
  const COUNTERTOP_THICKNESS = 28 // Default thickness for countertop
  const COUNTERTOP_OVERHANG = 50

  // Новые константы для толщины материалов
  const DOOR_THICKNESS = 20
  const SIDE_WALL_THICKNESS = 16
  const BACK_WALL_THICKNESS = 4
  const FLOOR_THICKNESS = 19
  const SHELF_THICKNESS = 16
  // Default overhang for countertop in mm

  // // Загрузка текстур
  // const woodDarkTexture = useTexture('textures/4k/wood-dark.jpg', {
  //   transform: (texture) => {
  //     texture.wrapS = THREE.RepeatWrapping
  //     texture.wrapT = THREE.RepeatWrapping
  //     return texture
  //   }
  // })

  // const handleDarkTexture = useTexture('textures/4k/metal-dark.jpg', {
  //   transform: (texture) => {
  //     texture.wrapS = THREE.RepeatWrapping
  //     texture.wrapT = THREE.RepeatWrapping
  //     return texture
  //   }
  // })

  const woodTexture = useTexture('textures/4k/wooden-light.jpg', {
    transform: (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      return texture
    }
  })

  const handleTexture = useTexture('textures/4k/wooden-light.jpg', {
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
    // Убедитесь, что позиция учитывает толщину материала
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
      <T.Mesh position={[-model.dimensions.width / 2 + SIDE_WALL_THICKNESS / 2, 0, 0]}>
        <T.BoxGeometry
          args={[SIDE_WALL_THICKNESS, model.dimensions.height, model.dimensions.depth]}
        />
        <T.MeshStandardMaterial
          map={woodMap}
          color={new THREE.Color(0x333333)}
          roughness={0.5}
          metalness={0.1}
        />
      </T.Mesh>

      <!-- Правая стенка -->
      <T.Mesh position={[model.dimensions.width / 2 - SIDE_WALL_THICKNESS / 2, 0, 0]}>
        <T.BoxGeometry
          args={[SIDE_WALL_THICKNESS, model.dimensions.height, model.dimensions.depth]}
        />
        <T.MeshStandardMaterial
          map={woodMap}
          color={new THREE.Color(0x333333)}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0}
          roughness={0.5}
          metalness={0.1}
        />
      </T.Mesh>

      <!-- Задняя стенка -->
      <T.Mesh position={[0, 0, -model.dimensions.depth / 2 + BACK_WALL_THICKNESS / 2]}>
        <T.BoxGeometry
          args={[model.dimensions.width, model.dimensions.height, BACK_WALL_THICKNESS]}
        />
        <T.MeshStandardMaterial
          map={woodMap}
          color={new THREE.Color(0x333333)}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0}
          roughness={0.5}
          metalness={0.1}
        />
      </T.Mesh>

      <!-- Верх шкафа -->
      <T.Mesh position={[0, model.dimensions.height / 2 - FLOOR_THICKNESS / 2, 0]}>
        <T.BoxGeometry args={[model.dimensions.width, FLOOR_THICKNESS, model.dimensions.depth]} />
        <T.MeshStandardMaterial
          map={woodMap}
          color={new THREE.Color(0x333333)}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0}
          roughness={0.5}
          metalness={0.1}
        />
      </T.Mesh>

      <!-- Низ шкафа -->
      <T.Mesh position={[0, -model.dimensions.height / 2 + FLOOR_THICKNESS / 2, 0]}>
        <T.BoxGeometry args={[model.dimensions.width, FLOOR_THICKNESS, model.dimensions.depth]} />
        <T.MeshStandardMaterial
          map={woodMap}
          color={new THREE.Color(0x333333)}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0}
          roughness={0.5}
          metalness={0.1}
        />
      </T.Mesh>

      <!-- Ящики -->
      {#if model.drawers}
        {#each Array(model.drawers.count) as _, i}
          <Drawer
            {model}
            {i}
            {adjustedDrawerSizes}
            {drawerPositions}
            {woodMap}
            {handleMap}
            {MATERIAL_THICKNESS}
            {FACADE_THICKNESS}
          />
        {/each}
      {/if}

      <!-- Полки -->
      {#if model.shelves}
        {#each Array(model.shelves.count) as _, i}
          <T.Mesh
            position={[
              0,
              getElementPosition(i) +
                (adjustedDrawerSizes[i] > 0 ? adjustedDrawerSizes[i] / 2 : gapHeight / 2) -
                SHELF_THICKNESS / 2,
              0
            ]}
          >
            <T.BoxGeometry
              args={[model.dimensions.width - 4, SHELF_THICKNESS, model.dimensions.depth]}
            />
            <T.MeshStandardMaterial
              map={woodMap}
              color={new THREE.Color(0x333333)}
              roughness={0.5}
              metalness={0.1}
            />
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
                  args={[model.dimensions.width / 2, model.dimensions.height - 2, DOOR_THICKNESS]}
                />
                <T.MeshStandardMaterial
                  map={woodMap}
                  color={new THREE.Color(0x333333)}
                  roughness={0.5}
                  metalness={0.1}
                />

                <!-- Ручка левой двери -->
                <T.Mesh position={[model.dimensions.width / 4 - 5, 0, 1]}>
                  <T.BoxGeometry args={[9, 60, 4]} />
                  <T.MeshStandardMaterial map={handleMap} roughness={0.5} metalness={0.1} />
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
                  args={[model.dimensions.width / 2, model.dimensions.height - 2, DOOR_THICKNESS]}
                />
                <T.MeshStandardMaterial
                  map={woodMap}
                  color={new THREE.Color(0x333333)}
                  roughness={0.5}
                  metalness={0.1}
                />

                <!-- Ручка правой двери -->
                <T.Mesh position={[-model.dimensions.width / 4 + 5, 0, 1]}>
                  <T.BoxGeometry args={[9, 60, 4]} />
                  <T.MeshStandardMaterial map={handleMap} roughness={0.5} metalness={0.1} />
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
                <T.BoxGeometry
                  args={[model.dimensions.width, model.dimensions.height - 2, DOOR_THICKNESS]}
                />
                <T.MeshStandardMaterial
                  map={woodMap}
                  color={new THREE.Color(0x333333)}
                  roughness={0.5}
                  metalness={0.1}
                />
                <!-- Ручка  двери -->
                <T.Mesh position={[-model.dimensions.width / 2 + 5, 0, 1]}>
                  <T.BoxGeometry args={[9, 60, 4]} />
                  <T.MeshStandardMaterial map={handleMap} roughness={0.5} metalness={0.1} />
                </T.Mesh>
                <!-- Ручка  двери -->
              </T.Mesh>
            </T.Group>
          {/if}
        {/each}
      {/if}

      <!-- Столешница -->
      <T.Mesh position={[0, model.dimensions.height / 2 + COUNTERTOP_THICKNESS / 2, 0]}>
        <T.BoxGeometry
          args={[
            model.dimensions.width,
            COUNTERTOP_THICKNESS,
            model.dimensions.depth + COUNTERTOP_OVERHANG // 20 mm overhang
          ]}
        />
        <T.MeshStandardMaterial
          map={woodMap}
          color={new THREE.Color(0x333333)}
          roughness={0.5}
          metalness={0.1}
        />
      </T.Mesh>
    </T.Group>
  </T.Group>
{/await}
