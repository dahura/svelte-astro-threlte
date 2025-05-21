import { createStoreFactory } from "../create-store-factory.svelte";
import { COLORS, type Color } from "$/shared/constants/colors";
import { getColor } from "./colors-store";
import * as THREE from 'three'
import { TEXTURES } from "$/shared/constants/textures";

export type TextureName = 'metalWhite' | 'metalWhite2' | 'woodenLight' | 'woodenDark' | 'woodenCountertopWhite' | 'counterTopStoneWhite' | 'wallWhite' | 'wall'
interface Texture {
    name: TextureName
    path: string
    label?: string,
    color?: string
}
interface  TextureStoreProps {  
    currentTexture: Texture
    availableTextures: TextureName[]
}
 
var textureStore = createStoreFactory<TextureStoreProps>({
  currentTexture: {
    name: TEXTURES.metalWhite.name as TextureName,
    path: TEXTURES.metalWhite.path,
    label: TEXTURES.metalWhite.name,
    color: TEXTURES.metalWhite.color
  },
  availableTextures: ['metalWhite', 'metalWhite2', 'woodenLight', 'woodenDark', 'woodenCountertopWhite', 'counterTopStoneWhite', 'wallWhite', 'wall']
})

export var modelTextureStore = textureStore('model-texture')

 export var setTexture = (textureName: TextureName) => {
 
    
    modelTextureStore.update((state) => ({
        ...state,
        currentTexture: {
            name: textureName,
            path: TEXTURES[textureName].path,
            label: textureName,
            color: TEXTURES[textureName].color
        }
    }))
}
export var getTexture = () => {
    const texture =  modelTextureStore.$get
    return texture
}







