import type { BaseCabinet } from "../cabinets/types";

// Интерфейс для дверцы
export interface Door extends Omit<BaseCabinet, 'depth'> {
  hingeSide?: 'left' | 'right'
}

// Интерфейс для полки
export interface Shelf extends Omit<BaseCabinet, 'height'> {
  thickness?: number
}

// Интерфейс для выдвижного ящика
export interface Drawer extends Omit<BaseCabinet, 'height'> {
  handleColor?: string
}