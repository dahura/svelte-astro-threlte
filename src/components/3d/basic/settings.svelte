<script lang="ts">
  import { CardContent, CardHeader, CardTitle } from '$lib/components/ui/card'
  import Card from '$lib/components/ui/card/card.svelte'
  import { Checkbox } from '$lib/components/ui/checkbox'
  import { Label } from '$lib/components/ui/label'
  import { Slider } from '$lib/components/ui/slider'
  import { cn } from '$lib/utils'

  interface ISettings {
    settings: {
      autoRotate?: boolean
      enableDamping?: boolean
      rotateSpeed?: number
      zoomToCursor?: boolean
      zoomSpeed?: number
      minPolarAngle?: number
      maxPolarAngle?: number
      enableZoom?: boolean
    }
    class?: string
  }

  let {
    settings = $bindable({
      autoRotate: false,
      enableDamping: true,
      rotateSpeed: 1,
      zoomToCursor: false,
      zoomSpeed: 1,
      minPolarAngle: 0,
      maxPolarAngle: Math.PI,
      enableZoom: true
    }),
    class: className
  }: ISettings = $props()

  // $effect(() => {
  //   console.log(settings.autoRotate)
  // })

  let rotateSpeedArray = $state([settings.rotateSpeed || 0])
  let zoomSpeedArray = $state([settings.zoomSpeed || 0])
  let minPolarAngleArray = $state([settings.minPolarAngle || 0])
  let maxPolarAngleArray = $state([settings.maxPolarAngle || 0])
</script>

<Card class={cn(className)} style="background-color: rgba(255, 255, 255, 0.2);">
  <CardHeader>
    <CardTitle>OrbitControls</CardTitle>
  </CardHeader>
  <CardContent>
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-2">
          <Label for="autoRotate">Auto Rotate</Label>
          <Checkbox id="autoRotate" bind:checked={settings.autoRotate} value="autoRotate" />
        </div>
        <div class="flex items-center gap-2">
          <Label for="enableDamping">Enable Damping</Label>
          <Checkbox
            id="enableDamping"
            bind:checked={settings.enableDamping}
            value="enableDamping"
          />
        </div>
        <div class="flex items-center gap-2">
          <Label for="enableZoom">Enable Zoom</Label>
          <Checkbox id="enableZoom" bind:checked={settings.enableZoom} value="enableZoom" />
        </div>
        <div class="flex items-center gap-2">
          <Label for="zoomToCursor">Zoom to Cursor</Label>
          <Checkbox id="zoomToCursor" bind:checked={settings.zoomToCursor} value="zoomToCursor" />
        </div>
      </div>
      <Label>rotateSpeed</Label>
      <Slider bind:value={rotateSpeedArray} min={0.1} max={2} step={0.1} />
      <Label>zoomSpeed</Label>
      <Slider bind:value={zoomSpeedArray} min={0.1} max={2} step={0.1} />
      <Label>minPolarAngle</Label>
      <Slider bind:value={minPolarAngleArray} min={0} max={Math.PI} step={0.1} />
      <Label>maxPolarAngle</Label>
      <Slider bind:value={maxPolarAngleArray} min={0} max={Math.PI} step={0.1} />
    </div>
  </CardContent>
</Card>
