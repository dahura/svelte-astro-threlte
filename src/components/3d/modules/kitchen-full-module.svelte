<script lang="ts">
  import { type Snippet } from 'svelte'
  import { Canvas } from '@threlte/core'

  import { Scene, Settings } from '../basic'
  import RenderCabinet from '../render-cabinet.svelte'
  import { cabinets } from './module-1'
  import Kitchen1 from './kitchen-1.svelte'
  let init = $state(false)

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
    <Kitchen1 />
  </Canvas>
  <Settings bind:settings class="absolute top-0 left-0" />
</div>
