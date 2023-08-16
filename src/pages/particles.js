import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MyThreeJSComponent = () => {
  const mountRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const windowHalfX = useRef(window.innerWidth / 2);
  const windowHalfY = useRef(window.innerHeight / 2);
  const camera = useRef(null);
  const scene = useRef(null);
  const renderer = useRef(null);
  const material = useRef(null);

  useEffect(() => {
    init();
    animate();

    function init() {
      camera.current = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 2000);
      camera.current.position.z = 0;

      scene.current = new THREE.Scene();
      scene.current.fog = new THREE.FogExp2(0x0000ff, 0.001);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const size = 1000;

      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() * size + Math.random() * size) / 2 - size / 2;
        const y = (Math.random() * size + Math.random() * size) / 2 - size / 2;
        const z = (Math.random() * size + Math.random() * size) / 2 - size / 2;

        vertices.push(x, y, z);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      material.current = new THREE.PointsMaterial({
        size: 2,
        color: 0xb6401e,
      });

      const particles = new THREE.Points(geometry, material.current);
      scene.current.add(particles);

      renderer.current = new THREE.WebGLRenderer();
      renderer.current.setPixelRatio(window.devicePixelRatio);
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.current.domElement);

      document.body.style.touchAction = 'none';
      document.body.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      windowHalfX.current = window.innerWidth / 2;
      windowHalfY.current = window.innerHeight / 2;

      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    }

    function onPointerMove(event) {
      mouseX.current = event.clientX - windowHalfX.current;
      mouseY.current = event.clientY - windowHalfY.current;
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      camera.current.position.x += (mouseX.current * 2 - camera.current.position.x) * 0.02;
      camera.current.position.y += (-mouseY.current * 2 - camera.current.position.y) * 0.02;
      camera.current.lookAt(scene.current.position);
      renderer.current.render(scene.current, camera.current);
      scene.current.rotation.x += 0.001;
      scene.current.rotation.y += 0.002;
    }

    return () => {
      if (mountRef.current && renderer.current && renderer.current.domElement) {
        mountRef.current.removeChild(renderer.current.domElement);
      }
      document.body.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default MyThreeJSComponent;
