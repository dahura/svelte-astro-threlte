<script>
  import { T, useTask } from "@threlte/core";
  import { interactivity } from "@threlte/extras";
  import { Spring } from "svelte/motion";
  import Box from "./models/box.svelte";
  interactivity();

  export let width = 1;
  export let height = 2;
  export let depth = 1;
  export let rotate = true;

  const scale = new Spring(1);

  let rotation = 0;
  useTask((delta) => {
    if (rotate) {
      rotation += delta;
    }
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0);
  }}
/>
<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh
  rotation.y={rotation}
  position.y={1}
  scale={scale.current}
  onpointerenter={() => {
    scale.target = 1.5;
  }}
  onpointerleave={() => {
    scale.target = 1;
  }}
>
  <Box {width} {height} {depth} />
  <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>
