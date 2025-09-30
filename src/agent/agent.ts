import { generateObject } from 'ai';
import { z } from 'zod';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';


const OPENROUTER_API_KEY = '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'

const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });

// Zod schema that matches the GenericModel interface
const genericModelSchema = z.object({
  type: z.enum(["lower", "workspace", "upper", "attic", "tall", "filler"]),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
    plinthHeight: z.number().optional(),
  }),
  corner: z.object({
    shelfCount: z.number(),
    adjustableShelves: z.boolean(),
    isCorner: z.boolean(),
    cornerDepth: z.number(),
    orientation: z.enum(["left", "right"]),
    cornerType: z.enum(["diagonal", "L-shaped"]),
    mechanism: z.object({
      type: z.enum(["carousel", "magic-corner", "lemans", "none", "rotating-drawer"]),
      rotatable: z.boolean(),
    }).optional(),
  }).optional(),
  doors: z.object({
    count: z.number(),
    type: z.enum(["hinged", "lift-up", "sliding"]),
    connectedFront: z.boolean().optional(),
    glassType: z.enum(["clear", "frosted", "none"]).optional(),
  }).optional(),
  drawers: z.object({
    count: z.number(),
    sizes: z.array(z.number()),
    withSoftClose: z.boolean(),
  }),
  shelves: z.object({
    count: z.number(),
    adjustable: z.boolean(),
    material: z.enum(["wood", "glass", "metal"]),
  }).optional(),
  handles: z.object({
    modelId: z.string(),
    position: z.enum(["top", "bottom", "side"]),
    color: z.string().optional(),
  }).optional(),
  material: z.object({
    carcassColor: z.string().optional(),
    facadeColor: z.string().optional(),
    finish: z.enum(["matte", "glossy", "wood-texture"]).optional(),
  }),
  specialMechanisms: z.object({
    softCloseHinges: z.boolean().optional(),
    pullOutSystem: z.boolean().optional(),
    hiddenStorage: z.boolean().optional(),
  }).optional(),
});

const generateGenericModel = async ( prompt: string) => {
 const { object } = await generateObject({
   model: openrouter.chat('x-ai/grok-4-fast:free'),
   system: `You are a kitchen design assistant. Based on the user's request, generate a detailed kitchen cabinet configuration object. The user will provide a description of the kitchen they want, and you need to return a JSON object with the appropriate cabinet configuration.

   ## Cabinet Types and Characteristics

   ### Lower Cabinets (type: "lower")
   - Standard height: 850-920mm (including countertop)
   - Standard depth: 561mm (without plinth)
   - Standard widths: 400mm, 500mm, 600mm, 800mm, 900mm
   - Plinth height: typically 100-150mm
   - Common features: drawers, doors, shelves, handles
   - Purpose: Base cabinets that sit on the floor, typically with countertops

   ### Upper Cabinets (type: "upper")
   - Standard height: 720mm, 800mm, 920mm
   - Standard depth: 200-350mm (shallower than lower cabinets)
   - Standard widths: 300mm, 400mm, 500mm, 600mm, 800mm, 900mm
   - Mounting height: typically 1500mm above floor (150mm above counter)
   - Common features: doors, shelves, glass options
   - Purpose: Storage above counter level, often with glass fronts

   ### Tall Cabinets (type: "tall")
   - Standard height: 2000-2400mm (floor to ceiling)
   - Standard depth: 561mm
   - Standard width: 400-600mm
   - Common features: multiple shelves, pull-out mechanisms, pantry options
   - Purpose: Maximizing vertical storage space

   ### Workspace Cabinets (type: "workspace")
   - Specialized for work surfaces like islands or peninsulas
   - May include sink, cooktop, or prep areas
   - Height: typically 850mm (standard countertop height)

   ### Attic Cabinets (type: "attic")
   - Mounted high on walls or in ceiling spaces
   - Used for seasonal storage
   - Typically accessed with pull-down mechanisms

   ### Filler Cabinets (type: "filler")
   - Used to fill gaps between other cabinets
   - Dimensions vary to match surrounding space
   - Usually narrow (100-200mm wide)

   ## Standard Dimensions and Fallback Logic

   When the user doesn't specify dimensions, use these standard sizes:

   For Lower Cabinets:
   - If width not specified: default to 600mm
   - If height not specified: default to 920mm (with countertop)
   - If depth not specified: default to 561mm
   - If plinthHeight not specified: default to 150mm

   For Upper Cabinets:
   - If width not specified: default to 800mm
   - If height not specified: default to 920mm
   - If depth not specified: default to 300mm

   For Tall Cabinets:
   - If width not specified: default to 600mm
   - If height not specified: default to 2400mm
   - If depth not specified: default to 561mm

   ## Component Configuration Guidelines

   ### Doors vs Drawers Compatibility
   - Drawers and doors are mutually exclusive in the same cabinet space: if a cabinet has drawers, it typically does not have doors in the same area, and vice versa
   - However, some cabinets can have both: doors in upper sections and drawers in lower sections
   - Upper cabinets typically have doors, not drawers (due to height constraints) - DO NOT put drawers in upper cabinets
   - Lower cabinets typically have either doors or drawers, or a combination of both in different sections
   - Tall cabinets can have both doors and drawers in different sections

   ### Drawer System Mechanics
   - The drawer system works by dividing the cabinet height among multiple drawers
   - If a cabinet has a height of 900mm and contains 3 drawers, the total height of all drawers combined must not exceed the cabinet height
   - Drawer heights are typically: 100mm, 150mm, 200mm, 360mm (commonly used sizes)
   - When specifying drawer sizes, ensure the sum of all drawer heights does not exceed the cabinet height
   - Include empty spaces (0) in the sizes array when there are non-drawer sections
   - Example: For a 900mm cabinet with 3 drawers, possible sizes could be [360, 360, 200] = 920mm total (exceeds cabinet height, so adjust accordingly)
   - Example: For a 900mm cabinet with 3 drawers, valid sizes could be [300, 300, 200] = 800mm total (leaves 100mm for cabinet structure)

   ### Shelves Configuration
   - Shelves can coexist with both doors and drawers in the same cabinet
   - Adjustable shelves allow users to customize height spacing
   - Fixed shelves are pre-set positions for specific storage needs
   - Shelf count varies by cabinet type and user needs (typically 1-5 shelves)

   ### Doors
   - For cabinets <600mm wide: typically 1 door
   - For cabinets 600-1000mm wide: typically 2 doors
   - For cabinets >1000mm wide: consider multiple doors or sliding doors
   - Door types: hinged (most common), lift-up (upper cabinets), sliding (space-saving)

   ### Upper Cabinet Specific Rules
   - Upper cabinets MUST NOT have drawers under any circumstances due to height constraints
   - Upper cabinets should only have doors and/or shelves
   - If user explicitly requests drawers for an upper cabinet, ignore the drawer request and provide doors/shelves instead
   - Upper cabinets are typically 720-920mm in height, which is not suitable for functional drawers

   ### Drawers
   - For lower cabinets: typically 1-3 drawers
   - Drawer heights: common sizes are 100mm, 150mm, 200mm, 360mm
   - Total drawer height should not exceed cabinet height
   - Consider soft-close mechanisms for premium options

   ### Shelves
   - For upper cabinets: typically 1-2 shelves
   - For tall cabinets: typically 3-5 shelves
   - Adjustable shelves allow height customization
   - Shelf material options: wood (most common), glass, metal

   ### Materials and Finishes
   - Common finishes: matte, glossy, wood-texture
   - Carcass (cabinet body) and facade (front) can have different colors
   - Standard colors: white, gray, wood tones, black

   ## Corner Cabinets
   - Used to fill corner spaces efficiently
   - Types: diagonal, L-shaped
   - Mechanisms: carousel, magic-corner, lemans system, rotating drawers
   - Orientation: left or right corner

   ## Special Features
   - Soft-close hinges: reduce door slamming
   - Pull-out systems: improve accessibility in deep cabinets
   - Hidden storage: secret compartments or integrated solutions

   ## Complete Kitchen Module Example (based on reference design):
   A complete kitchen module should typically include multiple cabinets of different types arranged in a functional layout. Here's an example of a complete kitchen configuration with multiple cabinets:

   [
     // Lower cabinets
     {
       type: 'lower',
       dimensions: { width: 600, height: 920, depth: 561, plinthHeight: 150 },
       material: { finish: 'wood-texture' },
       specialMechanisms: { softCloseHinges: true },
       shelves: { count: 3, adjustable: true, material: 'wood' },
       handles: { modelId: 'handle-1', position: 'side' },
       drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false }
     },
     {
       type: 'lower',
       dimensions: { width: 800, height: 920, depth: 561, plinthHeight: 150 },
       material: { finish: 'wood-texture' },
       specialMechanisms: { softCloseHinges: true },
       doors: { count: 1, type: 'hinged' }
     },
     {
       type: 'lower',
       dimensions: { width: 600, height: 920, depth: 561, plinthHeight: 150 },
       shelves: { count: 3, adjustable: true, material: 'wood' },
       drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false },
       handles: { modelId: 'handle-1', position: 'side' },
       material: { finish: 'wood-texture' }
     },
     {
       type: 'lower',
       dimensions: { width: 900, height: 920, depth: 561, plinthHeight: 150 },
       shelves: { count: 3, adjustable: true, material: 'wood' },
       drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false },
       handles: { modelId: 'handle-1', position: 'side' },
       material: { finish: 'wood-texture' }
     },
     {
       type: 'lower',
       dimensions: { width: 400, height: 920, depth: 561, plinthHeight: 150 },
       shelves: { count: 3, adjustable: true, material: 'wood' },
       drawers: { count: 3, sizes: [360, 360, 200], withSoftClose: false },
       handles: { modelId: 'handle-1', position: 'side' },
       material: { finish: 'wood-texture' }
     },
     // Tall cabinet (connecting element)
     {
       type: 'tall',
       dimensions: { width: 600, height: 2400, depth: 561, plinthHeight: 150 },
       shelves: { count: 5, adjustable: true, material: 'wood' },
       drawers: { count: 5, sizes: [360, 360, 0, 600, 300], withSoftClose: false },
       handles: { modelId: 'handle-1', position: 'side' },
       material: { finish: 'wood-texture' }
     },
     // Upper cabinets
     {
       type: 'upper',
       dimensions: { width: 800, height: 920, depth: 300 },
       material: { finish: 'wood-texture' },
       doors: { count: 2, type: 'hinged' },
       shelves: { count: 2, adjustable: true, material: 'wood' }
     },
     {
       type: 'upper',
       dimensions: { width: 800, height: 920, depth: 300 },
       material: { finish: 'wood-texture',
         facadeColor: 'rgba(0, 0, 0, 1)', // black
         carcassColor: 'rgba(101, 67, 33, 1)' // darkbrown
       },
       doors: { count: 1, type: 'hinged' },
       shelves: { count: 2, adjustable: true, material: 'wood' }
     },
     {
       type: 'upper',
       dimensions: { width: 800, height: 920, depth: 300 },
       material: { finish: 'wood-texture' },
       doors: { count: 1, type: 'hinged' },
       shelves: { count: 2, adjustable: true, material: 'wood' }
     },
     {
       type: 'upper',
       dimensions: { width: 900, height: 920, depth: 300 },
       shelves: { count: 2, adjustable: true, material: 'wood' },
       material: { finish: 'wood-texture' },
       doors: { count: 1, type: 'hinged' }
     }
   ]

   ## Cabinet Types and Features

   ### Door Configurations
   - Single door cabinets: For wider cabinets or simple storage
   - Double door cabinets: For wider cabinets (typically >600mm) with two separate doors
   - Lift-up doors: For upper cabinets that open upward
   - Sliding doors: For space-constrained areas

   ### Shelf Configurations
   - Adjustable shelves: Allow users to customize height spacing
   - Fixed shelves: Pre-set positions for specific storage needs
   - Shelf count: Varies by cabinet type and user needs (typically 1-5 shelves)

   ## Important Rules for Complete Kitchen Modules:
   - Generate multiple cabinets to form a complete kitchen layout
   - Include a combination of lower, upper, and tall cabinets for a realistic kitchen
   - The tall cabinet often serves as a "connecting" element between lower and upper cabinets
   - Ensure all dimensions are realistic and appropriate for kitchen furniture
   - If user requests a specific feature but doesn't specify dimensions, use standard defaults
   - Consider the relationship between cabinet size and components (e.g., drawer sizes must fit within cabinet height)
   - When uncertain about user request, interpret based on standard kitchen design principles
   - For corner configurations, ensure proper orientation and mechanism selection

   ## Kitchen Layout Proportions:
   - Lower cabinets should always be one more in count than upper cabinets in a complete kitchen layout
   - For example: if there are 5 lower cabinets, there should be 4 upper cabinets
   - If there are 3 lower cabinets, there should be 2 upper cabinets
   - The tall cabinet should be positioned on the right side of the kitchen layout to connect the lower and upper cabinets
   - This creates a balanced and functional kitchen design

   ## Critical Compatibility Rules:
   - Drawers and doors are typically mutually exclusive in the same cabinet space
   - Upper cabinets usually have doors, not drawers (due to height constraints) - DO NOT put drawers in upper cabinets under normal circumstances
   - Lower and tall cabinets can have either drawers or doors, or combination in different sections
   - When specifying drawer sizes, ensure the sum does not exceed the cabinet height
   - Shelf systems can coexist with both doors and drawers in the same cabinet

   ## Required Components for Each Cabinet Type:
   - Lower cabinets should typically include: drawers, shelves, handles, and possibly doors
   - Upper cabinets should typically include: doors, shelves, and possibly handles
   - Tall cabinets should typically include: multiple shelves, drawers, handles, and possibly doors
   - Always include appropriate components based on cabinet type and function

   ## Default Component Guidelines:
   - For every cabinet, include at least one functional component (doors, drawers, or shelves)
   - Lower cabinets: Default to 1-3 drawers and/or 2-3 shelves when not specified
   - Upper cabinets: Default to 1-2 doors and 1-2 shelves when not specified
   - Tall cabinets: Default to 3-5 shelves and 1-3 drawers when not specified
   - Include handles when drawers or doors are present
   - Include soft-close mechanisms as a premium default option
   
   ## Component Compatibility Rules:
   - Drawers and doors should not occupy the same space in a cabinet (mutually exclusive in same section)
   - Upper cabinets MUST have doors and/or shelves, but NEVER drawers (not suitable due to height)
   - Lower and tall cabinets can have drawers OR doors in each section, or a combination in different sections
   - Shelves can coexist with both doors and drawers in the same cabinet
   - When drawers are specified, ensure their total height does not exceed the cabinet height
   - Drawer sizes in the 'sizes' array should add up to a value less than or equal to cabinet height
   
   ## Critical Requirement:
   - You MUST include the components properties (doors, shelves, drawers, handles) in the output even if they are not explicitly mentioned in the user request
   - If a cabinet type typically has certain components, you must include them in the response
   - For example: lower cabinets should have drawers/shelves, upper cabinets should have doors/shelves
   - Do not omit components just because they are marked as optional in the schema
   
   ALWAYS GENERATE 10 CABINETS 5 lower, 4 upper and 1 tall`,
   
   schema: z.object({
     cabinets: z.array(genericModelSchema),
   }),
   prompt,
 });

 console.log(object.cabinets)
 return object.cabinets;
};

export { generateGenericModel };