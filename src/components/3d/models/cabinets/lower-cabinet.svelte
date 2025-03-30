<script lang="ts">
  import { type Snippet } from 'svelte'
  import './Lower-Cabinet.scss'

  interface ILowerCabinet {
    children?: Snippet
  }

  let { children }: ILowerCabinet = $props()

  let init = $state(false)
</script>

<div id="lower-cabinet">
  {@render children?.()}
</div>
