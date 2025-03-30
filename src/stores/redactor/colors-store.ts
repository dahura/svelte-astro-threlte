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

export const modelColorsStore = colorsStore('model-colors')








