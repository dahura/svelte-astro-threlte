<script lang="ts">
  import { T } from '@threlte/core'
  export let width = 1
  export let height = 2
  export let depth = 1
</script>

<T.BoxGeometry args={[width, height, depth]} />
