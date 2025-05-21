<script lang="ts">
  import { modelTextureStore, type TextureName, setTexture } from '$/stores/redactor/texture-store'
  import { TEXTURES } from '$/shared/constants/textures'
  let hoveredTexture: TextureName | null = null
  let preloadingComplete = true

  const textureStore = modelTextureStore.$get
</script>

<div class="bg-white/90 rounded-lg p-4 shadow-md w-[280px]">
  <h3 class="mb-3 text-base font-semibold">Текстуры</h3>

  {#if preloadingComplete}
    <div class="grid grid-cols-3 gap-3">
      {#each $textureStore.availableTextures as textureName}
        <div
          class="relative w-20 h-20 overflow-hidden transition-all duration-200 bg-center bg-cover rounded-md shadow-sm cursor-pointer hover:scale-105 hover:shadow-md"
          class:border-2={$textureStore.currentTexture.name === TEXTURES[textureName].name}
          class:border-blue-500={$textureStore.currentTexture.name === TEXTURES[textureName].name}
          onmouseenter={() => (hoveredTexture = TEXTURES[textureName].name as TextureName)}
          onmouseleave={() => (hoveredTexture = null)}
          onclick={() => setTexture(textureName)}
          onkeydown={(e) => e.key === 'Enter' && setTexture(textureName)}
          role="button"
          tabindex="0"
          style={`background-image: url(${TEXTURES[textureName].path})`}
        >
          {#if hoveredTexture === TEXTURES[textureName].name || $textureStore.currentTexture.name === TEXTURES[textureName].name}
            <div
              class="absolute bottom-0 left-0 right-0 p-1 text-xs text-center text-white bg-black/70"
            >
              {textureName}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <div class="flex justify-center items-center h-[100px] italic text-gray-600">
      Загрузка текстур...
    </div>
  {/if}
</div>
