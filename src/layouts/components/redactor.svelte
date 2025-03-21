<script lang="ts">
  // import { cabinets } from '$/components/3d/modules/module-1'
  import GenericModel from '$/components/3d/models/generic-model.svelte'
  import type { GenericModelProps } from '$/components/3d/models/types'
  import { modelColorsStore } from '$/stores/redactor/colors-store'
  import { COLORS } from '$/shared/constants/colors'

  const colors = modelColorsStore.$get

  export const cabinets: GenericModelProps[] = [
    {
      dimensions: { width: 600, height: 920, depth: 561, plinthHeight: 150 },
      material: {
        carcassColor: COLORS.saddleBrown.default,
        facadeColor: COLORS.saddleBrown.dark, // SaddleBrown
        finish: 'wood-texture'
      },
      specialMechanisms: { softCloseHinges: true },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [490, 490, 340], withSoftClose: false }
    },
    {
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
      dimensions: { width: 600, height: 920, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },

      material: {
        carcassColor: COLORS.saddleBrown.default,
        facadeColor: COLORS.saddleBrown.dark,
        finish: 'wood-texture'
      } // Chocolate
    },
    {
      dimensions: { width: 900, height: 920, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [490, 490, 340], withSoftClose: false },
      material: {
        carcassColor: COLORS.saddleBrown.default,
        facadeColor: COLORS.saddleBrown.dark, // Burlywood
        finish: 'wood-texture'
      }
    },
    {
      dimensions: { width: 400, height: 920, depth: 561, plinthHeight: 150 },
      shelves: { count: 3, adjustable: true, material: 'wood' },
      drawers: { count: 3, sizes: [490, 490, 340], withSoftClose: false },
      // drawers: { count: 2, sizes: [340], withSoftClose: false },
      material: {
        carcassColor: COLORS.wheat.default,
        facadeColor: COLORS.wheat.dark, // Wheat
        finish: 'wood-texture'
      }
    },
    {
      dimensions: { width: 600, height: 2400, depth: 561, plinthHeight: 150 },
      shelves: { count: 5, adjustable: true, material: 'wood' },
      drawers: { count: 5, sizes: [490, 490, 560, 520, 340], withSoftClose: false },

      // drawers: { count: 2, sizes: [340], withSoftClose: false },
      material: {
        carcassColor: COLORS.wheat.default,
        facadeColor: COLORS.wheat.dark, // Wheat
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
      x: positionsX[index],
      y: cabinet.dimensions.height / 2,
      z: 0
    }}
    model={{
      ...cabinet,
      material: {
        ...cabinet.material,
        carcassColor: COLORS[$colors.currentColor].default,
        facadeColor: COLORS[$colors.currentColor].dark
      }
    }}
  />
{/each}
