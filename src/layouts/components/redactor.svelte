<script lang="ts">
  // import { cabinets } from '$/components/3d/modules/module-1'
  import GenericModel from '$/components/3d/models/generic-model.svelte'
  import type { GenericModel as GenericModelProps } from '$/components/3d/models/types'
  import { modelColorsStore } from '$/stores/redactor/colors-store'
  import { COLORS } from '$/shared/constants/colors'
  import { onMount } from 'svelte'
  import { T } from '@threlte/core'
  import * as THREE from 'three'
  import { useTexture } from '@threlte/extras'
  import { deepMerge } from '$lib/functions/deepMerge'

  // 4 группы шкафов нижние, столешница, шкафы рабочей зоны, верхние, , шкафы антресоли

  const colors = modelColorsStore.$get

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

  export const cabinets: GenericModelProps[] = [
    //нижние шкафы
    {
      type: 'lower',
      dimensions: { width: 600, height: 920, depth: 561, plinthHeight: 150 },
      material: {
        finish: 'wood-texture'
      },
      specialMechanisms: { softCloseHinges: true },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      handles: { modelId: 'handle-1', position: 'side' },
      drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false } // Adjusted sizes for the drawers to not exceed cabinet height
    },
    {
      type: 'lower',
      dimensions: { width: 800, height: 920, depth: 561, plinthHeight: 150 },
      material: {
        finish: 'wood-texture'
      }, // Sienna
      specialMechanisms: { softCloseHinges: true },
      // shelves: { count: 0, adjustable: true, material: 'wood' },
      doors: { count: 1, type: 'hinged' }
    },
    {
      type: 'lower',
      dimensions: { width: 600, height: 920, depth: 561, plinthHeight: 150 },
      // shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false },
      handles: { modelId: 'handle-1', position: 'side' },
      material: {
        finish: 'wood-texture'
      } // Chocolate
    },
    {
      type: 'lower',
      dimensions: { width: 900, height: 920, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false },
      handles: { modelId: 'handle-1', position: 'side' },
      material: {
        finish: 'wood-texture'
      }
    },
    {
      type: 'lower',
      dimensions: { width: 400, height: 920, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false },
      handles: { modelId: 'handle-1', position: 'side' },
      material: {
        finish: 'wood-texture'
      }
    },
    {
      type: 'tall',
      dimensions: { width: 600, height: 2400, depth: 561, plinthHeight: 150 },
      shelves: { count: 5, adjustable: true, material: 'wood' },
      drawers: { count: 5, sizes: [360, 360, 0, 600, 300], withSoftClose: false },
      handles: { modelId: 'handle-1', position: 'side' },
      material: {
        finish: 'wood-texture'
      }
    },
    // верхние шкафы
    {
      type: 'upper',
      dimensions: { width: 800, height: 920, depth: 300 },
      material: {
        finish: 'wood-texture'
      },
      doors: { count: 2, type: 'hinged' },
      shelves: { count: 2, adjustable: true, material: 'wood' }
    },
    {
      type: 'upper',
      dimensions: { width: 800, height: 920, depth: 300 },
      material: {
        finish: 'wood-texture',
        facadeColor: 'rgba(0, 0, 0, 1)', // black
        carcassColor: 'rgba(101, 67, 33, 1)' // darkbrown
      },
      doors: { count: 1, type: 'hinged' },
      shelves: { count: 2, adjustable: true, material: 'wood' }
    },
    {
      type: 'upper',
      dimensions: { width: 800, height: 920, depth: 300 },
      material: {
        finish: 'wood-texture'
      },
      doors: { count: 1, type: 'hinged' },
      shelves: { count: 2, adjustable: true, material: 'wood' }
    },
    {
      type: 'upper',
      dimensions: { width: 900, height: 920, depth: 300 },
      shelves: { count: 2, adjustable: true, material: 'wood' },
      material: {
        // SaddleBrown
        finish: 'wood-texture'
      },
      doors: { count: 1, type: 'hinged' }
    }
    // Угловой шкаф
    // {
    //   type: 'lower',
    //   dimensions: { width: 900, height: 920, depth: 900, plinthHeight: 150 },
    //   corner: {
    //     shelfCount: 2,
    //     adjustableShelves: true,
    //     isCorner: true,
    //     cornerDepth: 900,
    //     orientation: 'left', // or 'right', depending on your design
    //     cornerType: 'L-shaped', // or 'diagonal'
    //     mechanism: {
    //       type: 'carousel',
    //       rotatable: true
    //     }
    //   },
    //   material: {
    //     finish: 'wood-texture'
    //   },
    //   shelves: { count: 2, adjustable: true, material: 'wood' },
    //   handles: { modelId: 'handle-1', position: 'side' }
    // }
  ]

  const gapY = 10

  const isEven = (index: number) => index % 2 === 0

  const SIDE_WALL_THICKNESS = 16

  const calculatePositionsX = (cabinets: GenericModelProps[], type: 'lower' | 'upper') => {
    const filteredCabinets = cabinets.filter((cabinet) =>
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

  const lowerPositionsX = calculatePositionsX(cabinets, 'lower')
  const upperPositionsX = calculatePositionsX(cabinets, 'upper')

  const totalWidthOfUpperCabinets = cabinets
    .filter(({ type }) => type === 'upper')
    .reduce((totalWidth, cabinet) => totalWidth + cabinet.dimensions.width, 0)

  const totalWidthOfLowerCabinets = cabinets
    .filter(({ type }) => type === 'lower')
    .reduce((totalWidth, cabinet) => totalWidth + cabinet.dimensions.width, 0)

  const calculateCountertopWidth = (cabinets: GenericModelProps[]) =>
    cabinets.reduce(
      (totalWidth, cabinet) =>
        totalWidth + (cabinet.type === 'lower' ? cabinet.dimensions.width : 0),
      0
    )

  const counterTopWidth = calculateCountertopWidth(cabinets)

  const COUNTERTOP_THICKNESS = 20 // Толщина столешницы
  const PLINTH_HEIGHT = 150 // Высота цоколя
  const BASE_CABINET_HEIGHT = 920 // Высота нижнего шкафа
  const COUNTER_HEIGHT = BASE_CABINET_HEIGHT + PLINTH_HEIGHT + COUNTERTOP_THICKNESS

  const COUNTERTOP_OVERHANG = 50
  const DEFAULT_TALL_CABINET_HEIGHT = 2400
  const DEFAULT_UPPER_CABINET_HEIGHT = 920

  // Находим высокий шкаф для определения общей высоты
  const getTallCabinetHeight = (cabinets: GenericModelProps[]) => {
    const tallCabinet = cabinets.find((cabinet) => cabinet.dimensions.height === 2400)
    return tallCabinet?.dimensions.height ?? DEFAULT_TALL_CABINET_HEIGHT
  }

  // Находим стандартную высоту верхнего шкафа
  const getUpperCabinetHeight = (cabinets: GenericModelProps[]) => {
    const upperCabinet = cabinets.find((cabinet) => cabinet.type === 'upper')
    return upperCabinet?.dimensions.height ?? DEFAULT_UPPER_CABINET_HEIGHT
  }

  // Вычисляем высоту для верхних шкафов динамически
  const calculateUpperCabinetPosition = (cabinets: GenericModelProps[]) => {
    const tallHeight = getTallCabinetHeight(cabinets)
    const upperHeight = getUpperCabinetHeight(cabinets)
    return tallHeight - upperHeight
  }

  // Константы для размеров шкафов по умолчанию
  const DEFAULT_LOWER_CABINET_DEPTH = 561
  const DEFAULT_UPPER_CABINET_DEPTH = 300

  const calculateUpperCabinetZOffset = (cabinets: GenericModelProps[]) => {
    const lowerCabinetDepth =
      cabinets.find((c) => c.type === 'lower' || c.type === 'tall')?.dimensions.depth ||
      DEFAULT_LOWER_CABINET_DEPTH
    const upperCabinetDepth =
      cabinets.find((c) => c.type === 'upper')?.dimensions.depth || DEFAULT_UPPER_CABINET_DEPTH
    return (upperCabinetDepth - lowerCabinetDepth) / 2
  }

  // Agregar ejemplos de armarios de rincón basados en la imagen

  // Añadir estos muebles a tu array principal de muebles disponibles
</script>

<T.Group>
  <!-- Нижние шкафы -->
  <T.Group position.x={-totalWidthOfLowerCabinets / 2}>
    {#each cabinets.filter((c) => c.type === 'lower' || c.type === 'tall') as model, index}
      {@const positionIndex = cabinets
        .filter((c) => c.type === 'lower' || c.type === 'tall')
        .findIndex((c) => c === model)}
      {@const xOffset = calculatePositionsX(cabinets, 'lower')[positionIndex]}

      <GenericModel {model} position={{ x: xOffset, y: 0, z: 0 }} />
    {/each}

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
    {#each cabinets.filter((c) => c.type === 'upper') as model, index}
      {@const positionIndex = cabinets
        .filter((c) => c.type === 'upper')
        .findIndex((c) => c === model)}
      {@const xOffset = calculatePositionsX(cabinets, 'upper')[positionIndex]}
      {@const yOffset = calculateUpperCabinetPosition(cabinets)}
      {@const zOffset = calculateUpperCabinetZOffset(cabinets)}

      <GenericModel {model} position={{ x: xOffset, y: yOffset, z: zOffset }} />
    {/each}
  </T.Group>
</T.Group>
