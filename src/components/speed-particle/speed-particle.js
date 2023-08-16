import React, { useEffect, useRef } from 'react';

const CameraExercise = () => {
  const canvasRef = useRef(null);
  let gl;
  let prg;
  let vbo;
  let frameCount = 0;
  let time = 0;
  let proj;
  let view;

  var vec3 = {
    add: function (a, b) {
        return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    },

    sub: function (a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    },

    div: function (v, d) {
        return [v[0] / d, v[1] / d, v[2] / d];
    },

    dot: function (a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    },

    cross: function (a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    },

    magnitude: function (v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    },

    normalize: function (v) {
        var m = this.magnitude(v);
        return this.div(v, m);
    }
};

var mat4 = {
    perspective: function (fovy, aspect, near, far) {
        var f = 1 / Math.tan(fovy * 0.5);
        var nf = 1 / (near - far);
        return [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * nf, -1,
            0, 0, 2 * near * far * nf, 0
        ];
    },

    lookAt: function (eye, center, up) {
        var w = vec3.normalize(vec3.sub(eye, center));
        var u = vec3.normalize(vec3.cross(up, w));
        var v = vec3.normalize(vec3.cross(w, u));

        return [
            u[0], v[0], w[0], 0,
            u[1], v[1], w[1], 0,
            u[2], v[2], w[2], 0,
            -vec3.dot(u, eye), -vec3.dot(v, eye), -vec3.dot(w, eye), 1
        ]
    }
};


  const getGLContext = (canvas) => {
    const ctx = canvas.getContext('webgl');
    if (ctx === null) {
      console.error('Could not get WebGL context');
      return null;
    }
    return ctx;
  };

  const createVertexShader = (gl) => {
    const vsSource = `
      attribute vec3 a_pos;
      uniform mat4 u_proj;
      uniform mat4 u_view;
      varying vec4 v_pos;
      varying vec4 v_pos_pre;
      void main() {
          gl_Position = u_proj * u_view * vec4(a_pos, 1.0);
          v_pos = gl_Position;
          float d = v_pos.z / v_pos.w;
          gl_PointSize = 5.0 - d * 5.0;
      }
    `;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(vs));
      return null;
    }
    return vs;
  };

  const createFragmentShader = (gl) => {
    const fsSource = `
      precision mediump float;
      varying vec4 v_pos;
      void main() {
          float d = v_pos.z / v_pos.w;
          gl_FragColor = vec4(vec3(1.0 - pow(d, 10.0)), 1.0);
      }
    `;
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(fs));
      return null;
    }
    return fs;
  };

  const initProgram = () => {
    const vs = createVertexShader(gl); // Pass the gl object as an argument
    if (vs === null) return;
  
    const fs = createFragmentShader(gl); // Pass the gl object as an argument
    if (fs === null) return;

    prg = gl.createProgram();
    gl.attachShader(prg, vs);
    gl.attachShader(prg, fs);

    gl.linkProgram(prg);
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      console.error('Could not link the program');
      return;
    }
    gl.useProgram(prg);

    prg.a_pos = gl.getAttribLocation(prg, 'a_pos');
    prg.u_proj = gl.getUniformLocation(prg, 'u_proj');
    prg.u_view = gl.getUniformLocation(prg, 'u_view');
  };

  const initBuffers = () => {
    space.init();

    vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(space.posStars), gl.STATIC_DRAW);
  };
  

  const update = () => {

    time = frameCount / 60;

    proj = mat4.perspective(Math.PI * 0.25, gl.canvas.width / gl.canvas.height, 1, 1000);

    const eye = [0, 0, Math.sin(time * 0.05) * 200 + 200];
    const center = [Math.cos(time) * 0.05, Math.sin(time) * 0.05, eye[2] + 1];
    view = mat4.lookAt(eye, center, [0, 1, 0]);

    frameCount++;
  };


  const draw = () => {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(prg.u_proj, false, proj);
    gl.uniformMatrix4fv(prg.u_view, false, view);
    gl.vertexAttribPointer(prg.a_pos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prg.a_pos);
    gl.drawArrays(gl.POINTS, 0, space.nStars);
  };

  const loop = () => {
    update();
    draw();
    requestAnimationFrame(loop);
  };

  const space = {
    nStars: 10000,
    posStars: [],
    placeStars: function (zspan) {
      zspan = zspan || 500;
      for (let i = 0; i < this.nStars; i++) {
        this.posStars.push(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * zspan);
      }
    },
    init: function (zspan) {
      this.posStars = [];
      this.placeStars(zspan);
    },
  };


  useEffect(() => {
    gl = getGLContext(canvasRef.current);
    if (gl === null) return;
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);

    initProgram();
    initBuffers();
    loop();
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default CameraExercise;