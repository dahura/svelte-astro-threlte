<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "$lib/components/ui/accordion";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Card, CardContent } from "$lib/components/ui/card";
  import { Settings, Plus, Minus } from "lucide-svelte";
  import { Canvas } from "@threlte/core";
  import Scene from "./scene.svelte";

  let rotate = $state(true);

  const dimensions = $state({
    width: 2,
    height: 2,
    depth: 2,
  });
  const STEP = 0.1;

  type Property = keyof typeof dimensions;

  const clampValue = (value: number) =>
    Math.max(0.1, Math.min(5, Math.round(value * 10) / 10));

  const adjustDimension = (property: Property, delta: number) =>
    (dimensions[property] = clampValue(dimensions[property] + delta));

  const increment = (property: Property) => adjustDimension(property, STEP);
  const decrement = (property: Property) => adjustDimension(property, -STEP);

  const handleInputChange = (e: Event, property: Property) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    if (!isNaN(value)) dimensions[property] = clampValue(value);
  };

  const preventNonNumericInput = (e: KeyboardEvent) => {
    if (!/[0-9.]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
  };
</script>

<div class="flex flex-row h-screen bg-background text-foreground">
  <div class="relative flex-1">
    <Canvas>
      <Scene {...dimensions} {rotate} />
    </Canvas>
  </div>
  <div class="px-4 py-6 border-l w-80 border-border bg-card">
    <div class="flex items-center mb-4">
      <Settings class="w-5 h-5 mr-2" />
      <h2 class="text-xl font-semibold">Box Controls</h2>
    </div>

    <Accordion class="w-full">
      <AccordionItem value="dimensions">
        <AccordionTrigger>Dimensions</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-6">
            <!-- Width Input with Plus/Minus Buttons -->
            <div class="space-y-2">
              <label for="width" class="text-sm font-medium">Width</label>
              <div class="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  class="rounded-r-none h-9 w-9"
                  on:click={() => decrement("width")}
                >
                  <Minus class="w-4 h-4" />
                </Button>
                <Input
                  id="width"
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={dimensions.width}
                  on:input={(e) => handleInputChange(e, "width")}
                  on:keypress={preventNonNumericInput}
                  class="h-9 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  class="rounded-l-none h-9 w-9"
                  on:click={() => increment("width")}
                >
                  <Plus class="w-4 h-4" />
                </Button>
              </div>
            </div>

            <!-- Height Input with Plus/Minus Buttons -->
            <div class="space-y-2">
              <label for="height" class="text-sm font-medium">Height</label>
              <div class="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  class="rounded-r-none h-9 w-9"
                  on:click={() => decrement("height")}
                >
                  <Minus class="w-4 h-4" />
                </Button>
                <Input
                  id="height"
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={dimensions.height}
                  on:input={(e) => handleInputChange(e, "height")}
                  on:keypress={preventNonNumericInput}
                  class="h-9 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  class="rounded-l-none h-9 w-9"
                  on:click={() => increment("height")}
                >
                  <Plus class="w-4 h-4" />
                </Button>
              </div>
            </div>

            <!-- Depth Input with Plus/Minus Buttons -->
            <div class="space-y-2">
              <label for="depth" class="text-sm font-medium">Depth</label>
              <div class="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  class="rounded-r-none h-9 w-9"
                  on:click={() => decrement("depth")}
                >
                  <Minus class="w-4 h-4" />
                </Button>
                <Input
                  id="depth"
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={dimensions.depth}
                  on:input={(e) => handleInputChange(e, "depth")}
                  on:keypress={preventNonNumericInput}
                  class="h-9 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  class="rounded-l-none h-9 w-9"
                  on:click={() => increment("depth")}
                >
                  <Plus class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="appearance">
        <AccordionTrigger>Appearance</AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardContent class="pt-6">
              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="p-2 rounded bg-muted">
                  <span class="block text-xs text-muted-foreground">Width</span>
                  <span class="font-medium">{dimensions.width.toFixed(1)}</span>
                </div>
                <div class="p-2 rounded bg-muted">
                  <span class="block text-xs text-muted-foreground">Height</span
                  >
                  <span class="font-medium">{dimensions.height.toFixed(1)}</span
                  >
                </div>
                <div class="p-2 rounded bg-muted">
                  <span class="block text-xs text-muted-foreground">Depth</span>
                  <span class="font-medium">{dimensions.depth.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="animation">
        <AccordionTrigger>Animation</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              The 3D model will {rotate ? "continuously rotate" : "stay still"} to
              showcase all dimensions.
            </p>
            <Button
              variant="outline"
              class="w-full"
              on:click={() => (rotate = !rotate)}
            >
              {rotate ? "Stop Rotation" : "Start Rotation"}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</div>
