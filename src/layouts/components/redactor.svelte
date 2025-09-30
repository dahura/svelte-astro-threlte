<script lang="ts">
  // import { cabinets } from '$/components/3d/modules/module-1'
  import GenericModel from '$/components/3d/models/generic-model.svelte'
  import type { GenericModel as GenericModelProps } from '$/components/3d/models/types'
  import { modelColorsStore } from '$/stores/redactor/colors-store'
  import { modelCabinetsStore } from '$/stores/redactor/cabinets-store'
  import { COLORS } from '$/shared/constants/colors'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { T } from '@threlte/core'
  import * as THREE from 'three'
  import { useTexture } from '@threlte/extras'
  import { deepMerge } from '$lib/functions/deepMerge'

  // 4 группы шкафов нижние, столешница, шкафы рабочей зоны, верхние, , шкафы антресоли

  const colors = $modelColorsStore
  const storeCabinets = modelCabinetsStore

  const cabinets = modelCabinetsStore.$get

  const countertopTexture = useTexture('textures/4k/wooden-countertop-white.jpg', {
    transform: (texture) => {
      // texture.wrapS = THREE.RepeatWrapping
      // texture.wrapT = THREE.RepeatWrapping
      return texture
    }
  })
  const countertopTextureStone = useTexture('textures/4k/counter-top-stone-white.jpg', {
    transform: (texture) => {
      // texture.wrapS = THREE.RepeatWrapping
      // texture.wrapT = THREE.RepeatWrapping
      return texture
    }
  })

  const gapX = 50

  const gapY = 10

  const isEven = (index: number) => index % 2 === 0

  const SIDE_WALL_THICKNESS = 16

  const calculatePositionsX = (cabinets: GenericModelProps[], type: 'lower' | 'upper') => {
    const filteredCabinets = cabinets.filter((cabinet: GenericModelProps) =>
      type === 'lower' ? cabinet.type === 'lower' || cabinet.type === 'tall' : cabinet.type === type
    )

    return filteredCabinets.reduce<number[]>((acc, cabinet, index) => {
      if (index === 0) {
        // Позиция первого шкафа - половина его ширины
        return [cabinet.dimensions.width / 2]
      } else {
        // Для каждого следующего шкафа - предыдущая позиция + половина предыдущего + половина текущего
        const previousPosition = acc[index - 1]
        const currentWidth = cabinet.dimensions.width
        const previousWidth = filteredCabinets[index - 1].dimensions.width
        const newPosition = previousPosition + previousWidth / 2 + currentWidth / 2
        return [...acc, newPosition]
      }
    }, [])
  }

  $: lowerPositionsX = $cabinets?.cabinets ? calculatePositionsX($cabinets.cabinets, 'lower') : []
  $: upperPositionsX = $cabinets?.cabinets ? calculatePositionsX($cabinets.cabinets, 'upper') : []

  $: totalWidthOfUpperCabinets = $cabinets?.cabinets
    ? $cabinets.cabinets
        .filter((cabinet: GenericModelProps) => cabinet.type === 'upper')
        .reduce(
          (totalWidth: number, cabinet: GenericModelProps) => totalWidth + cabinet.dimensions.width,
          0
        )
    : 0

  $: totalWidthOfLowerCabinets = $cabinets?.cabinets
    ? $cabinets.cabinets
        .filter((cabinet: GenericModelProps) => cabinet.type === 'lower')
        .reduce(
          (totalWidth: number, cabinet: GenericModelProps) => totalWidth + cabinet.dimensions.width,
          0
        )
    : 0

  const calculateCountertopWidth = (cabinets: GenericModelProps[]) =>
    cabinets.reduce(
      (totalWidth: number, cabinet: GenericModelProps) =>
        totalWidth + (cabinet.type === 'lower' ? cabinet.dimensions.width : 0),
      0
    )

  $: counterTopWidth = $cabinets?.cabinets ? calculateCountertopWidth($cabinets.cabinets) : 0

  const COUNTERTOP_THICKNESS = 20 // Толщина столешницы
  const PLINTH_HEIGHT = 150 // Высота цоколя
  const BASE_CABINET_HEIGHT = 920 // Высота нижнего шкафа
  const COUNTER_HEIGHT = BASE_CABINET_HEIGHT + PLINTH_HEIGHT + COUNTERTOP_THICKNESS

  const COUNTERTOP_OVERHANG = 50
  const DEFAULT_TALL_CABINET_HEIGHT = 2400
  const DEFAULT_UPPER_CABINET_HEIGHT = 920

  // Находим высокий шкаф для определения общей высоты
  const getTallCabinetHeight = (cabinets: GenericModelProps[]) => {
    const tallCabinet = cabinets.find(
      (cabinet: GenericModelProps) => cabinet.dimensions.height === 2400
    )
    return tallCabinet?.dimensions.height ?? DEFAULT_TALL_CABINET_HEIGHT
  }

  // Находим стандартную высоту верхнего шкафа
  const getUpperCabinetHeight = (cabinets: GenericModelProps[]) => {
    const upperCabinet = cabinets.find((cabinet: GenericModelProps) => cabinet.type === 'upper')
    return upperCabinet?.dimensions.height ?? DEFAULT_UPPER_CABINET_HEIGHT
  }

  // Вычисляем высоту для верхних шкафов динамически
  $: calculateUpperCabinetPositionValue = $cabinets?.cabinets
    ? getTallCabinetHeight($cabinets.cabinets) - getUpperCabinetHeight($cabinets.cabinets)
    : 0

  // Константы для размеров шкафов по умолчанию
  const DEFAULT_LOWER_CABINET_DEPTH = 561
  const DEFAULT_UPPER_CABINET_DEPTH = 300

  $: calculateUpperCabinetZOffsetValue = $cabinets?.cabinets
    ? (($cabinets.cabinets.find((c: GenericModelProps) => c.type === 'upper')?.dimensions.depth ||
        DEFAULT_UPPER_CABINET_DEPTH) -
        ($cabinets.cabinets.find((c: GenericModelProps) => c.type === 'lower' || c.type === 'tall')
          ?.dimensions.depth || DEFAULT_LOWER_CABINET_DEPTH)) /
      2
    : 0

  // Agregar ejemplos de armarios de rincón basados en la imagen

  // Añadir estos muebles a tu array principal de muebles disponibles
</script>

<T.Group>
  <!-- Нижние шкафы -->
  <T.Group position.x={-totalWidthOfLowerCabinets / 2}>
    {#if $cabinets?.cabinets}
      {#each $cabinets.cabinets.filter((c: GenericModelProps) => c.type === 'lower' || c.type === 'tall') as model, index}
        {@const positionIndex = $cabinets.cabinets
          .filter((c: GenericModelProps) => c.type === 'lower' || c.type === 'tall')
          .findIndex((c) => c === model)}
        {@const xOffset = calculatePositionsX($cabinets.cabinets, 'lower')[positionIndex]}

        <GenericModel {model} position={{ x: xOffset, y: 0, z: 0 }} />
      {/each}
    {/if}

    <!-- Столешница -->
    {#await Promise.all( [countertopTexture, countertopTextureStone] ) then [countertopMap, countertopMapStone]}
      <T.Mesh
        position.y={BASE_CABINET_HEIGHT + COUNTERTOP_THICKNESS / 2}
        position.x={totalWidthOfLowerCabinets / 2}
        position.z={COUNTERTOP_OVERHANG / 2}
      >
        <T.BoxGeometry
          args={[
            totalWidthOfLowerCabinets,
            COUNTERTOP_THICKNESS,
            DEFAULT_LOWER_CABINET_DEPTH + COUNTERTOP_OVERHANG
          ]}
        />
        <T.MeshStandardMaterial map={countertopMapStone} color={COLORS.whiteMarble.light} />
      </T.Mesh>
    {/await}
  </T.Group>

  <!-- Верхние шкафы -->
  <T.Group position.x={-totalWidthOfUpperCabinets / 2}>
    {#if $cabinets?.cabinets}
      {#each $cabinets.cabinets.filter((c: GenericModelProps) => c.type === 'upper') as model, index}
        {@const positionIndex = $cabinets.cabinets
          .filter((c: GenericModelProps) => c.type === 'upper')
          .findIndex((c) => c === model)}
        {@const xOffset = calculatePositionsX($cabinets.cabinets, 'upper')[positionIndex]}
        {@const yOffset = calculateUpperCabinetPositionValue}
        {@const zOffset = calculateUpperCabinetZOffsetValue}

        <GenericModel {model} position={{ x: xOffset, y: yOffset, z: zOffset }} />
      {/each}
    {/if}
  </T.Group>
</T.Group>
