<script lang="ts">
  import type { GenericModelPosition, GenericModel } from './types.ts'
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { default as Drawer } from './parts/drawers/drawers.svelte'
  import { default as Door } from './parts/doors/doors.svelte'
  import { default as Cabinet } from './parts/cabinets/cabinet.svelte'
  import { default as Plinth } from './parts/plinths/plinth.svelte'
  import PivotPoint from '../basic/pivot-point.svelte'
  import { default as Shelf } from './parts/shelfs/shelfs.svelte'
  import { default as CornerCabinet } from './parts/cabinets/corner-cabinet.svelte'

  import { modelTextureStore } from '$/stores/redactor/texture-store.ts'
  import { textureManager } from '../basic/texture-manager'
  import { useTexture } from '@threlte/extras'
  import { getColor, modelColorsStore } from '$/stores/redactor/colors-store.ts'
  import type { Color } from '$/shared/constants/colors'
  import { onMount } from 'svelte'

  let { model, position }: { model: GenericModel; position: GenericModelPosition } = $props()

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

  // Создаем базовую текстуру по умолчанию с оптимизациями
  const defaultTexture = new THREE.Texture()
  defaultTexture.wrapS = THREE.RepeatWrapping
  defaultTexture.wrapT = THREE.RepeatWrapping
  defaultTexture.minFilter = THREE.LinearMipmapLinearFilter
  defaultTexture.magFilter = THREE.LinearFilter
  defaultTexture.anisotropy = 4
  defaultTexture.needsUpdate = true

  // Получаем путь к текстуре из store
  const textureStore = modelTextureStore.$get
  const texture_color = $derived($textureStore.currentTexture.color || 'white')

  const currentTexturePath = $derived($textureStore.currentTexture.path)

  // Кэш текстур для уменьшения загрузок
  const textureCache = new Map<string, THREE.Texture>()

  // Используем useTexture для загрузки текстуры
  const textureResult = $derived(
    useTexture(currentTexturePath, {
      transform: (texture) => {
        // Оптимизация текстуры
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.anisotropy = 4

        // Сохраняем в кэш
        if (!textureCache.has(currentTexturePath)) {
          textureCache.set(currentTexturePath, texture)
        }

        return texture
      }
    })
  )

  let texture = $state(defaultTexture)

  $effect(() => {
    // Проверяем кэш перед загрузкой
    if (textureCache.has(currentTexturePath)) {
      texture = textureCache.get(currentTexturePath) || defaultTexture
    } else if ($textureResult) {
      texture = $textureResult
      // Кэшируем для будущего использования
      textureCache.set(currentTexturePath, $textureResult)
    }
  })

  let drawerPositions = $state(Array(model.drawers?.count ?? 0).fill(0))

  // Мемоизация для предотвращения лишних перерасчетов
  let adjustedDrawerSizesCache = new Map<string, number[]>()

  // Обновленная функция для корректировки высот ящиков с кэшированием результатов
  function adjustDrawerSizes(sizes: number[], maxHeight: number): number[] {
    // Создаем ключ кэша
    const cacheKey = `${sizes.join('-')}-${maxHeight}`

    // Проверяем кэш
    if (adjustedDrawerSizesCache.has(cacheKey)) {
      return adjustedDrawerSizesCache.get(cacheKey)!
    }

    const totalHeight = sizes.reduce((sum, size) => sum + size, 0)
    const isTotalHeightGreaterThanMaxHeight = totalHeight > maxHeight

    let result: number[]

    if (isTotalHeightGreaterThanMaxHeight) {
      const scaleFactor = maxHeight / totalHeight
      result = sizes.map((size) => size * scaleFactor)
    } else {
      result = [...sizes]
    }

    // Сохраняем в кэш
    adjustedDrawerSizesCache.set(cacheKey, result)
    return result
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

  // Функция для обновления позиции ящика
  function updateDrawerPosition(event: CustomEvent<{ index: number; value: number }>) {
    const { index, value } = event.detail
    drawerPositions[index] = value
  }

  // Очистка кэша при размонтировании компонента
  onMount(() => {
    return () => {
      adjustedDrawerSizesCache.clear()
    }
  })
</script>

<PivotPoint height={model.dimensions.height} origin="bottom">
  <T.Group position={[position.x, position.y, position.z]}>
    <Plinth {model} />

    <!-- Угловой шкаф -->
    {#if model.corner?.isCorner}
      <CornerCabinet {model} woodMap={texture} {texture_color} />
    {/if}

    <!-- Обычный шкаф, рендерится только если нет углового -->
    {#if !model.corner?.isCorner}
      <Cabinet {model} woodMap={texture} {texture_color} />

      <!-- Ящики -->
      {#if model.drawers}
        {#each Array(model.drawers.count) as _, i}
          <Drawer
            {model}
            {i}
            {adjustedDrawerSizes}
            {drawerPositions}
            {texture}
            {texture_color}
            {MATERIAL_THICKNESS}
            {FACADE_THICKNESS}
            on:updateDrawerPosition={updateDrawerPosition}
          />
        {/each}
      {/if}

      <!-- Полки -->
      {#if model.shelves}
        {#each Array(model.shelves.count) as _, i}
          <Shelf
            {model}
            {i}
            {adjustedDrawerSizes}
            {gapHeight}
            {texture}
            {texture_color}
            {SHELF_THICKNESS}
          />
        {/each}
      {/if}

      <!-- Двери -->
      {#if model.doors}
        {#each Array(model.doors.count) as _, i}
          <Door {model} {texture} {texture_color} />
        {/each}
      {/if}
    {/if}
  </T.Group>
</PivotPoint>
