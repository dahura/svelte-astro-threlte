<script lang="ts">
  import type { GenericModel } from '../../types'
  import { T } from '@threlte/core'

  export let model: GenericModel
</script>

{#if model.dimensions.plinthHeight}
  <T.Mesh position={[0, -model.dimensions.height / 2 - model.dimensions.plinthHeight / 2, 0]}>
    <T.BoxGeometry
      args={[model.dimensions.width, model.dimensions.plinthHeight, model.dimensions.depth * 0.8]}
    />
    <T.MeshStandardMaterial color={model.material.carcassColor} />
  </T.Mesh>
{/if}
