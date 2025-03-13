import type { SceneState } from "node_modules/@types/three/src/renderers/common/RendererUtils";
import type { UpperCabinet, LowerCabinet, CornerCabinet, Scene, BaseCabinet, Model } from "../types";


const MODULE_1_CORNER_CABINET: CornerCabinet = {
  width: 45,
  height: 45,
  depth: 45,
  corner: false,
  doors: false,
  shelves: 1,
  type: "corner"
};

const MODULE_1_LOWER_CABINET: LowerCabinet = {
  width: 600,
  height: 850,
  depth: 600,
  doors: true,
  shelves: 1,
  legs: true,
  type: "lower"
};

 const MODULE_1_UPPER_CABINET: UpperCabinet = {
  width: 80,
  height: 32,
  depth: 32,
  doors: true,
  shelves: 1,
  type: "upper"
};


export var MODULE_1_CABINETS = {
    corner: MODULE_1_CORNER_CABINET,
    lower: MODULE_1_LOWER_CABINET,
    upper: MODULE_1_UPPER_CABINET,
   
}

const MODULE_1_SCENT = "vanilla"; // Adding scent for module 1

const MODULE_1_SCENE_CONFIG: Scene<UpperCabinet> = {
    cameraPosition: { x: 0, y: 0, z: 5 },
    light: {
        type: 'direct',
        position: { x: 10, y: 10, z: 10 }
    },
    modelSettings: {
        scaleOnHover: true,
        useScale: 1.0,
        scaleUntil: (state) => state.elapsedTime < 5, // Scale for 5 seconds
        rotateModelByDefault: true,
        rotateUntil: (state) => state.elapsedTime < 10 // Rotate for 10 seconds
    }
};
var createScene = function<T extends Model>(settings?: Partial<Scene<T>>): Scene<T> {
    const defaultSettings: Scene<T> = {
        cameraPosition: { x: 1000, y: 1000, z: 1000 }, // Adjusted y position for better view
        light: {
            type: 'direct',
            position: { x: 1000, y: 1000, z: 1000 } // Adjusted light position for improved lighting
        },
        modelSettings: {
            scaleOnHover: true,
            useScale: 1.0,
            // Scale for 5 seconds
            rotateModelByDefault: true,
           // Rotate for 10 seconds
        }
    };

    return { ...defaultSettings, ...settings };
}


export { MODULE_1_SCENE_CONFIG, createScene };

