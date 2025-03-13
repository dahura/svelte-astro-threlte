<script lang="ts">
  import { T } from '@threlte/core'
  import type {
    UpperCabinet as UpperCabinetType,
    LowerCabinet as LowerCabinetType,
    CornerCabinet as CornerCabinetType,
    Model
  } from './types'
  import { CornerCabinet, UpperCabinet } from './models'
  export let cabinet: UpperCabinetType | LowerCabinetType | CornerCabinetType
</script>

{#if cabinet.type === 'upper'}
  <UpperCabinet {...cabinet} />
{:else if cabinet.type === 'lower'}
  <T.Box args={[cabinet.width, cabinet.height, cabinet.depth]}>
    {#if cabinet.doors}
      <T.MeshBasicMaterial color="brown" />
    {/if}
    {#if cabinet.legs}
      <T.MeshBasicMaterial color="gray" /> <!-- Ножки -->
    {/if}

    <!-- Другие элементы для нижнего шкафа -->
  </T.Box>
{:else if cabinet.type === 'corner'}
  <CornerCabinet {...cabinet} />
{/if}
