<script lang="ts">
  import { toggleDrawerAnimation } from '$/components/3d/motions/drawer/toggle-drawer.svelte'
  import { T } from '@threlte/core'
  import { onMount, createEventDispatcher } from 'svelte'
  import * as THREE from 'three'
  import type { GenericModel } from '../../types'

  interface IDrawerProps {
    model: GenericModel
    i: number
    adjustedDrawerSizes: number[]
    drawerPositions: number[]
    texture: THREE.Texture
    texture_color: THREE.ColorRepresentation
    MATERIAL_THICKNESS: number
    FACADE_THICKNESS: number
  }

  let {
    model,
    i,
    adjustedDrawerSizes,
    drawerPositions,
    texture,
    texture_color,
    MATERIAL_THICKNESS,
    FACADE_THICKNESS
  }: IDrawerProps = $props()

  const { toggleDrawer: toggle } = toggleDrawerAnimation()
  const dispatch = createEventDispatcher<{
    updateDrawerPosition: { index: number; value: number }
  }>()

  // Флаг для предотвращения множественных кликов
  let isAnimating = false

  // Кэшируем геометрию для оптимизации
  const drawerGeometries = {
    front: null as THREE.BoxGeometry | null,
    side: null as THREE.BoxGeometry | null,
    bottom: null as THREE.BoxGeometry | null,
    back: null as THREE.BoxGeometry | null
  }

  // Создаем геометрии только один раз для повторного использования
  function createGeometries() {
    if (!adjustedDrawerSizes[i]) return

    const drawerHeight = getDrawerHeight(i)

    if (!drawerGeometries.front) {
      drawerGeometries.front = new THREE.BoxGeometry(
        model.dimensions.width - 4,
        drawerHeight - MATERIAL_THICKNESS,
        FACADE_THICKNESS
      )
    }

    if (!drawerGeometries.side) {
      drawerGeometries.side = new THREE.BoxGeometry(
        MATERIAL_THICKNESS,
        drawerHeight - MATERIAL_THICKNESS,
        model.dimensions.depth - 4
      )
    }

    if (!drawerGeometries.bottom) {
      drawerGeometries.bottom = new THREE.BoxGeometry(
        model.dimensions.width - 8,
        MATERIAL_THICKNESS,
        model.dimensions.depth - 4
      )
    }

    if (!drawerGeometries.back) {
      drawerGeometries.back = new THREE.BoxGeometry(
        model.dimensions.width - 8,
        drawerHeight - MATERIAL_THICKNESS,
        MATERIAL_THICKNESS
      )
    }
  }

  async function toggleDrawer(index: number) {
    const isOpen = drawerPositions[index] > 0
    const targetPosition = isOpen ? 0 : model.dimensions.depth / 2

    // Создаем локальную копию для анимации
    let currentPosition = drawerPositions[index]

    // Предотвращаем множественные клики
    if (isAnimating) return

    isAnimating = true

    await toggle({
      from: currentPosition,
      to: targetPosition,
      onUpdate: (value) => {
        // Вместо прямого изменения массива отправляем событие
        dispatch('updateDrawerPosition', { index, value })
      }
    })

    isAnimating = false
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

  onMount(() => {
    createGeometries()
  })
</script>

{#if adjustedDrawerSizes[i] > 0}
  <T.Group position={[0, getElementPosition(i), drawerPositions[i]]}>
    <!-- Ящик -->
    <T.Mesh
      position={[0, 0, model.dimensions.depth / 2]}
      onclick={(e: Event) => {
        e.stopPropagation()
        toggleDrawer(i)
      }}
      castShadow
    >
      <T.BoxGeometry
        args={[
          model.dimensions.width - 4,
          getDrawerHeight(i) - MATERIAL_THICKNESS,
          FACADE_THICKNESS
        ]}
      />
      <T.MeshStandardMaterial
        map={texture}
        color={new THREE.Color(texture_color)}
        roughness={0.7}
        metalness={0.05}
      />
    </T.Mesh>

    {#if model.handles}
      <!-- Ручка -->
      <T.Mesh
        position={[0, getDrawerHeight(i) / 2, model.dimensions.depth / 2 + 2]}
        rotation={[Math.PI / 18, 0, 0]}
        castShadow
      >
        <T.BoxGeometry args={[model.dimensions.width * 0.8, 4, 32]} />
        <T.MeshStandardMaterial color={new THREE.Color(0xcccccc)} roughness={0.5} metalness={0.8} />
      </T.Mesh>

      <!-- Плоскость для тени -->
      <T.Mesh position={[0, getDrawerHeight(i) / 2 - 1, model.dimensions.depth / 2]} receiveShadow>
        <T.PlaneGeometry args={[model.dimensions.width, 32]} />
        <T.ShadowMaterial opacity={0.5} />
      </T.Mesh>
    {/if}

    <!-- Остальные части ящика -->
    <T.Mesh position={[0, -getDrawerHeight(i) / 2 + MATERIAL_THICKNESS / 2, 0]} receiveShadow>
      <T.BoxGeometry
        args={[model.dimensions.width - 8, MATERIAL_THICKNESS, model.dimensions.depth - 4]}
      />
      <T.MeshStandardMaterial
        map={texture}
        color={new THREE.Color(texture_color)}
        roughness={0.7}
        metalness={0.05}
      />
    </T.Mesh>

    <!-- Правая стенка -->
    <T.Mesh position={[model.dimensions.width / 2 - MATERIAL_THICKNESS, 0, 0]}>
      <T.BoxGeometry
        args={[
          MATERIAL_THICKNESS,
          getDrawerHeight(i) - MATERIAL_THICKNESS,
          model.dimensions.depth - 4
        ]}
      />
      <T.MeshStandardMaterial
        map={texture}
        color={new THREE.Color(texture_color)}
        roughness={0.7}
        metalness={0.05}
      />
    </T.Mesh>

    <!-- Левая стенка (исправлено) -->
    <T.Mesh position={[-model.dimensions.width / 2 + MATERIAL_THICKNESS, 0, 0]}>
      <T.BoxGeometry
        args={[
          MATERIAL_THICKNESS,
          getDrawerHeight(i) - MATERIAL_THICKNESS,
          model.dimensions.depth - 4
        ]}
      />
      <T.MeshStandardMaterial
        map={texture}
        color={new THREE.Color(texture_color)}
        roughness={0.7}
        metalness={0.05}
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
        map={texture}
        color={new THREE.Color(texture_color)}
        roughness={0.7}
        metalness={0.05}
      />
    </T.Mesh>

    <!-- Один оптимизированный свет вместо трех -->
    <T.DirectionalLight
      position={[model.dimensions.width, 0, model.dimensions.depth / 2]}
      intensity={1.0}
      castShadow={false}
    />
  </T.Group>
{/if}
