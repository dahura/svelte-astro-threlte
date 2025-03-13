<script lang="ts">
  import Card from '$lib/components/ui/card/card.svelte'
  import { CardContent, CardHeader, CardTitle } from '$lib/components/ui/card'
  import { Canvas } from '@threlte/core'
  import CabinetScene from '$/components/3d/cabinet-scene.svelte'
  import { createScene } from '$/components/3d/modules/module-1'

  import { cabinets } from '$/components/3d/modules/module-1'
  import type { BaseCabinet, Model } from '$/components/3d/types'

  // Function to generate sceneConfig dynamically for each cabinet
  const getSceneConfig = (cabinet: Model) =>
    createScene<any>(cabinet, {
      cameraPosition: {
        x: cabinet.width,
        y: cabinet.height,
        z: cabinet.depth * 5
      },
      modelSettings: {
        scaleOnHover: true,
        useScale: 1.0,
        // Scale for 5 seconds
        rotateModelByDefault: false
        // Rotate for 10 seconds
      },
      light: {
        type: 'direct',
        position: {
          x: cabinet.width * 1.5, // Zoom out by increasing the x position
          y: cabinet.height * 1.5, // Zoom out by increasing the y position
          z: cabinet.depth * 5 // Zoom out by increasing the z position
        }
      }
    })
</script>

{#each cabinets as cabinet}
  <Card>
    <CardHeader>
      <CardTitle>{cabinet.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <Canvas>
        <CabinetScene sceneConfig={getSceneConfig(cabinet)} {cabinet} />
      </Canvas>
    </CardContent>
  </Card>
{/each}
