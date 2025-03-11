export interface BaseCabinet {
  width: number
  height: number
  depth: number
  color?: string
  position?: [number, number, number]
  rotate?: boolean
  rotation?: number
  scale?: number,
  shelves?: number // Количество полок
  hasDoors?: boolean // Нужны ли дверцы
  doorColor?: string
  handleColor?: string
}


  export interface FloorCabinet extends BaseCabinet {
    legsHeight?: number
    adjustableLegs?: boolean
  }
  
  export interface WallCabinet extends BaseCabinet {
    mountingHeight?: number
    hasLighting?: boolean
    glassDoors?: boolean
  }

  export interface FullCabinet extends BaseCabinet {
    shelves?: number // Количество полок
    hasDoors?: boolean // Нужны ли дверцы
  }
  
  // Дополнительные интерфейсы для других типов шкафов