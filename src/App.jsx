import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const App = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // MeshStandardMaterial for better light interaction
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set camera position
camera.position.z = 5;

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, intensity
directionalLight.position.set(5, 5, 5); // Set light position
scene.add(directionalLight);

// Enable shadows
renderer.shadowMap.enabled = true; // Enable shadow rendering
cube.castShadow = true; // Enable shadow casting for the cube
directionalLight.castShadow = true;
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Clean-up function
    return () => {
      window.removeEventListener('resize', handleResize);
      // Perform any other cleanup here, like disposing Three.js objects
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default App;
