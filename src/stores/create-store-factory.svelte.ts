import { onDestroy } from "svelte";
import { writable, get, derived } from "svelte/store";



export const createCountStore = (defaultValue: number) => {
  let count = writable(defaultValue)
  const increment = () => count.update((state) => state + 1)
  const  double = derived(count, (count) => count * 2)
  return { count, increment, double }
}



export function createStoreFactory<T>(defaultValue: T) {
  return (storeName: string) => {
    const store = writable<T>(defaultValue); 
    const _$store = derived(store, (state) => state)

    return {
      name: storeName,
      subscribe: store.subscribe,
      set: store.set,
      update: store.update,
      reset: () => store.set(defaultValue),
      $get: _$store,
      get: () => get(store) // Метод для чтения текущего значения
    };
  };
}
