

// Определяем базовый интерфейс для модели кухонного модуля
export interface Model {
    width: number;
    height: number;
    depth: number;
    color?: string; // Added field
    position?: [number, number, number]; // Added field
    rotate?: boolean; // Added field
    rotation?: number; // Added field
    scale?: number; // Added field
    doors?: boolean;
    glassDoors?: boolean;
    drawers?: boolean;
    shelves?: number;
    corner?: boolean;
    type: 'upper' | 'lower' | 'corner'
    legs?: boolean;
    doorColor?: string;
    handleColor?: string;
}
  // Базовый тип для кухонного шкафа
  export type BaseCabinet = Omit<Model, 'type' | 'legs' | 'glassDoors'>;
  
  // Верхние шкафы
  export interface UpperCabinet extends BaseCabinet {
    type: 'upper';
  }
  
  // Нижние шкафы
  export interface LowerCabinet extends BaseCabinet {
    type: 'lower';
    legs?: boolean; // Legs are applicable only for lower cabinets
  }
  
//   // Шкаф с витриной
//   export interface GlassCabinet extends UpperCabinet {
//     glassDoors: boolean; // Glass doors are applicable only for upper cabinets
//   }
  
  // Угловой шкаф
  export interface CornerCabinet extends Omit<BaseCabinet, 'legs' | 'glassDoors'> {
    type: 'corner';
    legs?: never;
    glassDoors?: never;
  }

  
  


 interface Position {
    x: number,
    y: number,
    z: number, 
 }

 interface SceneState<T extends BaseCabinet> {
    currentScale: number,
    currentRotation: Position,
    elapsedTime: number,
    initialScale: number,
    cabinet: T // The specific cabinet instance
}

export interface Scene<T extends Model = Model> {
    cameraPosition: Position;
    light: {
        type: 'direct';
        position: Position;
    };
    modelSettings: {
        scaleOnHover?: boolean;
        useScale?: number;
        scaleUntil?: (state: SceneState<T>) => boolean | null;
        rotateModelByDefault?: boolean;
        rotateUntil?: (state: SceneState<T>) => boolean | null;
    };
}




