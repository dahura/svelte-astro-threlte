import type { BaseCabinet } from "./models"


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

export interface Scene<T extends BaseCabinet = BaseCabinet> {
    cameraPosition: Position,
    light: {
        type: 'direct', // we can add more different light after,
        position: Position,
    },
    modelSettings: {
        scaleOnHover?: boolean,
        useScale?: number,
        scaleUntil?: (state: SceneState<T>) => boolean | null,
        rotateModelByDefault?: boolean,
        rotateUntil?: (state: SceneState<T>) => boolean | null
    }
}