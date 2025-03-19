<script lang="ts">
  // import { cabinets } from '$/components/3d/modules/module-1'
  import GenericModel from '$/components/3d/models/generic-model.svelte'
  import type { GenericModelProps } from '$/components/3d/models/types'

  const woodTextureColors = {
    saddleBrown: {
      default: 'rgba(139, 69, 19, 1)', // SaddleBrown
      light: 'rgba(205, 133, 63, 1)', // Light variant
      dark: 'rgba(101, 50, 10, 1)' // Dark variant
    },
    sienna: {
      default: 'rgba(160, 82, 45, 1)', // Sienna
      light: 'rgba(210, 105, 30, 1)', // Light variant
      dark: 'rgba(110, 50, 20, 1)' // Dark variant
    },
    chocolate: {
      default: 'rgba(210, 105, 30, 1)', // Chocolate
      light: 'rgba(255, 140, 0, 1)', // Light variant
      dark: 'rgba(139, 69, 19, 1)' // Dark variant
    },
    burlywood: {
      default: 'rgba(222, 184, 135, 1)', // Burlywood
      light: 'rgba(255, 228, 196, 1)', // Light variant
      dark: 'rgba(139, 115, 85, 1)' // Dark variant
    },
    wheat: {
      default: 'rgba(245, 222, 179, 1)', // Wheat
      light: 'rgba(255, 239, 204, 1)', // Light variant
      dark: 'rgba(200, 180, 150, 1)' // Dark variant
    }
  } as const

  export const cabinets: GenericModelProps[] = [
    {
      dimensions: { width: 600, height: 720, depth: 561, plinthHeight: 150 },
      material: {
        carcassColor: woodTextureColors.saddleBrown.default,
        facadeColor: woodTextureColors.saddleBrown.dark, // SaddleBrown
        finish: 'wood-texture'
      },
      specialMechanisms: { softCloseHinges: true },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 2, sizes: [240, 240, 240], withSoftClose: true }
    },
    {
      dimensions: { width: 800, height: 720, depth: 561, plinthHeight: 150 },
      material: {
        carcassColor: woodTextureColors.sienna.default,
        facadeColor: woodTextureColors.sienna.dark,
        finish: 'wood-texture'
      }, // Sienna
      specialMechanisms: { softCloseHinges: true },
      drawers: { count: 3, sizes: [240, 240, 240], withSoftClose: true },
      shelves: { count: 3, adjustable: true, material: 'wood' }
    },
    {
      dimensions: { width: 600, height: 720, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [240, 240, 240], withSoftClose: true },
      material: {
        carcassColor: woodTextureColors.chocolate.default,
        facadeColor: woodTextureColors.chocolate.dark,
        finish: 'wood-texture'
      } // Chocolate
    },
    {
      dimensions: { width: 900, height: 720, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [240, 320, 240], withSoftClose: false },
      material: {
        carcassColor: woodTextureColors.burlywood.default,
        facadeColor: woodTextureColors.burlywood.dark, // Burlywood
        finish: 'wood-texture'
      }
    },
    {
      dimensions: { width: 600, height: 720, depth: 561, plinthHeight: 150 },
      material: {
        carcassColor: woodTextureColors.wheat.default,
        facadeColor: woodTextureColors.wheat.dark, // Wheat
        finish: 'wood-texture'
      }
    }
  ]

  const gapX = 50

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
    position={{
      // x: positions[index] - (index === positions.length - 1 ? gap * index : 0),
      x: positionsX[index],
      y: 360 + gapY,
      z: 0
    }}
    model={cabinet}
  />
{/each}
