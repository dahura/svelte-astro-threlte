import { sound } from "$lib/sound/sound"
import { onMount } from "svelte"
import { writable } from "svelte/store"
import { animate, easeInOutCubic } from "../easing"

interface ToggleDrawerAnimationProps {
  from: number;
  to: number;
  onUpdate: (position: number) => void;
}

export function toggleDrawerAnimation() {
  const drawerPosition = writable(0)
  const ANIMATION_DURATION = 1140
  const SOUND_DURATION = 1140   
  const SOUND_DELAY = 0
  const SOUND_START_OFFSET = ANIMATION_DURATION - (SOUND_DURATION - SOUND_DELAY)

  let soundPlayed = false

  onMount(() => {
    sound.loadSound('drawerOpen', '/sounds/drawer-open.mp3')
    sound.loadSound('drawerClose', '/sounds/drawer-close.mp3')
  })

  const toggleDrawer = async ({ from, to, onUpdate }: ToggleDrawerAnimationProps) => {
    soundPlayed = false
    
    return new Promise((resolve) => {
      animate(
        ANIMATION_DURATION,
        (t) => easeInOutCubic(t).run(),
        (progress) => {
          const currentPosition = from + (to - from) * progress
          onUpdate(currentPosition)
          
          const isOpening = to > from
          if (progress >= SOUND_START_OFFSET / ANIMATION_DURATION && !soundPlayed) {
            sound.playSound(isOpening ? 'drawerOpen' : 'drawerClose')
            soundPlayed = true
          }

          if (progress === 1) {
            resolve(void 0)
          }
        }
      )
    })
  }

  return {
    toggleDrawer,
    drawerPosition,
  }
}
