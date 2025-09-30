<script lang="ts">
  import type { GenericModel } from '../../types'
  import { T } from '@threlte/core'
  import * as THREE from 'three'

  interface Props {
    model: GenericModel
    i: number
    adjustedDrawerSizes: number[]
    gapHeight: number
    texture: THREE.Texture
    texture_color: THREE.ColorRepresentation
    SHELF_THICKNESS: number
  }

  const {
    model,
    i,
    adjustedDrawerSizes,
    gapHeight,
    texture,
    texture_color,
    SHELF_THICKNESS
  }: Props = $props()

  // Полностью переработанная функция для правильного позиционирования полок
  function getShelfPosition(index: number): number {
    // Начинаем с нижней части шкафа
    let position = -model.dimensions.height / 2
    let shelfPosition = position

    // Проходим по всем элементам до индекса i
    let shelfCount = 0
    let drawerCount = 0

    for (let j = 0; j < adjustedDrawerSizes.length; j++) {
      const isDrawer = adjustedDrawerSizes[j] > 0

      // Если это полка, а не ящик, и мы достигли нужного индекса полки
      if (!isDrawer) {
        if (shelfCount === index) {
          // Установим позицию полки после всех предыдущих элементов
          shelfPosition = position + gapHeight / 2
          break
        }
        shelfCount++
        position += gapHeight
      } else {
        // Если это ящик
        if (drawerCount > 0 && shelfCount === index) {
          // Если мы уже прошли хотя бы один ящик и это нужная полка,
          // разместим её между текущим и предыдущим ящиком
          shelfPosition = position - SHELF_THICKNESS / 2
          break
        }
        position += adjustedDrawerSizes[j]
        drawerCount++
      }
    }

    return shelfPosition
  }
</script>

<T.Mesh position={[0, getShelfPosition(i), 0]}>
  <T.BoxGeometry args={[model.dimensions.width - 4, SHELF_THICKNESS, model.dimensions.depth]} />
  <T.MeshStandardMaterial
    map={texture}
    color={new THREE.Color(texture_color)}
    roughness={0.7}
    metalness={0.05}
  />
</T.Mesh>
