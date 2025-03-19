<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, interactivity, OrbitControls, useTexture } from '@threlte/extras'
  import type { Snippet } from 'svelte'
  import { RepeatWrapping } from 'three'

  interactivity()

  // Load floor textures
  const floorBaseTexture = useTexture('/textures/4k/metal-white.jpg', {
    transform: (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.repeat.set(10, 10) // Adjust the repeat value based on your needs
      return texture
    }
  })

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

  // Subscribe to the scene store to get settings for the current scene
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

  const wallTexture = useTexture('/textures/4k/wall-white.png', {
    transform: (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.repeat.set(10, 10) // Adjust the repeat value based on your needs
      return texture
    }
  })
</script>

<div class="w-full h-full" id={sceneId}>
  <T.PerspectiveCamera
    makeDefault
    position={[position.x, position.y, position.z]}
    lookAt.y={0.5}
    near={0.1}
    far={100000}
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
    >
      <Gizmo />
    </OrbitControls>
  </T.PerspectiveCamera>

  <!-- <T.DirectionalLight
    position.y={10000}
    position.z={10000}
    intensity={5}
    near={0.1}
    far={100000}
    castShadow
  /> -->
  <T.AmbientLight intensity={5} position.z={10000} position.x={10000} near={0.1} far={100000} />

  <!-- Textured Floor -->
  {#await Promise.all([floorBaseTexture]) then [baseMap]}
    <T.Mesh rotation.x={-Math.PI / 2} position.y={0} receiveShadow>
      <T.PlaneGeometry args={[10000, 10000]} />
      <T.MeshStandardMaterial map={baseMap} />
    </T.Mesh>
  {/await}

  <!-- Textured Back Wall -->
  {#await Promise.all([wallTexture]) then [wallTexture]}
    <T.Mesh rotation.x={0} position.y={0} position.z={-1000} receiveShadow>
      <T.PlaneGeometry args={[10000, 10000]} />
      <T.MeshStandardMaterial map={wallTexture} />
    </T.Mesh>
  {/await}

  <!-- Textured Left Wall -->
  {#await Promise.all([wallTexture]) then [wallTexture]}
    <T.Mesh rotation.y={Math.PI / 2} position={[-5000, 0, 0]} receiveShadow>
      <T.PlaneGeometry args={[10000, 10000]} />
      <T.MeshStandardMaterial map={wallTexture} />
    </T.Mesh>
  {/await}

  <!-- Textured Right Wall -->
  {#await Promise.all([wallTexture]) then [wallTexture]}
    <T.Mesh rotation.y={-Math.PI / 2} position={[5000, 0, 0]} receiveShadow>
      <T.PlaneGeometry args={[10000, 10000]} />
      <T.MeshStandardMaterial map={wallTexture} />
    </T.Mesh>
  {/await}

  <!-- <T.DirectionalLight position={[5000, 100, 5000]} intensity={1} /> -->

  {@render children?.()}
  <!-- <Environment isBackground={true} url={'/hdr/Aerodynamics Workshop 1k.hdr'} ground={true} /> -->
</div>
