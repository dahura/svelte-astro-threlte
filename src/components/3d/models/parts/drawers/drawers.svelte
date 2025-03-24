<script lang="ts">
  import { toggleDrawerAnimation } from '$/components/3d/motions/drawer/toggle-drawer.svelte'
  import { T } from '@threlte/core'
  import { onMount } from 'svelte'
  import * as THREE from 'three'

  interface IDrawerProps {
    model: any
    i: number
    adjustedDrawerSizes: number[]
    drawerPositions: number[]
    woodMap: THREE.Texture
    handleMap: THREE.Texture
    MATERIAL_THICKNESS: number
    FACADE_THICKNESS: number
  }

  let {
    model,
    i,
    adjustedDrawerSizes,
    drawerPositions,
    woodMap,
    handleMap,
    MATERIAL_THICKNESS,
    FACADE_THICKNESS
  }: IDrawerProps = $props()

  const { toggleDrawer: toggle } = toggleDrawerAnimation()

  async function toggleDrawer(index: number) {
    const isOpen = drawerPositions[index] > 0
    const targetPosition = isOpen ? 0 : model.dimensions.depth / 2

    await toggle({
      from: drawerPositions[index],
      to: targetPosition,
      onUpdate: (value) => {
        drawerPositions[index] = value
      }
    })
  }

  function getElementPosition(index: number): number {
    let position = -model.dimensions.height / 2
    for (let i = 0; i <= index; i++) {
      position += adjustedDrawerSizes[i] > 0 ? adjustedDrawerSizes[i] : 0
    }
    return position - (adjustedDrawerSizes[index] > 0 ? adjustedDrawerSizes[index] / 2 : 0)
  }

  // Function to get the height of the drawer
  function getDrawerHeight(index: number): number {
    return adjustedDrawerSizes[index] ?? 0
  }

  onMount(() => {})
</script>

{#if adjustedDrawerSizes[i] > 0}
  <T.Group position={[0, getElementPosition(i), drawerPositions[i]]}>
    <T.Mesh position={[0, 0, model.dimensions.depth / 2]} onclick={() => toggleDrawer(i)}>
      <T.BoxGeometry
        args={[
          model.dimensions.width - 4,
          getDrawerHeight(i) - MATERIAL_THICKNESS,
          FACADE_THICKNESS
        ]}
      />
      <T.MeshStandardMaterial
        map={woodMap}
        color={new THREE.Color(0x333333)}
        roughness={0.5}
        metalness={0.1}
      />
    </T.Mesh>

    {#if model.handles}
      <T.Mesh position={[0, 0, 1]}>
        <T.BoxGeometry args={[60, 4, 4]} />
        <T.MeshStandardMaterial map={handleMap} roughness={0.5} metalness={0.1} />
      </T.Mesh>
    {/if}

    <T.Mesh position={[0, -getDrawerHeight(i) / 2 + MATERIAL_THICKNESS / 2, 0]}>
      <T.BoxGeometry
        args={[model.dimensions.width - 8, MATERIAL_THICKNESS, model.dimensions.depth - 4]}
      />
      <T.MeshStandardMaterial
        map={woodMap}
        color={new THREE.Color(0x333333)}
        roughness={0.5}
        metalness={0.1}
      />
    </T.Mesh>

    <T.Mesh position={[-model.dimensions.width / 2 + MATERIAL_THICKNESS, 0, 0]}>
      <T.BoxGeometry
        args={[
          MATERIAL_THICKNESS,
          getDrawerHeight(i) - MATERIAL_THICKNESS,
          model.dimensions.depth - 4
        ]}
      />
      <T.MeshStandardMaterial
        map={woodMap}
        color={new THREE.Color(0x333333)}
        roughness={0.5}
        metalness={0.1}
      />
    </T.Mesh>

    <T.Mesh position={[model.dimensions.width / 2 - MATERIAL_THICKNESS, 0, 0]}>
      <T.BoxGeometry
        args={[
          MATERIAL_THICKNESS,
          getDrawerHeight(i) - MATERIAL_THICKNESS,
          model.dimensions.depth - 4
        ]}
      />
      <T.MeshStandardMaterial
        map={woodMap}
        color={new THREE.Color(0x333333)}
        roughness={0.5}
        metalness={0.1}
      />
    </T.Mesh>

    <T.Mesh position={[0, 0, -model.dimensions.depth / 2 + MATERIAL_THICKNESS]}>
      <T.BoxGeometry
        args={[
          model.dimensions.width - 8,
          getDrawerHeight(i) - MATERIAL_THICKNESS,
          MATERIAL_THICKNESS
        ]}
      />
      <T.MeshStandardMaterial
        map={woodMap}
        color={new THREE.Color(0x333333)}
        roughness={0.5}
        metalness={0.1}
      />
    </T.Mesh>
  </T.Group>
{/if}
