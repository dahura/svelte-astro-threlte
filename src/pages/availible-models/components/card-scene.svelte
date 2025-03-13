<script lang="ts">
  import Card from '$lib/components/ui/card/card.svelte'
  import { CardContent, CardHeader, CardTitle } from '$lib/components/ui/card'
  import { Canvas } from '@threlte/core'
  import CabinetScene from '$/components/3d/cabinet-scene.svelte'
  import { createScene, MODULE_1_CABINETS } from '$/components/3d/modules/module-1'
  import type { CornerCabinet, LowerCabinet, UpperCabinet } from '$/components/3d/types'

  const { title, cabinetType }: { title: string; cabinetType: 'upper' | 'lower' | 'corner' } =
    $props()
</script>

<Card>
  <CardHeader>
    <CardTitle>
      {title}
    </CardTitle>
    <CardContent>
      {#if cabinetType === 'upper'}
        <Canvas>
          <CabinetScene
            sceneConfig={createScene<UpperCabinet>({
              cameraPosition: {
                x: MODULE_1_CABINETS.upper.width,
                y: MODULE_1_CABINETS.upper.height,
                z: MODULE_1_CABINETS.upper.depth * 5
              },
              light: {
                type: 'direct',
                position: {
                  x: MODULE_1_CABINETS.upper.width,
                  y: MODULE_1_CABINETS.upper.height,
                  z: MODULE_1_CABINETS.upper.depth
                }
              }
            })}
            cabinet={MODULE_1_CABINETS.upper}
          />
        </Canvas>
      {:else if cabinetType === 'lower'}
        <Canvas>
          <CabinetScene
            sceneConfig={createScene<LowerCabinet>({
              cameraPosition: {
                x: MODULE_1_CABINETS.lower.width,
                y: MODULE_1_CABINETS.lower.height,
                z: MODULE_1_CABINETS.lower.depth * 5
              },
              light: {
                type: 'direct',
                position: {
                  x: MODULE_1_CABINETS.lower.width,
                  y: MODULE_1_CABINETS.lower.height,
                  z: MODULE_1_CABINETS.lower.depth
                }
              }
            })}
            cabinet={MODULE_1_CABINETS.lower}
          />
        </Canvas>
      {:else if cabinetType === 'corner'}
        <Canvas>
          <CabinetScene
            sceneConfig={createScene<CornerCabinet>({
              cameraPosition: {
                x: MODULE_1_CABINETS.corner.width,
                y: MODULE_1_CABINETS.corner.height,
                z: MODULE_1_CABINETS.corner.depth * 5
              },
              light: {
                type: 'direct',
                position: {
                  x: MODULE_1_CABINETS.corner.width,
                  y: MODULE_1_CABINETS.corner.height,
                  z: MODULE_1_CABINETS.corner.depth
                }
              }
            })}
            cabinet={MODULE_1_CABINETS.corner}
          />
        </Canvas>
      {/if}
    </CardContent>
  </CardHeader>
</Card>
