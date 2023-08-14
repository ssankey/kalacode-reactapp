import React, { useEffect, useRef } from 'react';
import { randomNormal } from 'd3-random'; // or 'random-normal'

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const NUM_PARTICLES = 100; // Example value, adjust as needed
  const PARTICLE_SIZE = 10; // Example value, adjust as needed
  const SPEED = 1000; // Example value, adjust as needed

  const rand = (low, high) => {
    return Math.random() * (high - low) + low;
  };

  const createParticle = (canvas) => {
    const colour = {
      r: 255,
      g: randomNormal({ mean: 125, dev: 20 }),
      b: 50,
      a: rand(0, 1),
    };
    return {
      x: -2,
      y: -2,
      diameter: Math.max(0, randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })),
      duration: randomNormal({ mean: SPEED, dev: SPEED * 0.1 }),
      amplitude: randomNormal({ mean: 16, dev: 2 }),
      offsetY: randomNormal({ mean: 0, dev: 10 }),
      arc: Math.PI * 2,
      startTime: performance.now() - rand(0, SPEED),
      colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
    };
  };

  const moveParticle = (particle, canvas, time) => {
    const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
    return {
      ...particle,
      x: progress,
      y: ((Math.sin(progress * particle.arc) * particle.amplitude) + particle.offsetY),
    };
  };

  const drawParticle = (particle, canvas, ctx) => {
    const vh = canvas.height / 100;

    ctx.fillStyle = particle.colour;
    ctx.beginPath();
    ctx.ellipse(
      particle.x * canvas.width,
      particle.y * vh + (canvas.height / 2),
      particle.diameter * vh,
      particle.diameter * vh,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
  };

  const draw = (time, canvas, ctx) => {
    // Move particles
    particles.current.forEach((particle, index) => {
      particles.current[index] = moveParticle(particle, canvas, time);
    });

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the particles
    particles.current.forEach((particle) => {
      drawParticle(particle, canvas, ctx);
    });

    // Schedule next frame
    requestAnimationFrame((time) => draw(time, canvas, ctx));
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    const ctx = canvas.getContext('2d');

    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    });

    return [canvas, ctx];
  };

  useEffect(() => {
    const [canvas, ctx] = initializeCanvas();

    ctx.fillStyle = 'red'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Create a bunch of particles
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.current.push(createParticle(canvas));
    }

    requestAnimationFrame((time) => draw(time, canvas, ctx));

    return () => {
      // Clean up the animation
      particles.current = [];
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas"></canvas>;
};

export default ParticleCanvas;
