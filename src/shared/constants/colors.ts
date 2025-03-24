export var COLORS = {
    saddleBrown: {
      default: 'rgba(139, 69, 19, 1)', // SaddleBrown
      default_hex: '#8B4513',
      light: 'rgba(205, 133, 63, 1)', // Light variant
      light_hex: '#CD853F',
      dark: 'rgba(101, 50, 10, 1)', // Dark variant
      dark_hex: '#65320A' // Dark hex
    },
    sienna: {
      default: 'rgba(160, 82, 45, 1)', // Sienna
      default_hex: '#A0522D',
      light: 'rgba(210, 105, 30, 1)', // Light variant
      light_hex: '#D2691E',
      dark: 'rgba(110, 50, 20, 1)', // Dark variant
      dark_hex: '#6E3214' // Dark hex
    },
    chocolate: {
      default: 'rgba(210, 105, 30, 1)', // Chocolate
      default_hex: '#D2691E',
      light: 'rgba(255, 140, 0, 1)', // Light variant
      light_hex: '#FF8C00',
      dark: 'rgba(139, 69, 19, 1)', // Dark variant
      dark_hex: '#8B4513' // Dark hex
    },
    burlywood: {
      default: 'rgba(222, 184, 135, 1)', // Burlywood
      default_hex: '#DEB887',
      light: 'rgba(255, 228, 196, 1)', // Light variant
      light_hex: '#FFE4C4',
      dark: 'rgba(139, 115, 85, 1)', // Dark variant
      dark_hex: '#8B7355' // Dark hex
    },
    wheat: {
      default: 'rgba(245, 222, 179, 1)', // Wheat
      default_hex: '#F5DEB3',
      light: 'rgba(255, 239, 204, 1)', // Light variant
      light_hex: '#FFEBCD',
      dark: 'rgba(200, 180, 150, 1)', // Dark variant
      dark_hex: '#C8B496' // Dark hex
    },
    transparent: {
      default: 'rgba(0, 0, 0, 0)', // Transparent
      default_hex: '#00000000',
      light: 'rgba(0, 0, 0, 0)', // Light variant (transparent)
      light_hex: '#00000000',
      dark: 'rgba(0, 0, 0, 0)', // Dark variant (transparent)
      dark_hex: '#00000000' // Dark hex (transparent)
    }
  } as const



 export type Color = keyof typeof COLORS