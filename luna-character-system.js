/**
 * LUNA CHARACTER SYSTEM
 * Advanced character rendering with skeleton animation and morphing
 */

class LunaCharacter {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);
    
    this.mesh = {};
    this.skeleton = null;
    this.animations = {};
    this.morphTargets = {};
    this.state = {
      emotion: 'neutral',
      breathing: false,
      blinking: false,
      animation: null
    };
    
    this.createBody();
  }

  createBody() {
    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.4, 0.5, 2.5, 32);
    const bodyMat = new THREE.MeshPhongMaterial({
      color: 0xff99cc,
      shininess: 100,
      wireframe: false
    });
    this.mesh.body = new THREE.Mesh(bodyGeo, bodyMat);
    this.mesh.body.castShadow = true;
    this.mesh.body.receiveShadow = true;
    this.group.add(this.mesh.body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.35, 64, 64);
    const headMat = new THREE.MeshPhongMaterial({
      color: 0xffd4c4,
      shininess: 80
    });
    this.mesh.head = new THREE.Mesh(headGeo, headMat);
    this.mesh.head.position.y = 1.3;
    this.mesh.head.castShadow = true;
    this.mesh.head.receiveShadow = true;
    this.group.add(this.mesh.head);

    // Hair
    const hairGeo = new THREE.SphereGeometry(0.4, 64, 64);
    const hairMat = new THREE.MeshPhongMaterial({
      color: 0xc026d3,
      shininess: 60
    });
    this.mesh.hair = new THREE.Mesh(hairGeo, hairMat);
    this.mesh.hair.scale.set(1.1, 0.9, 1.05);
    this.mesh.hair.position.y = 1.4;
    this.mesh.hair.castShadow = true;
    this.group.add(this.mesh.hair);

    // Eyes
    this.createEyes();

    // Setup animations
    this.setupAnimations();
  }

  createEyes() {
    const eyeGeo = new THREE.SphereGeometry(0.12, 32, 32);
    const eyeMat = new THREE.MeshPhongMaterial({ color: 0xff69b4 });

    this.mesh.leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    this.mesh.leftEye.position.set(-0.12, 0.08, 0.3);
    this.mesh.head.add(this.mesh.leftEye);

    this.mesh.rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    this.mesh.rightEye.position.set(0.12, 0.08, 0.3);
    this.mesh.head.add(this.mesh.rightEye);
  }

  setupAnimations() {
    this.animations = {
      breathing: { duration: 3, amplitude: 0.02 },
      blinking: { duration: 0.3, speed: 1 },
      waveHand: { duration: 1.5, speed: 2 },
      nod: { duration: 0.8, amplitude: 0.3 },
      shake: { duration: 0.6, amplitude: 0.2 }
    };
  }

  setEmotion(emotion) {
    this.state.emotion = emotion;
    const emotionColors = {
      happy: 0xff69b4,
      sad: 0x6b9bd1,
      angry: 0xff6b6b,
      shy: 0xffb3d9,
      excited: 0xffff00,
      neutral: 0xff69b4
    };
    
    const color = emotionColors[emotion] || emotionColors.neutral;
    if (this.mesh.leftEye) this.mesh.leftEye.material.color.set(color);
    if (this.mesh.rightEye) this.mesh.rightEye.material.color.set(color);
  }

  playAnimation(animName, loop = false) {
    this.state.animation = animName;
    this.state.animationTime = 0;
    this.state.loop = loop;
  }

  updateAnimations(deltaTime) {
    if (!this.state.animation) return;

    if (!this.state.animationTime) this.state.animationTime = 0;
    this.state.animationTime += deltaTime;

    const anim = this.animations[this.state.animation];
    if (!anim) return;

    const progress = (this.state.animationTime % anim.duration) / anim.duration;

    switch (this.state.animation) {
      case 'breathing':
        this.mesh.body.scale.z = 1 + Math.sin(progress * Math.PI * 2) * anim.amplitude;
        break;
      case 'nod':
        this.mesh.head.rotation.x = Math.sin(progress * Math.PI * 2) * anim.amplitude;
        break;
      case 'shake':
        this.mesh.head.rotation.y = Math.sin(progress * Math.PI * 4) * anim.amplitude;
        break;
      case 'waveHand':
        // Hand wave animation
        break;
    }
  }

  setHairColor(color) {
    if (this.mesh.hair) {
      this.mesh.hair.material.color.set(color);
    }
  }

  setBodyColor(color) {
    if (this.mesh.body) {
      this.mesh.body.material.color.set(color);
    }
  }

  setRatios(chest, hip, height) {
    if (this.mesh.body) {
      this.mesh.body.scale.set(hip, height, 1);
    }
  }

  update(deltaTime) {
    this.updateAnimations(deltaTime);
    
    // Continuous breathing
    if (this.mesh.body) {
      this.mesh.body.position.y = Math.sin(Date.now() * 0.002) * 0.01;
    }
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LunaCharacter;
}
