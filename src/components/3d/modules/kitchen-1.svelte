<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, GLTF, OrbitControls } from '@threlte/extras'
  import { interactivity } from '@threlte/extras'
  import * as THREE from 'three'

  interactivity()

  let kitchenModel: THREE.Group

  // Store the state of cabinets
  let cabinetStates = $state({})

  // Handle model load
  function onModelLoad(gltf) {
    kitchenModel = gltf.scene
    // Log all interactive objects to find cabinet names
  }

  // Handle click on cabinet
  function handleCabinetClick(e) {
    // Stop event propagation
    e.stopPropagation()

    const cabinetName = e.object.name

    // Toggle cabinet state
    cabinetStates[cabinetName] = !cabinetStates[cabinetName]

    // Find the animation for this cabinet
    const mixer = new THREE.AnimationMixer(kitchenModel)
    const clips = kitchenModel.animations

    const cabinetClip = clips.find((clip) => clip.name.includes(cabinetName))
    if (cabinetClip) {
      const action = mixer.clipAction(cabinetClip)
      if (cabinetStates[cabinetName]) {
        action.play() // Open
      } else {
        action.reverse() // Close
      }
    }
  }
</script>

<Environment url="/models/kitchen-1/textures/kaff_baseColor.jpeg" />
<Environment url="/models/kitchen-1/textures/jeloye_fer_baseColor.jpeg" />

<T.PerspectiveCamera makeDefault position={[5, 2, 5]} fov={25}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.AmbientLight />

<GLTF
  url="/models/kitchen-1/scene.gltf"
  on:load={onModelLoad}
  interactive
  onclick={handleCabinetClick}
/>
