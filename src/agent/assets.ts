import type { GenericModel } from "$/components/3d/models/types";

export const assets1: GenericModel[] = [
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
      drawers: { count: 2, sizes: [360, 360, 0], withSoftClose: false } // Adjusted sizes for the drawers to not exceed cabinet height
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
  ]