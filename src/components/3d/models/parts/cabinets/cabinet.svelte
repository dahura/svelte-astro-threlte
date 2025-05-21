<script lang="ts">
  import type { GenericModel } from '../../types'
  import { T } from '@threlte/core'
  import * as THREE from 'three'

  interface Props {
    model: GenericModel
    woodMap: THREE.Texture
    texture_color?: THREE.ColorRepresentation
  }

  const { model, woodMap, texture_color = 0x777777 }: Props = $props()

  const SIDE_WALL_THICKNESS = 16
  const BACK_WALL_THICKNESS = 4
  const FLOOR_THICKNESS = 19
</script>

<T.Group>
  <!-- Левая стенка -->
  <T.Mesh position={[-model.dimensions.width / 2 + SIDE_WALL_THICKNESS / 2, 0, 0]}>
    <T.BoxGeometry args={[SIDE_WALL_THICKNESS, model.dimensions.height, model.dimensions.depth]} />
    <T.MeshStandardMaterial
      map={woodMap}
      color={new THREE.Color(texture_color)}
      roughness={0.7}
      metalness={0.05}
    />
  </T.Mesh>

  <!-- Правая стенка -->
  <T.Mesh position={[model.dimensions.width / 2 - SIDE_WALL_THICKNESS / 2, 0, 0]}>
    <T.BoxGeometry args={[SIDE_WALL_THICKNESS, model.dimensions.height, model.dimensions.depth]} />
    <T.MeshStandardMaterial
      map={woodMap}
      color={new THREE.Color(texture_color)}
      roughness={0.7}
      metalness={0.05}
    />
  </T.Mesh>

  <!-- Задняя стенка -->
  <T.Mesh position={[0, 0, -model.dimensions.depth / 2 + BACK_WALL_THICKNESS / 2]}>
    <T.BoxGeometry args={[model.dimensions.width, model.dimensions.height, BACK_WALL_THICKNESS]} />
    <T.MeshStandardMaterial
      map={woodMap}
      color={new THREE.Color(texture_color)}
      roughness={0.7}
      metalness={0.05}
    />
  </T.Mesh>

  <!-- Верх шкафа -->
  <T.Mesh position={[0, model.dimensions.height / 2 - FLOOR_THICKNESS / 2, 0]}>
    <T.BoxGeometry args={[model.dimensions.width, FLOOR_THICKNESS, model.dimensions.depth]} />
    <T.MeshStandardMaterial
      map={woodMap}
      color={new THREE.Color(texture_color)}
      roughness={0.7}
      metalness={0.05}
    />
  </T.Mesh>

  <!-- Низ шкафа -->
  <T.Mesh position={[0, -model.dimensions.height / 2 + FLOOR_THICKNESS / 2, 0]}>
    <T.BoxGeometry args={[model.dimensions.width, FLOOR_THICKNESS, model.dimensions.depth]} />
    <T.MeshStandardMaterial
      map={woodMap}
      color={new THREE.Color(texture_color)}
      roughness={0.7}
      metalness={0.05}
    />
  </T.Mesh>

  <!-- Один оптимизированный свет для боковой стороны шкафа -->
  <T.DirectionalLight
    position={[model.dimensions.width, 0, model.dimensions.depth / 2]}
    intensity={1.0}
    color={0xffffff}
    castShadow={false}
  />
</T.Group>
