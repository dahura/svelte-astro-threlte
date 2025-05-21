<script lang="ts">
  import type { GenericModel } from '../../types'
  import { T } from '@threlte/core'
  import * as THREE from 'three'

  interface Props {
    model: GenericModel
    i: number
    adjustedDrawerSizes: number[]
    gapHeight: number
    texture: THREE.Texture
    texture_color: THREE.ColorRepresentation
    SHELF_THICKNESS: number
  }

  const {
    model,
    i,
    adjustedDrawerSizes,
    gapHeight,
    texture,
    texture_color,
    SHELF_THICKNESS
  }: Props = $props()

  // Функция для получения позиции полки
  function getShelfPosition(index: number): number {
    let position = -model.dimensions.height / 2
    for (let i = 0; i <= index; i++) {
      position += adjustedDrawerSizes[i] > 0 ? adjustedDrawerSizes[i] : gapHeight
    }
    return (
      position - (adjustedDrawerSizes[index] > 0 ? adjustedDrawerSizes[index] / 2 : gapHeight / 2)
    )
  }
</script>

<T.Mesh
  position={[
    0,
    getShelfPosition(i) +
      (adjustedDrawerSizes[i] > 0 ? adjustedDrawerSizes[i] / 2 : gapHeight / 2) -
      SHELF_THICKNESS / 2,
    0
  ]}
>
  <T.BoxGeometry args={[model.dimensions.width - 4, SHELF_THICKNESS, model.dimensions.depth]} />
  <T.MeshStandardMaterial
    map={texture}
    color={new THREE.Color(texture_color)}
    roughness={0.5}
    metalness={0.1}
  />
</T.Mesh>
