import type { GenericModel } from "$/components/3d/models/types";

// Define the structure for textures and colors
interface TextureConfig {
  name: string;
  path: string;
  label?: string;
  color?: string;
}

interface ColorConfig {
  name: string;
  value: string;
  hex: string;
}

interface KitchenConfiguration {
  cabinets: GenericModel[];
  textures: TextureConfig[];
  colors: ColorConfig[];
}

export const defaultTextures: TextureConfig[] = [
  {
    name: 'metalWhite',
    path: 'textures/4k/metal-white.jpg',
    label: 'Metal White',
    color: 'rgba(230, 230, 230, 1)'
  },
  {
    name: 'metalWhite2',
    path: 'textures/4k/metal-white-2.jpg',
    label: 'Metal White 2',
    color: 'rgba(230, 230, 230, 1)'
  },
  {
    name: 'woodenLight',
    path: 'textures/4k/wooden-light.jpg',
    label: 'Wooden Light',
    color: 'rgba(222, 184, 135, 1)'
  },
  {
    name: 'woodenDark',
    path: 'textures/4k/wooden-dark.jpg',
    label: 'Wooden Dark',
    color: 'rgba(139, 69, 19, 1)'
  },
  {
    name: 'woodenCountertopWhite',
    path: 'textures/4k/wooden-countertop-white.jpg',
    label: 'Wooden Countertop White',
    color: 'rgba(245, 245, 240, 1)'
  },
  {
    name: 'counterTopStoneWhite',
    path: 'textures/4k/counter-top-stone-white.jpg',
    label: 'Countertop Stone White',
    color: 'rgba(240, 240, 235, 1)'
  },
  {
    name: 'wallWhite',
    path: 'textures/4k/wall-white.png',
    label: 'Wall White',
    color: 'rgba(250, 250, 250, 1)'
  },
  {
    name: 'wall',
    path: 'textures/4k/wall.jpg',
    label: 'Wall',
    color: 'rgba(230, 230, 220, 1)'
  }
];

export const defaultColors: ColorConfig[] = [
  {
    name: 'saddleBrown',
    value: 'rgba(139, 69, 1)',
    hex: '#8B4513'
  },
  {
    name: 'sienna',
    value: 'rgba(160, 82, 45, 1)',
    hex: '#A0522D'
  },
  {
    name: 'chocolate',
    value: 'rgba(210, 105, 30, 1)',
    hex: '#D2691E'
  },
  {
    name: 'burlywood',
    value: 'rgba(222, 184, 135, 1)',
    hex: '#DEB887'
  },
  {
    name: 'wheat',
    value: 'rgba(245, 222, 179, 1)',
    hex: '#F5DEB3'
  },
  {
    name: 'whiteMarble',
    value: 'rgba(255, 255, 255, 1)',
    hex: '#FFFFFF'
  },
  {
    name: 'metalWhite',
    value: 'rgba(230, 230, 230, 1)',
    hex: '#E6E6'
  },
  {
    name: 'woodenLight',
    value: 'rgba(222, 184, 135, 1)',
    hex: '#DEB887'
  },
  {
    name: 'woodenDark',
    value: 'rgba(139, 69, 19, 1)',
    hex: '#8B4513'
  }
];

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
  ];

// Complete kitchen configuration with cabinets, textures, and colors
export const kitchenConfig: KitchenConfiguration = {
  cabinets: assets1,
  textures: defaultTextures,
  colors: defaultColors
}