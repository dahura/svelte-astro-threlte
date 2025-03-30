
import { derived } from "svelte/store";
import { createStoreFactory } from "./create-store-factory.svelte";

interface IPivotPoint {
    height: number;
    origin: 'bottom' | 'center' | 'top';
}

// ✅ Фабрика для создания store'ов pivot point
var createPivotPointStore = createStoreFactory<IPivotPoint>({
    height: 0,
    origin: 'bottom',
});

export var pivotPointStore = createPivotPointStore('pivotPointStore');



 
