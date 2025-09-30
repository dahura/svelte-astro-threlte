import { createStoreFactory } from "../create-store-factory.svelte";
import type { GenericModel } from "$/components/3d/models/types";
import { assets1 } from "$/agent/assets";

interface ICabinets {
  cabinets: GenericModel[];
}

const cabinetsStore = createStoreFactory<ICabinets>({
  cabinets: assets1
});

export var modelCabinetsStore = cabinetsStore('model-cabinets');

export var setCabinets = (cabinets: GenericModel[]) => {
 modelCabinetsStore.update((state) => ({
    ...state,
    cabinets: cabinets
  }));
};

export var addCabinet = (cabinet: GenericModel) => {
  modelCabinetsStore.update((state) => ({
    ...state,
    cabinets: [...state.cabinets, cabinet]
  }));
};

export var getCabinets = () => {
  return modelCabinetsStore.get().cabinets; }
