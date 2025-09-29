import { generateObject } from 'ai';
import { z } from 'zod';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
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
  }).optional(),
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
    model: openrouter.chat('openai/gpt-oss-120b:free'),
    system: `You are a kitchen design assistant. Based on the user's request, generate a detailed kitchen cabinet configuration object. The user will provide a description of the kitchen they want, and you need to return a JSON object with the appropriate cabinet configuration.

    The configuration should include:
    - type: The type of cabinet (lower, workspace, upper, attic, tall, filler)
    - dimensions: width, height, depth (in mm), and optional plinthHeight
    - corner: Configuration for corner cabinets if applicable
    - doors: Configuration for doors (count, type, etc.)
    - drawers: Configuration for drawers (count, sizes, soft-close)
    - shelves: Configuration for shelves (count, adjustability, material)
    - handles: Configuration for handles (modelId, position, color)
    - material: Configuration for materials (carcassColor, facadeColor, finish)
    - specialMechanisms: Special features like soft-close hinges, pull-out systems, etc.

    Make sure all dimensions are realistic and appropriate for kitchen furniture. Use standard kitchen cabinet dimensions and configurations.`,
    schema: z.object({
      cabinets: z.array(genericModelSchema),
    }),
    prompt,
  });
  return object.cabinets;
};