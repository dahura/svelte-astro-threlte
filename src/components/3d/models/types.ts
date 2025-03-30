type CabinetType = "lower" | "workspace" | "upper" | "attic" | "tall" | "filler"; // обновлены типы для соответствия группам шкафов


interface Dimensions {
    width: number;  // Ширина (20, 30, 40, 45, 50, 60, 80, 90, 100, 120 см)
    height: number;  // Высота корпуса (720, 792, 2016, 2088 мм и т. д.)
    depth: number;  // Глубина шкафа (561 мм по стандарту)
    plinthHeight?: number;  // Высота цоколя (70, 100, 150, 200 мм)
  }

  //Дверь
  interface DoorsConfig {
    count: number;  // Количество дверей (1, 2 и т. д.)
    type: "hinged" | "lift-up" | "sliding";  // Тип двери (распашная, подъемная, раздвижная)
    connectedFront?: boolean;  // Соединены ли двери одной панелью
    glassType?: "clear" | "frosted" | "none";  // Стекло в фасаде (прозрачное, матовое, без стекла)
  }

  //Ящик
  interface DrawersConfig {
    count: number;  // Количество ящиков (0, 1, 2, 3 и т. д.)
    sizes: number[];  // Массив размеров ящиков (высота каждого)
    withSoftClose: boolean;  // Есть ли доводчики
  }

//Полка
  interface ShelvesConfig {
    count: number;  // Количество полок
    adjustable: boolean;  // Регулируемые ли полки по высоте
    material: "wood" | "glass" | "metal";  // Материал полок
  }

  //Ручка
  interface HandlesConfig {
    modelId: string;  // Код модели ручки из каталога
    position: "top" | "bottom" | "side";  // Расположение ручки
    color?: string;  // Цвет ручки
  }

  //Материал
  interface MaterialConfig {
    carcassColor?: string;  // Цвет корпуса
    facadeColor?: string;  // Цвет фасада
    finish?: "matte" | "glossy" | "wood-texture";  // Тип отделки
  }

  //Специальные механизмы
  interface SpecialMechanismsConfig {
    softCloseHinges?: boolean;  // Наличие доводчиков для дверей
    pullOutSystem?: boolean;  // Выдвижные механизмы (например, карусель)
    hiddenStorage?: boolean;  // Скрытые секции или ниши
  }

  export interface GenericModelPosition {
    x: number;
    y: number;
    z: number;
  }

interface CornerCabinetConfig {
  angle: number;  // Угол шкафа (обычно 90 градусов)
  orientation: "left" | "right";  // Ориентация углового шкафа
  cornerType: "diagonal" | "L-shaped";  // Тип углового шкафа (диагональный или L-образный)
  cornerSpace: {
    leftWidth: number;  // Ширина левой стороны
    rightWidth: number;  // Ширина правой стороны
  };
  accessType: "full" | "partial";  // Тип доступа к углу (полный или частичный)
  cornerMechanism?: {
    type: "carousel" | "magic-corner" | "lemans" | "none";  // Тип углового механизма
    rotatable: boolean;  // Возможность вращения механизма
  };
}

// Обновляем основной интерфейс
export interface GenericModel {
  type: CabinetType;
  dimensions: Dimensions;
  cornerConfig?: CornerCabinetConfig;  // Добавляем конфигурацию для углового шкафа
  doors?: DoorsConfig;
  drawers?: DrawersConfig;
  shelves?: ShelvesConfig;
  handles?: HandlesConfig;
  material: MaterialConfig;
  specialMechanisms?: SpecialMechanismsConfig;
}
  
 
    
  


  
  
  

