import { writable, get } from "svelte/store";

export function createStoreFactory<T>(defaultValue: T) {
  return (storeName: string) => {
    const store = writable<T>(defaultValue);

    return {
      name: storeName,
      subscribe: store.subscribe,
      set: store.set,
      update: store.update,
      reset: () => store.set(defaultValue),
      get: () => get(store), // Метод для чтения текущего значения
    };
  };
}
