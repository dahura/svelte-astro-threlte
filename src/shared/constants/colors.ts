export var COLORS = {
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



 export type Color = keyof typeof COLORS