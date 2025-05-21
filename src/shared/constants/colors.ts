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
    },
    whiteMarble: {
      default: 'rgba(255, 255, 255, 1)', // Light White Marble
      default_hex: '#FFFFFF',
      light: 'rgba(255, 255, 255, 0.9)', // Light variant (made lighter)
      light_hex: '#FFFFFFE6', // Light hex (made lighter)
      dark: 'rgba(220, 220, 220, 1)', // Dark variant (made lighter)
      dark_hex: '#DCDCDC' // Dark hex (made lighter)
    },
    metalWhite: {
      default: 'rgba(230, 230, 230, 1)', // Metal White
      default_hex: '#E6E6E6',
      light: 'rgba(245, 245, 245, 1)', // Light variant
      light_hex: '#F5F5F5',
      dark: 'rgba(200, 200, 200, 1)', // Dark variant
      dark_hex: '#C8C8C8' // Dark hex
    },
    woodenLight: {
      default: 'rgba(222, 184, 135, 1)', // Light Wood
      default_hex: '#DEB887',
      light: 'rgba(245, 222, 179, 1)', // Lighter variant
      light_hex: '#F5DEB3',
      dark: 'rgba(184, 134, 11, 1)', // Darker variant
      dark_hex: '#B8860B' // Dark hex
    },
    woodenDark: {
      default: 'rgba(139, 69, 19, 1)', // Dark Wood
      default_hex: '#8B4513',
      light: 'rgba(160, 82, 45, 1)', // Lighter variant
      light_hex: '#A0522D',
      dark: 'rgba(101, 50, 10, 1)', // Darker variant
      dark_hex: '#65320A' // Dark hex
    },
    woodenCountertopWhite: {
      default: 'rgba(245, 245, 240, 1)', // Countertop White Wood
      default_hex: '#F5F5F0',
      light: 'rgba(255, 255, 250, 1)', // Lighter variant
      light_hex: '#FFFFFA',
      dark: 'rgba(220, 220, 210, 1)', // Darker variant
      dark_hex: '#DCDCD2' // Dark hex
    },
    counterTopStoneWhite: {
      default: 'rgba(240, 240, 235, 1)', // Countertop Stone White
      default_hex: '#F0F0EB',
      light: 'rgba(255, 255, 245, 1)', // Lighter variant
      light_hex: '#FFFFF5',
      dark: 'rgba(210, 210, 200, 1)', // Darker variant
      dark_hex: '#D2D2C8' // Dark hex
    },
    wallWhite: {
      default: 'rgba(250, 250, 250, 1)', // Wall White
      default_hex: '#FAFAFA',
      light: 'rgba(255, 255, 255, 1)', // Lighter variant
      light_hex: '#FFFFFF',
      dark: 'rgba(220, 220, 220, 1)', // Darker variant
      dark_hex: '#DCDCDC' // Dark hex
    },
    wall: {
      default: 'rgba(230, 230, 220, 1)', // Wall
      default_hex: '#E6E6DC',
      light: 'rgba(245, 245, 235, 1)', // Lighter variant
      light_hex: '#F5F5EB',
      dark: 'rgba(200, 200, 190, 1)', // Darker variant
      dark_hex: '#C8C8BE' // Dark hex
    }
  } as const

export type Color = keyof typeof COLORS