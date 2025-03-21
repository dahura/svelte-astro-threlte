<script lang="ts">
  import { type Snippet } from 'svelte'
  import './Doors.scss'

  interface IDoors {
    children?: Snippet
  }

  let { children }: IDoors = $props()

  let init = $state(false)

  $effect(() => {
    init && console.log('init', init)
  })
</script>

<div id="doors">
  {@render children?.()}
</div>
