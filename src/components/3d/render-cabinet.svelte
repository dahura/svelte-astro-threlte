<script lang="ts">
  import { T } from '@threlte/core'
  import type {
    UpperCabinet as UpperCabinetType,
    LowerCabinet as LowerCabinetType,
    CornerCabinet as CornerCabinetType,
    Model,
    BaseCabinet
  } from './types'
  import { CornerCabinet, UpperCabinet, DrawerCabinet } from './models'
  export let cabinet: UpperCabinetType | LowerCabinetType | CornerCabinetType | BaseCabinet
</script>

{#if cabinet.type === 'upper'}
  <!-- <UpperCabinet {...cabinet} /> -->
  <DrawerCabinet {...cabinet} />
{:else if cabinet.type === 'lower'}
  <!-- Logic for lower cabinet -->
{:else if cabinet.type === 'corner'}
  <!-- Logic for corner cabinet -->
{/if}
