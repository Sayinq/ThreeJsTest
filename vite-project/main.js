import './style.css'
//Adding in Three.JS
import * as THREE from 'three';
//Able to move around scene with Mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//Scene, Camera, and Renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//3d Ring
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
//Defining Material BASIC requires no lightsource
const material = new THREE.MeshStandardMaterial({ color: 'rgb( 125, 241, 241 )' });
//Meshing
const torusKnot = new THREE.Mesh(geometry, material);
//Adding item to scene
scene.add(torusKnot);

//Lighting
//directed light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(30,30,30);

//lights up everything
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//adds a helper to see the lightsource

//const lightHelper = new THREE.PointLightHelper(pointLight)

//2d grid along the scene

//const gridHelper = new THREE.GridHelper(200, 50)

//scene.add(lightHelper, gridHelper)

//Orbit Controls, listening to domEvents on mouse
const controls = new OrbitControls(camera, renderer.domElement);

//Adding stars around knot
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const snow = new THREE.Mesh(geometry, material);
  //Randomly places stars
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  snow.position.set(x,y,z);
  scene.add(snow)
}

Array(200).fill().forEach(addStar);

//Background texture 
const bgTexture = new THREE.TextureLoader().load('mountain.jpg');
scene.background = bgTexture;

//Animate rendering loop
function animate() {
    requestAnimationFrame(animate);

    //Rotation for knot
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.005;
    torusKnot.rotation.z += 0.01;

    //Snow falling down animation
    
    //Updates controls with mouse usage
    controls.update();

    renderer.render(scene, camera);
}

animate();

