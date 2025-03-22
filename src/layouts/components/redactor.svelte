<script lang="ts">
  // import { cabinets } from '$/components/3d/modules/module-1'
  import GenericModel from '$/components/3d/models/generic-model.svelte'
  import type { GenericModelProps } from '$/components/3d/models/types'
  import { modelColorsStore } from '$/stores/redactor/colors-store'
  import { COLORS } from '$/shared/constants/colors'

  const colors = modelColorsStore.$get

  const gapX = 50
  export const cabinets: GenericModelProps[] = [
    // нижние шкафы
    {
      position: { x: 0, y: 920 / 2, z: 0 },
      dimensions: { width: 600, height: 920, depth: 561, plinthHeight: 150 },
      material: {
        carcassColor: COLORS.saddleBrown.default,
        facadeColor: COLORS.saddleBrown.dark, // SaddleBrown
        finish: 'wood-texture'
      },
      specialMechanisms: { softCloseHinges: true },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false } // Adjusted sizes for the drawers to not exceed cabinet height
    },
    {
      position: { x: 600 + 2 * gapX, y: 920 / 2, z: 0 },
      dimensions: { width: 800, height: 920, depth: 561, plinthHeight: 150 },
      material: {
        carcassColor: COLORS.saddleBrown.default,
        facadeColor: COLORS.saddleBrown.dark, // SaddleBrown
        finish: 'wood-texture'
      }, // Sienna
      specialMechanisms: { softCloseHinges: true },
      // drawers: { count: 2, sizes: [240, 240, 240], withSoftClose: true },
      shelves: { count: 2, adjustable: true, material: 'wood' },
      doors: { count: 1, type: 'hinged' }
    },
    {
      position: { x: 600 + 800, y: 920 / 2, z: 0 },
      dimensions: { width: 600, height: 920, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },

      material: {
        carcassColor: COLORS.saddleBrown.default,
        facadeColor: COLORS.saddleBrown.dark,
        finish: 'wood-texture'
      } // Chocolate
    },
    {
      position: { x: 600 + 800 + 600 + 3 * gapX, y: 920 / 2, z: 0 },
      dimensions: { width: 900, height: 920, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false },
      material: {
        carcassColor: COLORS.saddleBrown.default,
        facadeColor: COLORS.saddleBrown.dark, // Burlywood
        finish: 'wood-texture'
      }
    },
    {
      position: { x: 600 + 800 + 600 + 900 - 2 * gapX, y: 920 / 2, z: 0 },
      dimensions: { width: 400, height: 920, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false },
      // drawers: { count: 2, sizes: [340], withSoftClose: false },
      material: {
        carcassColor: COLORS.wheat.default,
        facadeColor: COLORS.wheat.dark, // Wheat
        finish: 'wood-texture'
      }
    },
    {
      position: { x: 600 + 800 + 600 + 900 + 400, y: 2400 / 2, z: 0 },
      dimensions: { width: 600, height: 2400, depth: 561, plinthHeight: 150 },
      shelves: { count: 5, adjustable: true, material: 'wood' },
      drawers: { count: 5, sizes: [360, 360, 0, 600, 300], withSoftClose: false },

      // drawers: { count: 2, sizes: [340], withSoftClose: false },
      material: {
        carcassColor: COLORS.wheat.default,
        facadeColor: COLORS.wheat.dark, // Wheat
        finish: 'wood-texture'
      }
    },
    // верхние шкафы
    {
      position: { x: 200, y: 2400 - 920 / 2 + 150, z: 0 },
      dimensions: { width: 800, height: 920, depth: 561 },
      material: {
        carcassColor: 'red',
        facadeColor: 'red', // SaddleBrown
        finish: 'wood-texture'
      },
      doors: { count: 1, type: 'hinged' },
      shelves: { count: 2, adjustable: true, material: 'wood' }
      // Adjusted sizes for the drawers to not exceed cabinet height
    },
    {
      position: { x: 800 + 200, y: 2400 - 920 / 2 + 150, z: 0 },
      dimensions: { width: 800, height: 920, depth: 561 },
      material: {
        carcassColor: 'red',
        facadeColor: 'red', // SaddleBrown
        finish: 'wood-texture'
      },
      doors: { count: 1, type: 'hinged' },
      shelves: { count: 2, adjustable: true, material: 'wood' }
    },
    {
      position: { x: 800 + 800 + 200, y: 2400 - 920 / 2 + 150, z: 0 },
      dimensions: { width: 800, height: 920, depth: 561 },
      material: {
        carcassColor: 'red',
        facadeColor: 'red', // SaddleBrown
        finish: 'wood-texture'
      },
      doors: { count: 1, type: 'hinged' },
      shelves: { count: 2, adjustable: true, material: 'wood' }
    },
    {
      position: { x: 800 + 800 + 800 + 200, y: 2400 - 920 / 2 + 150, z: 0 },
      dimensions: { width: 800, height: 920, depth: 561 },
      material: {
        carcassColor: 'red',
        facadeColor: 'red', // SaddleBrown
        finish: 'wood-texture'
      },
      doors: { count: 1, type: 'hinged' },
      shelves: { count: 2, adjustable: true, material: 'wood' }
    }
  ]

  const gapY = 10

  const isEven = (index: number) => index % 2 === 0

  const positionsX = cabinets
    .reduce((acc, cabinet) => [...acc, acc[acc.length - 1] + cabinet.dimensions.width], [0])
    .slice(0, -1)
    .map((x, index) =>
      !isEven(index) ? (index === 1 ? x + gapX + gapX * index : x + gapX * index) : x
    )

  // const positions = cabinets
  //   .reduce((acc, cabinet) => [...acc, acc[acc.length - 1] + cabinet.dimensions.width], [0])
  //   .slice(0, -1)

  console.log(positionsX)
</script>

{#each cabinets as cabinet, index}
  <GenericModel
    model={{
      ...cabinet,
      // position: {
      //   x: positionsX[index],
      //   y: cabinet.position.y + cabinet.dimensions.height / 2,
      //   z: 0
      // },
      // position: {
      //   x: positionsX[index],
      //   y: cabinet.position.y + cabinet.dimensions.height / 2,
      //   z: 0
      // },

      material: {
        ...cabinet.material,
        carcassColor: COLORS[$colors.currentColor].default,
        facadeColor: COLORS[$colors.currentColor].dark
      }
    }}
  />
{/each}
