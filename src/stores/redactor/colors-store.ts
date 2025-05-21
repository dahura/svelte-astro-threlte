import { COLORS, type Color } from "$/shared/constants/colors";
import { createStoreFactory } from "../create-store-factory.svelte";

interface IColors {
  currentColor: Color;
  availableColors: Color[]
}

const colorsStore = createStoreFactory<IColors>({
  currentColor: 'saddleBrown',
  availableColors: Object.keys(COLORS) as Color[],
})


export var modelColorsStore = colorsStore('model-colors')

export var setColor = (color: Color) => {
  modelColorsStore.update((state) => ({
    ...state,
    currentColor: color
  }))
}

export var getColor = () => {
  return modelColorsStore.get().currentColor
}







