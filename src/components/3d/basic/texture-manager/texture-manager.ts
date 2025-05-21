import { writable, derived, get } from 'svelte/store';
import { modelTextureStore, type TextureName } from '$/stores/redactor/texture-store';
import * as THREE from 'three';
import { useTexture as threeUseTexture } from '@threlte/extras';

// Тип для информации о текстуре
export interface TextureInfo {
  name: TextureName;
  path: string;
  label?: string;
  texture?: THREE.Texture;
}

// Тип для опций трансформации текстуры
export interface TextureTransformOptions {
  wrapS?: THREE.Wrapping;
  wrapT?: THREE.Wrapping;
  repeat?: [number, number];
  offset?: [number, number];
  rotation?: number;
  center?: [number, number];
}

// Создаем хранилище для загруженных текстур
const texturesStore = writable<Record<TextureName, THREE.Texture>>({} as Record<TextureName, THREE.Texture>);

// Кэш для уже загруженных текстур
const textureCache = new Map<string, THREE.Texture>();

// Функция для загрузки текстуры
const loadTexture = async (path: string, options?: {
  transform?: (texture: THREE.Texture) => THREE.Texture
}): Promise<THREE.Texture> => {
  // Проверяем, есть ли текстура в кэше
  if (textureCache.has(path)) {
    return textureCache.get(path)!;
  }

  // Загружаем текстуру через useTexture
  const texture = await threeUseTexture(path, options);
  
  // Добавляем в кэш
  textureCache.set(path, texture);
  
  return texture;
};

// Функция для трансформации текстуры
const transformTexture = (texture: THREE.Texture, options?: TextureTransformOptions): THREE.Texture => {
  if (!options) return texture;

  if (options.wrapS) texture.wrapS = options.wrapS;
  if (options.wrapT) texture.wrapT = options.wrapT;
  
  if (options.repeat) {
    texture.repeat.set(options.repeat[0], options.repeat[1]);
  }
  
  if (options.offset) {
    texture.offset.set(options.offset[0], options.offset[1]);
  }
  
  if (options.rotation !== undefined) {
    texture.rotation = options.rotation;
  }
  
  if (options.center) {
    texture.center.set(options.center[0], options.center[1]);
  }

  return texture;
};

// Создаем производный стор для текущей текстуры
const currentTextureStore = derived(
  modelTextureStore,
  $modelTextureStore => $modelTextureStore.currentTexture
);

// Экспортируем текстурный менеджер как объект с методами и свойствами
export const textureManager = {
  // Получение текущей текстуры
  getCurrentTexture: (): THREE.Texture | null => {
    const currentTexture = get(currentTextureStore);
    const texturesMap = get(texturesStore);
    return texturesMap[currentTexture.name] || null;
  },

  // Получение текущей информации о текстуре
  getCurrentTextureInfo: (): TextureInfo => {
    return get(currentTextureStore);
  },

  // Установка текущей текстуры
  setTexture: (textureName: TextureName) => {
    const currentTexture = get(modelTextureStore);
    if (currentTexture.currentTexture.name !== textureName) {
      modelTextureStore.update(state => ({
        ...state,
        currentTexture: {
          name: textureName,
          path: `textures/4k/${textureName}.jpg`,
          label: textureName
        }
      }));
    }
  },

  // Загрузка текстуры
  loadTexture: async (textureName: TextureName, options?: TextureTransformOptions): Promise<THREE.Texture> => {
    const currentTexture = get(modelTextureStore);
    const availableTextures = currentTexture.availableTextures;
    
    if (!availableTextures.includes(textureName)) {
      throw new Error(`Texture ${textureName} is not available`);
    }

    // Получаем путь к текстуре
    const path = `textures/4k/${textureName}.jpg`;
    
    // Загружаем текстуру
    const texture = await loadTexture(path, {
      transform: texture => transformTexture(texture, options)
    });
    
    // Обновляем store с текстурами
    texturesStore.update(textures => {
      return {
        ...textures,
        [textureName]: texture
      };
    });
    
    return texture;
  },

  // Предзагрузка всех доступных текстур
  preloadAllTextures: async (options?: TextureTransformOptions): Promise<void> => {
    const currentTexture = get(modelTextureStore);
    const availableTextures = currentTexture.availableTextures;
    
    // Загружаем все текстуры параллельно
    const texturePromises = availableTextures.map(textureName => {
      return textureManager.loadTexture(textureName, options);
    });
    
    await Promise.all(texturePromises);
  },

  // Доступ к store текстур
  textures: {
    subscribe: texturesStore.subscribe,
    get: () => get(texturesStore)
  },
  
  // Доступ к store с информацией о текущей текстуре
  currentTextureInfo: {
    subscribe: currentTextureStore.subscribe,
    get: () => get(currentTextureStore)
  }
};

// Вспомогательная функция для удобного использования в компонентах
export const useTexture = async (textureName: TextureName, options?: TextureTransformOptions): Promise<THREE.Texture> => {
  return textureManager.loadTexture(textureName, options);
};

// Вспомогательная функция для загрузки произвольной текстуры (не из списка доступных)
export const loadCustomTexture = async (path: string, options?: TextureTransformOptions): Promise<THREE.Texture> => {
  const texture = await loadTexture(path, {
    transform: texture => transformTexture(texture, options)
  });
  
  return texture;
}; 