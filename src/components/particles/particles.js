import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let SEPARATION = 100;
    let AMOUNTX = 100;
    let AMOUNTY = 190;

    let container;
    let camera, scene, renderer;

    let particles = [];
    let count = 0;

    let mouseX = 85;
    let mouseY = -342;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const init = () => {
      container = containerRef.current;

      camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 600;

      scene = new THREE.Scene();

      particles = new Array();

      const geometry = new THREE.BoxGeometry(9, 9, 9);
      const material = new THREE.MeshBasicMaterial({ color: 0xb6401e });

      let i = 0;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = new THREE.Mesh(geometry, material);
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          scene.add(particle);
          particles.push(particle);
        }
      }

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      document.addEventListener('mousemove', onDocumentMouseMove, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);
      document.addEventListener('touchmove', onDocumentTouchMove, false);

      window.addEventListener('resize', onWindowResize, false);
    };

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onDocumentMouseMove = (event) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    const onDocumentTouchStart = (event) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    };

    const onDocumentTouchMove = (event) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      let i = 0;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = particles[i++];
          particle.position.y = Math.sin((ix + count) * 0.5) * 20 + Math.sin((iy + count) * 0.5) * 100;
        }
      }

      renderer.render(scene, camera);

      count += 0.5;
    };

    init();
    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef}/>;
};

export default ParticleAnimation;
