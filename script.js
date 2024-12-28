import * as THREE from 'three';

// Set up the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Create the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Load Earth Texture
const textureLoader = new THREE.TextureLoader();
const earthTextureURL = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Earth_clouds_2.jpg';

textureLoader.load(
  earthTextureURL,
  (texture) => createEarth(texture),
  undefined,
  (error) => {
    console.error('Could not load texture', error);
  }
);

function createEarth(texture) {
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  // Animate Earth
  animate(earth);
}

function animate(earth) {
  function loop() {
    requestAnimationFrame(loop);

    // Rotate Earth
    earth.rotation.y += 0.001;

    renderer.render(scene, camera);
  }
  loop();
}

// Handle resizing for better responsiveness
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
