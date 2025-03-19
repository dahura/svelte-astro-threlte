<script lang="ts">
  import { Scene } from '$/components/3d/basic'
  import { Canvas } from '@threlte/core'
  import { default as CanvasContainer } from './redactor-canvas-container.svelte'
  import Redactor from './redactor.svelte'

  interface RedactorSceneProps {
    isChatVisible: boolean
  }

  let { isChatVisible }: RedactorSceneProps = $props()

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

<CanvasContainer {isChatVisible}>
  <Canvas>
    <Scene sceneId="redactor-scene" bind:settings position={{ x: 0, y: 900, z: 3000 }}>
      <Redactor />
    </Scene>
  </Canvas>
</CanvasContainer>
