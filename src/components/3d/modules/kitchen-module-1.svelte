<script lang="ts">
  import { type Snippet } from 'svelte'
  import { Canvas } from '@threlte/core'

  import { Scene, Settings } from '../basic'
  import RenderCabinet from '../render-cabinet.svelte'
  import { cabinets } from './module-1'

  let init = $state(false)

  $effect(() => {
    init && console.log('init', init)
  })
  let settings = $state({
    autoRotate: false,
    enableDamping: true,
    rotateSpeed: 1,
    zoomToCursor: false,
    zoomSpeed: 1,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
    enableZoom: true
  })
</script>

<div class="w-screen h-screen">
  <Canvas>
    <Scene
      sceneId="kitchen-module-1"
      bind:settings
      position={{ x: cabinets[0].width, y: cabinets[0].height, z: cabinets[0].depth }}
    >
      <RenderCabinet cabinet={cabinets[0]} />
    </Scene>
  </Canvas>
  <!-- <Settings bind:settings class="absolute top-0 left-0" /> -->
</div>
