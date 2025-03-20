import { derived,  writable } from "svelte/store"


export const createCountStore = (defaultValue: number) => {
   let count = writable(defaultValue)
   const increment = () => count.update((state) => state + 1)
   const  double = derived(count, (count) => count * 2)
   return { count, increment, double }
}






