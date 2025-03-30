<script lang="ts">
  import { Environment, Suspense } from '@threlte/extras'
  import type { Snippet } from 'svelte'

  interface IAerodynamics_Workshop {}

  let init = $state(false)
</script>

<!-- <div id="aerodynamics-workshop">
  {@render children?.()}
</div> -->
<Suspense>
  {#snippet fallback()}
    <div class="w-full h-full bg-black">loading...</div>
  {/snippet}
  <!-- <Environment url="/hdr/aerodynamics_workshop_1k.hdr" isBackground /> -->
</Suspense>
