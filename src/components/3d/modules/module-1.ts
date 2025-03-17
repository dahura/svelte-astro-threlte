import type { SceneState } from "node_modules/@types/three/src/renderers/common/RendererUtils";
import type { UpperCabinet, LowerCabinet, CornerCabinet, Scene, BaseCabinet, Model } from "../types";


const MODULE_1_CORNER_CABINET: CornerCabinet = {
  width: 45,
  height: 45,
  depth: 45,
  cornerDepth: 45,
  corner: false,
  doors: false,
  shelves: 1,
  type: "corner",
  name: "ШВПУ 300"
};

const MODULE_1_LOWER_CABINET: LowerCabinet = {
  width: 600,
  height: 850,
  depth: 600,
  doors: true,
  shelves: 1,
  legs: true,
  type: "lower",
  name: "ШВС 600"
};

 const MODULE_1_UPPER_CABINET: UpperCabinet = {
  width: 80,
  height: 32,
  depth: 32,
  doors: true,
  shelves: 1,
  type: "upper",
  name: "ШВ 300"
};


export var MODULE_1_CABINETS = {
    corner: MODULE_1_CORNER_CABINET,
    lower: MODULE_1_LOWER_CABINET,
    upper: MODULE_1_UPPER_CABINET,
   
}


export var cabinets: BaseCabinet[] = [
    { name: "ШВ 300", width: 720, height: 300, depth: 320, type: "upper", position: [0, 150, 0], doors: false, shelves: 2, },
    { name: "ШВ 400", width: 720, height: 400, depth: 320, type: "upper" },
    { name: "ШВ 500", width: 720, height: 500, depth: 320, type: "upper" },
    { name: "ШВ 600", width: 720, height: 600, depth: 320, type: "upper" },
    { name: "ШВ 800", width: 720, height: 800, depth: 320, type: "upper" },
    // { name: "ШВПУ 300", width: 720, height: 300, depth: 300, cornerDepth: 320, type: "corner" },
    // { name: "ШВУ 590", width: 720, height: 592, depth: 592, cornerDepth: 320, type: "corner" },
    { name: "ШВУС 590", width: 720, height: 592, depth: 592, cornerDepth: 320, type: "corner" },
    // { name: "ШВС 300", width: 720, height: 300, depth: 320, type: "lower" },
    // { name: "ШВС 400", width: 720, height: 400, depth: 320, type: "lower" },
    // { name: "ШВС 500", width: 720, height: 500, depth: 320, type: "lower" },
    // { name: "ШВС 600", width: 720, height: 600, depth: 320, type: "lower" },
    // { name: "ШВС 800", width: 720, height: 800, depth: 320, type: "lower" },
    { name: "ШВТ 224", width: 720, height: 224, depth: 320, type: "upper" },
    { name: "ШВТ 400", width: 1290, height: 400, depth: 320, type: "upper" },
    { name: "ШВТС 400", width: 1290, height: 400, depth: 320, type: "upper" },
    { name: "ШВГ 500", width: 358, height: 500, depth: 320, type: "upper" },
    { name: "ШВГ 600", width: 358, height: 600, depth: 320, type: "upper" },
    { name: "ШВГ 800", width: 358, height: 800, depth: 320, type: "upper" },
    { name: "ШВГС 500", width: 358, height: 500, depth: 320, type: "upper" },
    { name: "ШВГС 800", width: 358, height: 800, depth: 320, type: "upper" },
    // { name: "ШВБ 150", width: 720, height: 150, depth: 300, type: "lower" }
  ];



const MODULE_1_SCENE_CONFIG: Scene<UpperCabinet> = {
    cameraPosition: { x: 0, y: 0, z: 0 },
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

var createScene = function<T extends Model>(model: T, settings?: Partial<Scene<T>>): Scene<T> {
    const cameraDistance = Math.max(model.width, model.height, model.depth) * 2;
    
    const defaultSettings: Scene<T> = {
        cameraPosition: { x: 0, y: model.height / 2, z: cameraDistance }, // Камера на уровне модели
        light: {
            type: 'direct',
            position: { x: cameraDistance / 2, y: model.height * 1.5, z: cameraDistance / 2 } // Свет выше модели
        },
        modelSettings: {
            scaleOnHover: true,
            useScale: 1.0,
            rotateModelByDefault: true,
            rotateUntil: (state) => state.elapsedTime < 10, // Rotate for 10 seconds
            scaleUntil: (state) => state.elapsedTime < 5, // Scale for 5 seconds
        

        }
    };

    return { ...defaultSettings, ...settings };
};



export { MODULE_1_SCENE_CONFIG, createScene };

