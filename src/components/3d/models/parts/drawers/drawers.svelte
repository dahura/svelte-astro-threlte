<script lang="ts">
  import { type Snippet } from 'svelte'
  import './Drawers.scss'

  interface IDrawers {
    children?: Snippet
  }

  let { children }: IDrawers = $props()

  let init = $state(false)

  $effect(() => {
    init && console.log('init', init)
  })
</script>

<div id="drawers">
  {@render children?.()}
</div>
