import { sound } from "$lib/sound/sound"
import { onMount } from "svelte"
import { writable } from "svelte/store"
import { animate, easeInOutCubic } from "../easing"

export var toggleRightLeftDoor = () => {
  const leftDoorRotation = writable(0)
  const rightDoorRotation = writable(0)
  const MAX_ROTATION = Math.PI / 2 // π/2 radians (90 degrees)

  let isLeftDoorOpen = $state(false)
  let isRightDoorOpen = $state(false)

  const ANIMATION_DURATION = 1000 // Animation duration in milliseconds
  const SOUND_DURATION = 100
  const SOUND_DELAY = 0
  const SOUND_START_OFFSET = ANIMATION_DURATION - (SOUND_DURATION - SOUND_DELAY) // Start sound this many milliseconds before animation ends

  let soundPlayed = false // Flag to track if the sound has been played

  onMount(() => {
    sound.loadSound('doorClose', '/sounds/door-close.mp3')
  })

  const toggle = (door: 'left' | 'right') => {
    if (door === 'left') {
      let isOpen = isLeftDoorOpen
      if (!isOpen) {
        soundPlayed = false // Reset the flag at the start of the animation
        animate(
          ANIMATION_DURATION,
          (t) => easeInOutCubic(t).run(),
          (progress) => {
            leftDoorRotation.set(-progress * MAX_ROTATION)
            isLeftDoorOpen = true
          }
        )
      } else {
        soundPlayed = false // Reset the flag at the start of the animation
        animate(
          ANIMATION_DURATION,
          (t) => easeInOutCubic(t).run(),
          (progress) => {
            leftDoorRotation.set((1 - progress) * -MAX_ROTATION)
            isLeftDoorOpen = false

            // Start playing the sound slightly before the animation ends
            if (!soundPlayed && progress >= SOUND_START_OFFSET / ANIMATION_DURATION) {
              sound.playSound('doorClose')
              soundPlayed = true // Set the flag to true after playing the sound
            }
          }
        )
      }
    } else if (door === 'right') {
      let isOpen = isRightDoorOpen
      if (!isOpen) {
        soundPlayed = false // Reset the flag at the start of the animation
        animate(
          ANIMATION_DURATION,
          (t) => easeInOutCubic(t).run(),
          (progress) => {
            rightDoorRotation.set(progress * MAX_ROTATION)
            isRightDoorOpen = true
          }
        )
      } else {
        soundPlayed = false // Reset the flag at the start of the animation
        animate(
          ANIMATION_DURATION,
          (t) => easeInOutCubic(t).run(),
          (progress) => {
            rightDoorRotation.set((1 - progress) * MAX_ROTATION)
            isRightDoorOpen = false

            // Start playing the sound slightly before the animation ends
            if (!soundPlayed && progress >= SOUND_START_OFFSET / ANIMATION_DURATION) {
              sound.playSound('doorClose')
              soundPlayed = true // Set the flag to true after playing the sound
            }
          }
        )
      }
    }
  }
  const toggleLeft = () => toggle('left')
  const toggleRight = () => toggle('right')

  return {
    toggleLeft,
    toggleRight,
    leftDoorRotation,
    rightDoorRotation,
  }
}

