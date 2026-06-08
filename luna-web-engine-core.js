/**
 * LUNA WEB ENGINE - Core Framework
 * Advanced 3D Game Engine for VR Dating Sim
 * Physics-based rendering, skeletal animation, AI systems
 */

class LunaWebEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.physics = null;
    this.assets = new AssetManager();
    this.input = new InputManager();
    this.audio = new AudioManager();
    this.particles = new ParticleSystem();
    this.animation = new AnimationSystem();
    this.lighting = new LightingSystem();
    this.gameObjects = [];
    this.deltaTime = 0;
    this.lastTime = Date.now();
    this.isRunning = false;
    
    this.init();
  }

  init() {
    this.setupThreeJS();
    this.setupPhysics();
    this.setupLighting();
    this.setupPostProcessing();
    this.setupInput();
    this.start();
  }

  setupThreeJS() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0e27);
    this.scene.fog = new THREE.Fog(0x0a0e27, 50, 200);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 1.5, 4);
    this.camera.lookAt(0, 1.5, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () => this.onResize());
  }

  setupPhysics() {
    this.physics = {
      gravity: new THREE.Vector3(0, -9.81, 0),
      bodies: [],
      update: (deltaTime) => this.updatePhysics(deltaTime)
    };
  }

  setupLighting() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xff99cc, 0.7);
    this.scene.add(ambient);

    // Main directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 500;
    this.scene.add(dirLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0x00ffff, 0.5);
    rimLight.position.set(-10, 10, -10);
    this.scene.add(rimLight);

    this.lighting.addLight('sun', dirLight);
    this.lighting.addLight('rim', rimLight);
  }

  setupPostProcessing() {
    this.postProcessing = {
      enabled: true,
      bloom: { strength: 1.0, threshold: 0.2, radius: 0.4 },
      fxaa: { enabled: true },
      colorGrading: { saturation: 1.1, brightness: 1.05 }
    };
  }

  setupInput() {
    document.addEventListener('keydown', (e) => this.input.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.input.onKeyUp(e));
    this.container.addEventListener('mousemove', (e) => this.input.onMouseMove(e));
    this.container.addEventListener('mousedown', (e) => this.input.onMouseDown(e));
    this.container.addEventListener('mouseup', (e) => this.input.onMouseUp(e));
  }

  start() {
    this.isRunning = true;
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
  }

  gameLoop = () => {
    requestAnimationFrame(this.gameLoop);

    const now = Date.now();
    this.deltaTime = (now - this.lastTime) / 1000;
    this.lastTime = now;

    // Update all game objects
    this.gameObjects.forEach(obj => {
      if (obj.update) obj.update(this.deltaTime);
    });

    // Update physics
    this.updatePhysics(this.deltaTime);

    // Update animations
    this.animation.update(this.deltaTime);

    // Update particles
    this.particles.update(this.deltaTime);

    // Render
    this.renderer.render(this.scene, this.camera);
  };

  updatePhysics(deltaTime) {
    this.physics.bodies.forEach(body => {
      if (body.dynamic) {
        body.velocity.add(this.physics.gravity.clone().multiplyScalar(deltaTime));
        body.position.add(body.velocity.clone().multiplyScalar(deltaTime));
        body.mesh.position.copy(body.position);
      }
    });
  }

  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
    if (gameObject.mesh) this.scene.add(gameObject.mesh);
    return gameObject;
  }

  removeGameObject(gameObject) {
    const idx = this.gameObjects.indexOf(gameObject);
    if (idx > -1) {
      this.gameObjects.splice(idx, 1);
      if (gameObject.mesh && gameObject.mesh.parent) {
        gameObject.mesh.parent.remove(gameObject.mesh);
      }
    }
  }
}

/**
 * Asset Manager
 */
class AssetManager {
  constructor() {
    this.assets = {};
    this.textureLoader = new THREE.TextureLoader();
    this.modelLoader = new THREE.GLTFLoader();
  }

  loadTexture(name, url) {
    return new Promise((resolve) => {
      this.textureLoader.load(url, (texture) => {
        this.assets[name] = texture;
        resolve(texture);
      });
    });
  }

  getAsset(name) {
    return this.assets[name];
  }
}

/**
 * Input Manager
 */
class InputManager {
  constructor() {
    this.keys = {};
    this.mousePos = { x: 0, y: 0, deltaX: 0, deltaY: 0 };
    this.mouseDown = false;
    this.touches = [];
  }

  onKeyDown(e) {
    this.keys[e.key.toLowerCase()] = true;
  }

  onKeyUp(e) {
    this.keys[e.key.toLowerCase()] = false;
  }

  onMouseMove(e) {
    this.mousePos.deltaX = e.clientX - this.mousePos.x;
    this.mousePos.deltaY = e.clientY - this.mousePos.y;
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  }

  onMouseDown(e) {
    this.mouseDown = true;
  }

  onMouseUp(e) {
    this.mouseDown = false;
  }

  isKeyPressed(key) {
    return this.keys[key.toLowerCase()] || false;
  }
}

/**
 * Audio Manager
 */
class AudioManager {
  constructor() {
    this.listener = new THREE.AudioListener();
    this.audioLoader = new THREE.AudioLoader();
    this.sounds = {};
  }

  loadSound(name, url) {
    const audio = new THREE.Audio(this.listener);
    this.audioLoader.load(url, (buffer) => {
      audio.setBuffer(buffer);
      this.sounds[name] = audio;
    });
  }

  playSound(name, loop = false) {
    if (this.sounds[name]) {
      this.sounds[name].loop = loop;
      this.sounds[name].play();
    }
  }

  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    }
  }
}

/**
 * Particle System
 */
class ParticleSystem {
  constructor() {
    this.emitters = [];
  }

  createEmitter(config) {
    const emitter = new ParticleEmitter(config);
    this.emitters.push(emitter);
    return emitter;
  }

  update(deltaTime) {
    this.emitters.forEach(emitter => {
      if (emitter.update) emitter.update(deltaTime);
    });
  }
}

class ParticleEmitter {
  constructor(config) {
    this.config = config;
    this.particles = [];
    this.maxParticles = config.maxParticles || 1000;
  }

  emit(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        position: this.config.position?.clone() || new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * (this.config.spread || 1),
          (Math.random() - 0.5) * (this.config.spread || 1),
          (Math.random() - 0.5) * (this.config.spread || 1)
        ),
        life: this.config.lifetime || 1.0,
        size: this.config.size || 0.1
      });
    }
  }

  update(deltaTime) {
    this.particles = this.particles.filter(p => {
      p.life -= deltaTime;
      p.position.add(p.velocity.clone().multiplyScalar(deltaTime));
      return p.life > 0;
    });
  }
}

/**
 * Animation System
 */
class AnimationSystem {
  constructor() {
    this.animations = {};
    this.playing = [];
  }

  addAnimation(name, frames, duration) {
    this.animations[name] = { frames, duration };
  }

  play(name, loop = false) {
    if (this.animations[name]) {
      this.playing.push({
        name,
        loop,
        time: 0,
        duration: this.animations[name].duration
      });
    }
  }

  update(deltaTime) {
    this.playing = this.playing.filter(anim => {
      anim.time += deltaTime;
      if (anim.time >= anim.duration && !anim.loop) {
        return false;
      }
      return true;
    });
  }
}

/**
 * Lighting System
 */
class LightingSystem {
  constructor() {
    this.lights = {};
  }

  addLight(name, light) {
    this.lights[name] = light;
  }

  getLight(name) {
    return this.lights[name];
  }

  setIntensity(name, intensity) {
    if (this.lights[name]) {
      this.lights[name].intensity = intensity;
    }
  }

  setColor(name, color) {
    if (this.lights[name]) {
      this.lights[name].color.set(color);
    }
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LunaWebEngine;
}
