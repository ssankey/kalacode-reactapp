import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleAnimation = () => {
  const containerRef = useRef(null);
  let container;
  let camera, scene, renderer;
  let particles = [];
  let mouseX = 10;
  let mouseY = 10;

  useEffect(() => {
    const SEPARATION = 100;
    const AMOUNTX = 40;
    const AMOUNTY = 80;

    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 600;

    scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xb6401e });

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const particle = new THREE.Mesh(geometry, material);
        particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        // Add initial animation to particles
        particle.position.y = Math.sin((ix * AMOUNTY + iy) * 0.1) * 50;

        scene.add(particle);
        particles.push(particle);
      }
    }

    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    window.addEventListener('resize', onWindowResize, false);

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.1;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.1;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  const render = () => {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.position.y = Math.sin((i + mouseX) * 0.5) * 20 + Math.sin((i + mouseY) * 0.5) * 100;
    }

    renderer.render(scene, camera);
  };

  return <div ref={containerRef} />;
};

export default ParticleAnimation;
