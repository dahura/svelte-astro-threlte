import { createStoreFactory } from "./create-store-factory.svelte";

interface IScene {
    sceneId: string | null;
    settings: {
      autoRotate: boolean;
      enableDamping: boolean;
      rotateSpeed: number;
      zoomToCursor: boolean;
      zoomSpeed: number;
      minPolarAngle: number;
      maxPolarAngle: number;
    };
  }
  
  // ✅ Фабрика для создания store'ов сцен
  export var createSceneStore = createStoreFactory<IScene>({
    sceneId: null,
    settings: {
      autoRotate: false,
      enableDamping: true,
      rotateSpeed: 1,
      zoomToCursor: false,
      zoomSpeed: 1,
      minPolarAngle: 0,
      maxPolarAngle: Math.PI,
    },
  });