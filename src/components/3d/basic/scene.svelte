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
      minPolarAngle: 0,
      maxPolarAngle: Math.PI,
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

<div class="w-full h-full" id={sceneId}>
  <T.PerspectiveCamera makeDefault position={[position.x, position.y, position.z]} lookAt.y={0.5}>
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

  <T.DirectionalLight position.y={10} position.z={10} castShadow />
  <T.AmbientLight intensity={0.3} />

  <!-- Textured Floor -->
  {#await Promise.all([floorBaseTexture]) then [baseMap]}
    <T.Mesh rotation.x={-Math.PI / 2} position.y={0} receiveShadow>
      <T.PlaneGeometry args={[1000, 1000]} />
      <T.MeshStandardMaterial map={baseMap} />
    </T.Mesh>
  {/await}

  {@render children?.()}
  <!-- <Environment isBackground={true} url={'/hdr/Aerodynamics Workshop 1k.hdr'} ground={true} /> -->
</div>
