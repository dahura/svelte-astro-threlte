<script lang="ts">
  import type { GenericModel } from '../../types'
  import { T } from '@threlte/core'
  import * as THREE from 'three'
  import { Doors } from '../index'
  import { Shelfs } from '../index'

  interface Props {
    model: GenericModel
    woodMap: THREE.Texture
    texture_color?: THREE.ColorRepresentation
  }

  const { model, woodMap, texture_color = 0x777777 }: Props = $props()

  // Константы для размеров (в миллиметрах)
  const SIDE_WALL_THICKNESS = 16
  const BACK_WALL_THICKNESS = 4
  const FLOOR_THICKNESS = 19
  const SHELF_THICKNESS = 16

  // Размеры с изображения (перевод из см в мм)
  const BASE_WIDTH = 800 // 80 см в мм
  const BASE_DEPTH = 900 // 90 см в мм
  const CABINET_HEIGHT = 573 // высота корпуса в мм (со скриншота)
  const TOTAL_HEIGHT = 573 + 141 // общая высота с верхним элементом

  // В разделе со скриптами, рядом с другими константами
  // Добавляем четкое определение размеров дна
  const BOTTOM_THICKNESS = FLOOR_THICKNESS

  // Определение точек углов для L-образной фигуры
  const cornerPoints = [
    { x: 0, y: BASE_DEPTH / 2 }, // Правая передняя точка (0)
    { x: BASE_WIDTH / 2, y: BASE_DEPTH / 2 }, // Правый верхний угол (1)
    { x: BASE_WIDTH / 2, y: -BASE_DEPTH / 2 }, // Правый нижний угол (2)
    { x: -BASE_WIDTH / 2, y: -BASE_DEPTH / 2 }, // Левый нижний угол (3)
    { x: -BASE_WIDTH / 2, y: 0 }, // Средняя левой стороны (4)
    { x: 0, y: BASE_DEPTH / 2 } // Диагональный срез (5)
  ]

  const bottomPoints = [
    { x: cornerPoints[3].x, y: cornerPoints[3].y }, // Левый нижний угол (3)
    { x: cornerPoints[2].x, y: cornerPoints[2].y }, // Правый нижний угол (2)
    { x: cornerPoints[1].x, y: cornerPoints[1].y }, // Правый верхний угол (1)
    { x: cornerPoints[0].x, y: cornerPoints[0].y }, // Правая передняя точка (0)
    { x: cornerPoints[4].x, y: cornerPoints[4].y }, // Средняя левой стороны (4)
    { x: cornerPoints[3].x, y: cornerPoints[3].y } // Замыкание на левом нижнем углу (3)
  ]

  // Улучшенная функция для создания стенки по двум точкам
  function createWall(
    point1: { x: number; y: number },
    point2: { x: number; y: number },
    thickness: number,
    height: number
  ) {
    // Вычисляем длину стенки
    const length = Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))

    // Вычисляем угол наклона стенки
    const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x)

    // Создаем геометрию стенки
    const geometry = new THREE.BoxGeometry(length, height, thickness)

    // Вычисляем центральную позицию стенки с учетом толщины стенки и смещения
    const centerX = (point1.x + point2.x) / 2
    const centerY = (point1.y + point2.y) / 2

    // Немного корректируем положение центра стенки, чтобы учесть толщину
    // Это смещение нужно для правильного соединения стенок в углах
    const offsetX = (Math.sin(angle) * thickness) / 2
    const offsetY = (-Math.cos(angle) * thickness) / 2

    return {
      geometry,
      position: [centerX + offsetX, 0, centerY + offsetY],
      rotation: [0, -angle, 0]
    }
  }

  // Функция создания полки по заданным размерам
  function createShelf(width: number, depth: number, thickness: number) {
    // Создаем пять точек полки на основе cornerPoints, но с учетом размеров
    const scaledWidth = width - SIDE_WALL_THICKNESS * 2
    const scaledDepth = depth - SIDE_WALL_THICKNESS * 2

    const shelfPoints = [
      { x: scaledWidth / 4, y: scaledDepth / 2 },
      { x: scaledWidth / 2, y: scaledDepth / 2 },
      { x: scaledWidth / 2, y: -scaledDepth / 2 },
      { x: -scaledWidth / 2, y: -scaledDepth / 2 },
      { x: -scaledWidth / 2, y: 0 },
      { x: 0, y: scaledDepth / 2 }
    ]

    // Создаем форму полки
    const shape = new THREE.Shape()

    shape.moveTo(shelfPoints[0].x, shelfPoints[0].y)
    shape.lineTo(shelfPoints[1].x, shelfPoints[1].y)
    shape.lineTo(shelfPoints[2].x, shelfPoints[2].y)
    shape.lineTo(shelfPoints[3].x, shelfPoints[3].y)
    shape.lineTo(shelfPoints[4].x, shelfPoints[4].y)
    shape.lineTo(shelfPoints[5].x, shelfPoints[5].y)
    shape.closePath()

    const extrudeSettings = {
      steps: 1,
      depth: thickness,
      bevelEnabled: false
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }

  // Исправленные определения стенок с учетом соединения в углах
  // Правая передняя стенка - уточняем размер
  const wall1 = createWall(cornerPoints[0], cornerPoints[1], SIDE_WALL_THICKNESS, CABINET_HEIGHT)

  // Правая боковая стенка
  const wall2 = createWall(cornerPoints[1], cornerPoints[2], SIDE_WALL_THICKNESS, CABINET_HEIGHT)

  // Задняя стенка
  const wall3 = createWall(cornerPoints[2], cornerPoints[3], SIDE_WALL_THICKNESS, CABINET_HEIGHT)

  // Левая боковая стенка
  const wall4 = createWall(cornerPoints[3], cornerPoints[4], SIDE_WALL_THICKNESS, CABINET_HEIGHT)

  // Исправляем диагональную стенку с нужным углом
  const wall5 = createWall(cornerPoints[4], cornerPoints[5], SIDE_WALL_THICKNESS, CABINET_HEIGHT)
  const bottomWall = createWall(cornerPoints[5], cornerPoints[0], BASE_WIDTH, SIDE_WALL_THICKNESS)

  // Создаем полки
  const shelfGeometry = createShelf(BASE_WIDTH, BASE_DEPTH, SHELF_THICKNESS)

  // Добавим функцию для создания дна с использованием геометрии THREE.PlaneGeometry
  function createPolygonalBottom() {
    // Создаем сцену для работы с формой
    const scene = new THREE.Scene()

    // Создаем форму из bottomPoints
    const shape = new THREE.Shape()
    shape.moveTo(bottomPoints[0].x, bottomPoints[0].y)
    for (let i = 1; i < bottomPoints.length - 1; i++) {
      shape.lineTo(bottomPoints[i].x, bottomPoints[i].y)
    }
    shape.closePath()

    // Создаем меш с этой формой
    const geometry = new THREE.ShapeGeometry(shape)

    // Возвращаем готовую геометрию
    return geometry
  }

  // Создаем геометрию для дна
  const polygonalBottomGeometry = createPolygonalBottom()

  // Вычисляем высоту для каждой полки
  const shelfCount = model.shelves?.count ?? 2
  const shelfSpacing = CABINET_HEIGHT / (shelfCount + 1)
  const adjustedDrawerSizes = Array(shelfCount).fill(shelfSpacing)
  const gapHeight = shelfSpacing
</script>

<T.Group>
  <!-- Верхняя часть шкафа -->
  <T.Group position={[0, CABINET_HEIGHT, 0]}>
    <T.Mesh rotation={[Math.PI / 2, 0, 0]}>
      <T.ShapeGeometry
        args={[
          new THREE.Shape([
            new THREE.Vector2(bottomPoints[0].x, bottomPoints[0].y),
            new THREE.Vector2(bottomPoints[1].x, bottomPoints[1].y),
            new THREE.Vector2(bottomPoints[2].x, bottomPoints[2].y),
            new THREE.Vector2(bottomPoints[3].x, bottomPoints[3].y),
            new THREE.Vector2(bottomPoints[4].x, bottomPoints[4].y)
          ])
        ]}
      />
      <T.MeshStandardMaterial
        map={woodMap}
        color={texture_color}
        roughness={0.7}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </T.Mesh>
  </T.Group>

  <!-- 5 независимых стенок с исправленным позиционированием -->
  <T.Mesh
    position={[wall1.position[0], wall1.position[1] + CABINET_HEIGHT / 2, wall1.position[2]]}
    rotation={[wall1.rotation[0], wall1.rotation[1], wall1.rotation[2]]}
  >
    <T.BoxGeometry args={[wall1.geometry.parameters.width, CABINET_HEIGHT, SIDE_WALL_THICKNESS]} />
    <T.MeshStandardMaterial map={woodMap} color={texture_color} roughness={0.7} metalness={0.05} />
  </T.Mesh>

  <T.Mesh
    position={[wall2.position[0], wall2.position[1] + CABINET_HEIGHT / 2, wall2.position[2]]}
    rotation={[wall2.rotation[0], wall2.rotation[1], wall2.rotation[2]]}
  >
    <T.BoxGeometry args={[wall2.geometry.parameters.width, CABINET_HEIGHT, SIDE_WALL_THICKNESS]} />
    <T.MeshStandardMaterial map={woodMap} color={texture_color} roughness={0.7} metalness={0.05} />
  </T.Mesh>

  <T.Mesh
    position={[wall3.position[0], wall3.position[1] + CABINET_HEIGHT / 2, wall3.position[2]]}
    rotation={[wall3.rotation[0], wall3.rotation[1], wall3.rotation[2]]}
  >
    <T.BoxGeometry args={[wall3.geometry.parameters.width, CABINET_HEIGHT, SIDE_WALL_THICKNESS]} />
    <T.MeshStandardMaterial map={woodMap} color={texture_color} roughness={0.7} metalness={0.05} />
  </T.Mesh>

  <T.Mesh
    position={[wall4.position[0], wall4.position[1] + CABINET_HEIGHT / 2, wall4.position[2]]}
    rotation={[wall4.rotation[0], wall4.rotation[1], wall4.rotation[2]]}
  >
    <T.BoxGeometry args={[wall4.geometry.parameters.width, CABINET_HEIGHT, SIDE_WALL_THICKNESS]} />
    <T.MeshStandardMaterial map={woodMap} color={texture_color} roughness={0.7} metalness={0.05} />
  </T.Mesh>

  <!-- Диагональная стенка заменяется компонентом Doors -->
  <T.Group
    position={[wall5.position[0], wall5.position[1] + CABINET_HEIGHT / 2, wall5.position[2]]}
    rotation={[wall5.rotation[0], wall5.rotation[1], wall5.rotation[2]]}
  >
    <Doors
      model={{
        type: 'upper',
        dimensions: {
          width: wall5.geometry.parameters.width, // Ширина двери равна длине wall5
          height: CABINET_HEIGHT, // Высота двери
          depth: SIDE_WALL_THICKNESS // Толщина двери
        },
        doors: { count: 1, type: 'lift-up' },
        material: {
          finish: 'wood-texture',
          facadeColor: typeof texture_color === 'string' ? texture_color : '#777777'
        }
      }}
      texture={woodMap}
      {texture_color}
    />
  </T.Group>

  <!-- Дно шкафа с правильным поворотом для горизонтального расположения -->
  <T.Group position={[0, 0, 0]}>
    <T.Mesh rotation={[Math.PI / 2, 0, 0]}>
      <T.ShapeGeometry
        args={[
          new THREE.Shape([
            new THREE.Vector2(bottomPoints[0].x, bottomPoints[0].y),
            new THREE.Vector2(bottomPoints[1].x, bottomPoints[1].y),
            new THREE.Vector2(bottomPoints[2].x, bottomPoints[2].y),
            new THREE.Vector2(bottomPoints[3].x, bottomPoints[3].y),
            new THREE.Vector2(bottomPoints[4].x, bottomPoints[4].y)
          ])
        ]}
      />
      <T.MeshStandardMaterial
        map={woodMap}
        color={texture_color}
        roughness={0.7}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </T.Mesh>
  </T.Group>

  <!-- Полки и двери рендерятся только если это не угловой шкаф -->
  {#if !model.corner?.isCorner}
    <!-- Полки -->
    {#each Array(shelfCount) as _, i}
      <Shelfs
        {model}
        {i}
        {adjustedDrawerSizes}
        {gapHeight}
        texture={woodMap}
        {texture_color}
        {SHELF_THICKNESS}
      />
    {/each}

    <!-- Двери -->
    {#if model.doors}
      {#each Array(model.doors.count) as _, i}
        <Doors {model} texture={woodMap} {texture_color} />
      {/each}
    {/if}
  {/if}

  <!-- Оптимизированное освещение: только необходимые источники света -->
  <!-- Направленный свет для правой стороны (wall1 и wall2) -->
  <T.DirectionalLight
    position={[wall1.position[0] + 100, wall1.position[1] + 100, wall1.position[2] + 100]}
    intensity={1.0}
    color={0xffffff}
    castShadow={false}
  />

  <!-- Дополнительный свет для левой стороны -->
  <T.DirectionalLight
    position={[-BASE_WIDTH / 2, CABINET_HEIGHT / 2, BASE_DEPTH / 2]}
    intensity={0.8}
    color={0xffffff}
    castShadow={false}
  />
</T.Group>
