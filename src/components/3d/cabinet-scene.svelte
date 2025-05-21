<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { interactivity, Suspense } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { default as RenderCabinet } from './render-cabinet.svelte'
  import { AerodynamicsWorkshopEnvironment } from './enviroments'
  import type { Scene, BaseCabinet } from './types'

  interactivity()

  const { sceneConfig, cabinet }: { sceneConfig: Scene; cabinet: BaseCabinet } = $props()

  let rotation = $state(0) // Set rotation to 0 to look directly at the user
  let scale = new Spring(sceneConfig.modelSettings.useScale || 1)
  let elapsedTime = $state(0)

  function checkScale() {
    return sceneConfig.modelSettings.scaleUntil
      ? sceneConfig.modelSettings.scaleUntil({
          currentScale: scale.current,
          elapsedTime,
          initialScale: 1,
          currentRotation: { x: 0, y: rotation, z: 0 },
          cabinet
        })
      : false
  }

  useTask((delta) => {
    elapsedTime += delta
    if (sceneConfig.modelSettings.rotateModelByDefault) {
      if (
        !sceneConfig.modelSettings.rotateUntil ||
        sceneConfig.modelSettings.rotateUntil({
          currentScale: scale.current,
          elapsedTime,
          initialScale: 1,
          currentRotation: { x: 0, y: rotation, z: 0 },
          cabinet
        })
      ) {
        rotation += delta
      }
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[
    sceneConfig.cameraPosition.x,
    sceneConfig.cameraPosition.y,
    sceneConfig.cameraPosition.z
  ]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>
{#if sceneConfig.light.type === 'direct'}
  <T.DirectionalLight
    position={[
      sceneConfig.light.position.x,
      sceneConfig.light.position.y,
      sceneConfig.light.position.z
    ]}
  />
{/if}

{#if sceneConfig.light.type === 'point'}
  <T.PointLight
    position={[
      sceneConfig.light.position.x,
      sceneConfig.light.position.y,
      sceneConfig.light.position.z
    ]}
    intensity={1}
    distance={100}
    decay={2}
  />
{/if}

<T.Mesh
  rotation.y={0}
  rotation.x={0}
  scale={scale.current}
  onpointerenter={() => {
    if (sceneConfig.modelSettings.scaleOnHover && checkScale()) {
      scale.target = sceneConfig.modelSettings.useScale || 1.2
    }
  }}
  onpointerleave={() => {
    scale.target = 1
  }}
>
  <Suspense>
    {#snippet fallback()}
      <div class="w-full h-full">loading...</div>
    {/snippet}
    <RenderCabinet {cabinet} />
    <AerodynamicsWorkshopEnvironment />
  </Suspense>
</T.Mesh>
