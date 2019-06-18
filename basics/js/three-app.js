/**
 * init three js
 * - scene
 * - camera
 * - render
 */
const scene = new THREE.Scene();
/* 
    set up one of the camera types: 
    * FOV (extent of sceen that is seen on display - deg)
    * aspect ratio (always w/h)
    * near & far clipping pane, objects closer or further away from cam won't be rendered
*/
/**
 * camera config
 * - FOV
 * - aspect ratio
 * - near & far clipping pane
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
/**
 * renderer config
 * - size
 * - parent
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// add renderer to dom (canvas element)
document.body.appendChild(renderer.domElement);

/**
 * create sphere material
 */
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#333",
  roughness: 0.05,
  metalness: 0.95
});

/**
 * create sphere mesh
 * - radius & segments
 */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 64, 64),
  sphereMaterial
);

/**
 * create point light
 * add light to scene
 * add sphere to scene
 */
const pointLight = new THREE.PointLight(0xffffff);
// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);
scene.add(sphere);

camera.position.z = 5;

renderer.gammaInput = true;
renderer.gammaOutput = true;

/**
 * rotation function
 */
function rotate() {
  requestAnimationFrame(rotate);
  renderer.render(scene, camera);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
}
rotate();
