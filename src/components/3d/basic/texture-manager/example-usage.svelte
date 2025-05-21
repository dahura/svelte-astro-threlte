<script lang="ts">
  import { onMount } from 'svelte'
  import {
    textureManager,
    useTexture,
    type TextureTransformOptions,
    type TextureInfo
  } from './texture-manager'
  import * as THREE from 'three'
  import { T } from '@threlte/core'

  // Примеры опций для трансформации текстур
  const woodOptions: TextureTransformOptions = {
    wrapS: THREE.RepeatWrapping,
    wrapT: THREE.RepeatWrapping,
    repeat: [2, 2]
  }

  const metalOptions: TextureTransformOptions = {
    wrapS: THREE.RepeatWrapping,
    wrapT: THREE.RepeatWrapping
  }

  // Загрузка текстур
  let woodTexture: THREE.Texture
  let metalTexture: THREE.Texture

  onMount(async () => {
    // Предварительно загрузить все доступные текстуры
    await textureManager.preloadAllTextures()

    // Загрузить конкретные текстуры с трансформацией
    woodTexture = await useTexture('woodenLight', woodOptions)
    metalTexture = await useTexture('metalWhite', metalOptions)

    // Установка текущей текстуры
    textureManager.setTexture('woodenLight')
  })

  // Функция для изменения текстуры
  function changeTexture(textureName: string) {
    textureManager.setTexture(textureName as any)
  }

  // Подписываемся на store текущей текстуры
  let currentTextureInfo: TextureInfo | undefined
  textureManager.currentTextureInfo.subscribe((value) => {
    currentTextureInfo = value
  })
</script>

<div class="texture-manager-example">
  <h2>Texture Manager Example</h2>

  <div class="texture-controls">
    <h3>Current Texture: {currentTextureInfo?.label || 'None'}</h3>

    <div class="texture-buttons">
      <button on:click={() => changeTexture('wooden-light')}>Wooden Light</button>
      <button on:click={() => changeTexture('wooden-dark')}>Wooden Dark</button>
      <button on:click={() => changeTexture('metal-white')}>Metal White</button>
      <button on:click={() => changeTexture('metal-white-2')}>Metal White 2</button>
    </div>
  </div>

  <div class="texture-preview">
    <!-- 3D-превью объектов с текстурами -->
    <div class="threlte-container">
      <!-- Здесь можно использовать компоненты Threlte для 3D-превью -->
      {#if woodTexture && metalTexture}
        <!-- Пример простого объекта с текущей текстурой -->
        <T.Mesh>
          <T.BoxGeometry args={[1, 1, 1]} />
          <T.MeshStandardMaterial map={textureManager.getCurrentTexture() || undefined} />
        </T.Mesh>
      {/if}
    </div>
  </div>
</div>

<style>
  .texture-manager-example {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .texture-controls {
    margin-bottom: 20px;
  }

  .texture-buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .texture-buttons button {
    padding: 8px 16px;
    background-color: #4a5568;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .texture-buttons button:hover {
    background-color: #2d3748;
  }

  .texture-preview {
    width: 100%;
    height: 300px;
    background-color: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .threlte-container {
    width: 100%;
    height: 100%;
  }
</style>
