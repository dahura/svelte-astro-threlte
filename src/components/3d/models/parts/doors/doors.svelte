<script lang="ts">
  import type { GenericModel } from '../../types'
  import { T } from '@threlte/core'
  import { toggleRightLeftDoor } from '../../../motions/doors/toogle-door.svelte.ts'
  import * as THREE from 'three'

  interface Props {
    model: GenericModel
    texture: THREE.Texture
    texture_color: THREE.ColorRepresentation
  }

  let { model, texture, texture_color }: Props = $props()

  const DOOR_THICKNESS = 2
  const MATERIAL_THICKNESS = 12

  const { toggleLeft, toggleRight, leftDoorRotation, rightDoorRotation } = toggleRightLeftDoor()
</script>

{#if model.doors}
  {#each Array(model.doors.count) as _, i}
    {#if model.doors.count === 2}
      <T.Group
        position={[-model.dimensions.width / 2 + MATERIAL_THICKNESS, 0, model.dimensions.depth / 2]}
        rotation.y={$leftDoorRotation}
        onclick={() => {
          console.log('left door clicked')
        }}
      >
        <T.Mesh position={[model.dimensions.width / 4, 0, 0]} onclick={toggleLeft}>
          <T.BoxGeometry
            args={[model.dimensions.width / 2, model.dimensions.height - 2, DOOR_THICKNESS]}
          />
          <T.MeshStandardMaterial
            map={texture}
            color={new THREE.Color(texture_color)}
            roughness={0.5}
            metalness={0.1}
          />
          <T.Mesh position={[model.dimensions.width / 4 - 5, 0, 1]}>
            <T.BoxGeometry args={[9, 60, 4]} />
            <T.MeshStandardMaterial map={texture} roughness={0.5} metalness={0.1} />
          </T.Mesh>
        </T.Mesh>
      </T.Group>

      <T.Group
        position={[model.dimensions.width / 2 - 1, 0, model.dimensions.depth / 2]}
        rotation.y={$rightDoorRotation}
      >
        <T.Mesh position={[-model.dimensions.width / 4, 0, 0]} onclick={toggleRight}>
          <T.BoxGeometry
            args={[model.dimensions.width / 2, model.dimensions.height - 2, DOOR_THICKNESS]}
          />
          <T.MeshStandardMaterial
            map={texture}
            color={new THREE.Color(texture_color)}
            roughness={0.5}
            metalness={0.1}
          />
          <T.Mesh position={[-model.dimensions.width / 4 + 5, 0, 1]}>
            <T.BoxGeometry args={[9, 60, 4]} />
            <T.MeshStandardMaterial map={texture} roughness={0.5} metalness={0.1} />
          </T.Mesh>
        </T.Mesh>
      </T.Group>
    {/if}
    {#if model.doors.count === 1}
      <T.Group
        position={[model.dimensions.width / 2 - 1, 0, model.dimensions.depth / 2]}
        rotation.y={$rightDoorRotation}
      >
        <T.Mesh position={[-model.dimensions.width / 2, 0, 0]} onclick={toggleRight}>
          <T.BoxGeometry
            args={[model.dimensions.width, model.dimensions.height - 2, DOOR_THICKNESS]}
          />
          <T.MeshStandardMaterial
            map={texture}
            color={new THREE.Color(texture_color)}
            roughness={0.5}
            metalness={0.1}
          />
          <T.Mesh position={[-model.dimensions.width / 2 + 5, 0, 1]}>
            <T.BoxGeometry args={[9, 60, 4]} />
            <T.MeshStandardMaterial map={texture} roughness={0.5} metalness={0.1} />
          </T.Mesh>
        </T.Mesh>
      </T.Group>
    {/if}
  {/each}
{/if}
