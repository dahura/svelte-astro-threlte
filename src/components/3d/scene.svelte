<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { interactivity, Suspense } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { SCALE, MAX_DIMENSIONS_SUM_FOR_SCALE } from './models/constants'
  import Box from './models/box.svelte'
  import { AerodynamicsWorkshopEnvironment } from './enviroments'
  import { FullCabinet, CornerCabinet } from './models'

  interactivity()

  export let width = 1
  export let height = 2
  export let depth = 1
  export let rotate = true

  const scale = new Spring(1)
  $: sumOfDimensions = width + height + depth
  $: canScale = sumOfDimensions < MAX_DIMENSIONS_SUM_FOR_SCALE

  let rotation = 0
  useTask((delta) => {
    if (rotate) {
      rotation += delta
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[60, 150, 200]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>
<T.DirectionalLight position={[60, 150, 200]} intensity={0.8} />
<T.DirectionalLight position={[-60, -150, -200]} intensity={0.5} />

<T.Mesh
  rotation.y={rotation}
  position.y={1}
  scale={scale.current}
  onpointerenter={() => {
    if (canScale) {
      scale.target = SCALE
    }
  }}
  onpointerleave={() => {
    scale.target = 1
  }}
>
  <FullCabinet />
  <!-- <CornerCabinet /> -->

  <!-- <T.MeshStandardMaterial color="hotpink" /> -->
  <Suspense>
    {#snippet fallback()}
      <div class="w-full h-full bg-black">loading...</div>
    {/snippet}
    <!-- <Environment url="/hdr/aerodynamics_workshop_1k.hdr" /> -->
    <AerodynamicsWorkshopEnvironment />
  </Suspense>
</T.Mesh>
