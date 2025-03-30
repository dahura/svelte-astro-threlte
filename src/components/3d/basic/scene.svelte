<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, interactivity, OrbitControls } from '@threlte/extras'
  import { Color } from 'three'
  import type { Snippet } from 'svelte'
  import PivotPoint from './pivot-point.svelte'

  interactivity()

  interface IScene {
    sceneId: string
    children?: Snippet
    position?: {
      x: number
      y: number
      z: number
    }

    settings?: {
      autoRotate: boolean
      enableDamping: boolean
      rotateSpeed: number
      zoomToCursor: boolean
      zoomSpeed: number
      minPolarAngle: number
      maxPolarAngle: number
      enableZoom: boolean
    }
  }

  let {
    sceneId,
    children,
    position = {
      x: 0,
      y: 0,
      z: 0
    },

    settings = $bindable({
      autoRotate: false,
      enableDamping: true,
      rotateSpeed: 1,
      zoomToCursor: false,
      zoomSpeed: 1,
      minPolarAngle: Math.PI / 4,
      maxPolarAngle: Math.PI * 0.9,
      enableZoom: true
    })
  }: IScene = $props()

  const {
    autoRotate,
    enableDamping,
    rotateSpeed,
    zoomToCursor,
    zoomSpeed,
    minPolarAngle,
    maxPolarAngle,
    enableZoom
  } = settings

  $effect(() => {})

  const getSceneHeight = () => {
    return 2000
  }

  const pivotOffset = {
    bottom: getSceneHeight() / 2,
    center: 0,
    top: -getSceneHeight() / 2
  }
</script>

<class class="w-full h-full" id={sceneId}>
  <T.PerspectiveCamera
    makeDefault
    position={[position.x, position.y, position.z]}
    near={0.1}
    far={17000}
  >
    <OrbitControls
      {enableDamping}
      {autoRotate}
      {rotateSpeed}
      {zoomToCursor}
      {zoomSpeed}
      {minPolarAngle}
      {maxPolarAngle}
      {enableZoom}
      minDistance={1000}
      maxDistance={15000}
    >
      <Gizmo />
    </OrbitControls>
  </T.PerspectiveCamera>

  <!-- Ambient Light -->
  <T.AmbientLight intensity={0.3} />

  <!-- Directional Light -->
  <T.DirectionalLight position={[0, 5000, 5000]} intensity={1.5} castShadow />

  <!-- Additional Directional Light for Accents -->
  <T.DirectionalLight position={[-5000, 3000, 5000]} intensity={0.8} color={0xffeedd} />

  <!-- Point Light -->
  <T.PointLight position={[0, 5000, 0]} intensity={0.5} distance={10000} />

  <!-- Centered Model -->

  <T.Group position={[0, 0, 0]}>
    {@render children?.()}
  </T.Group>
</class>
