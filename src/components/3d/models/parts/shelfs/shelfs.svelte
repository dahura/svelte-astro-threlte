<script lang="ts">
  import { type Snippet } from 'svelte'
  import './Shelfs.scss'

  interface IShelfs {
    children?: Snippet
  }

  let { children }: IShelfs = $props()

  let init = $state(false)
</script>

<div id="shelfs">
  {@render children?.()}
</div>
