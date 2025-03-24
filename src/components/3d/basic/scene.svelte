<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, interactivity, OrbitControls } from '@threlte/extras'
  import { Color } from 'three'
  import type { Snippet } from 'svelte'

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
      minPolarAngle: Math.PI * 0.1,
      maxPolarAngle: Math.PI * 0.5,
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

  $effect(() => {
    console.log(autoRotate)
  })
</script>

<class class="w-full h-full" id={sceneId}>
  <T.PerspectiveCamera makeDefault position={[0, 1500, 2000]} near={0.1} far={10000}>
    <OrbitControls
      onchange={(e) => console.log(e)}
      {enableDamping}
      {autoRotate}
      {rotateSpeed}
      {zoomToCursor}
      {zoomSpeed}
      {minPolarAngle}
      {maxPolarAngle}
      {enableZoom}
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

  <!-- New Walls -->
  <!-- <T.Mesh position={[0, 0, -1000]} receiveShadow>
    <T.PlaneGeometry args={[4000, 2000]} />
    <T.MeshStandardMaterial color={new Color(0xcccccc)} opacity={0.5} transparent={true} />
  </T.Mesh>

  <T.Mesh rotation.y={Math.PI / 2} position={[-2000, 0, 0]} receiveShadow>
    <T.PlaneGeometry args={[4000, 2000]} />
    <T.MeshStandardMaterial color={new Color(0xcccccc)} />
  </T.Mesh> -->

  <!-- <T.Mesh rotation.y={-Math.PI / 2} position={[2000, 0, 0]} receiveShadow>
    <T.PlaneGeometry args={[4000, 2000]} />
    <T.MeshStandardMaterial color={new Color(0xcccccc)} />
  </T.Mesh> -->

  <!-- New Floor -->
  <!-- <T.Mesh rotation.x={-Math.PI / 2} position.y={-1000} receiveShadow>
    <T.PlaneGeometry args={[4000, 4000]} />
    <T.MeshStandardMaterial color={new Color(0xcccccc)} />
  </T.Mesh> -->

  <!-- Centered Model -->
  <T.Group position={[-2000, 0, 0]}>
    {@render children?.()}
  </T.Group>
</class>
