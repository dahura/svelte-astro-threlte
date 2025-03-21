<script lang="ts">
  import { type Snippet } from 'svelte'
  import './Shelfs.scss'

  interface IShelfs {
    children?: Snippet
  }

  let { children }: IShelfs = $props()

  let init = $state(false)

  $effect(() => {
    init && console.log('init', init)
  })
</script>

<div id="shelfs">
  {@render children?.()}
</div>
