function createTexture() {
  const texture = new THREE.TextureLoader().load(textures[currentTextureIndex]);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.encoding = THREE.sRGBEncoding;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  
  // Set the color from the colors array
  const color = new THREE.Color(colors[currentTextureIndex]);
  texture.color = color;
  
  return texture;
} 