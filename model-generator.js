/**
 * Luna Anime Character Model Generator
 * Procedurally generates 3D anime character models from text descriptions
 */

class AnimeModelGenerator {
  constructor(scene) {
    this.scene = scene;
    this.characterGroup = new THREE.Group();
    this.scene.add(this.characterGroup);
    this.currentCharacter = null;
    
    // Hair style options
    this.hairStyles = {
      long: { segments: 48, scale: { x: 1.1, y: 1.2, z: 1.05 } },
      short: { segments: 32, scale: { x: 0.9, y: 0.6, z: 0.95 } },
      wavy: { segments: 48, scale: { x: 1.15, y: 1.0, z: 1.1 } },
      curly: { segments: 64, scale: { x: 1.08, y: 1.1, z: 1.08 } },
      pigtails: { segments: 48, scale: { x: 1.2, y: 0.8, z: 1.2 } }
    };
    
    // Color palette
    this.colorPalette = {
      pink: 0xff69b4,
      blue: 0x4a90ff,
      purple: 0xc026d3,
      black: 0x1a1a1a,
      white: 0xf5f5f5,
      red: 0xff6b6b,
      blonde: 0xffeb3b,
      brown: 0x8b6f47,
      cyan: 0x00ffff,
      green: 0x00ff00,
      silver: 0xc0c0c0
    };
    
    // Body types
    this.bodyTypes = {
      slim: { radius: 0.7, height: 2.8, scale: 1.0 },
      athletic: { radius: 0.85, height: 2.9, scale: 1.1 },
      curvy: { radius: 0.95, height: 2.7, scale: 1.2 },
      petite: { radius: 0.65, height: 2.5, scale: 0.9 }
    };
    
    // Outfit options
    this.outfitTypes = {
      school: { color: 0x1a1a1a, desc: 'School Uniform' },
      casual: { color: 0xff69b4, desc: 'Casual Outfit' },
      bikini: { color: 0xff6b9d, desc: 'Bikini' },
      dress: { color: 0xdb2777, desc: 'Evening Dress' },
      maid: { color: 0xffffff, desc: 'Maid Outfit' },
      angel: { color: 0xfffacd, desc: 'Angel Outfit' },
      demon: { color: 0x8b0000, desc: 'Demon Outfit' },
      gym: { color: 0xff1493, desc: 'Gym Clothes' }
    };
  }

  /**
   * Parse text description and generate character
   */
  generateFromDescription(description) {
    const desc = description.toLowerCase();
    
    // Parse attributes
    const attributes = {
      hairColor: this.parseHairColor(desc),
      hairStyle: this.parseHairStyle(desc),
      bodyType: this.parseBodyType(desc),
      outfit: this.parseOutfit(desc),
      skinTone: this.parseSkinTone(desc),
      hasEars: this.parseEars(desc),
      hasTail: this.parseTail(desc),
      hasWings: this.parseWings(desc),
      eyeColor: this.parseEyeColor(desc)
    };
    
    this.createCharacter(attributes);
    return attributes;
  }

  /**
   * Create character from attributes
   */
  createCharacter(attributes) {
    // Clear existing character
    this.characterGroup.clear();
    this.currentCharacter = new THREE.Group();
    this.characterGroup.add(this.currentCharacter);
    
    // Create body
    this.createBody(attributes.bodyType, attributes.outfit, attributes.skinTone);
    
    // Create head
    this.createHead(attributes.skinTone, attributes.eyeColor);
    
    // Create hair
    this.createHair(attributes.hairColor, attributes.hairStyle);
    
    // Create accessories
    if (attributes.hasEars) this.createEars(attributes.hairColor);
    if (attributes.hasTail) this.createTail(attributes.hairColor);
    if (attributes.hasWings) this.createWings();
  }

  /**
   * Create body mesh
   */
  createBody(bodyType, outfit, skinTone) {
    const type = this.bodyTypes[bodyType] || this.bodyTypes.slim;
    
    const bodyGeometry = new THREE.CylinderGeometry(
      type.radius,
      type.radius * 1.4,
      type.height,
      32
    );
    
    const outfitColor = this.outfitTypes[outfit]?.color || 0xff99cc;
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: outfitColor });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.4;
    body.scale.y = type.scale;
    body.castShadow = true;
    body.receiveShadow = true;
    
    this.currentCharacter.add(body);
  }

  /**
   * Create head mesh
   */
  createHead(skinTone, eyeColor) {
    const headGeometry = new THREE.SphereGeometry(0.92, 48, 48);
    const skinColor = this.getSkinColor(skinTone);
    const headMaterial = new THREE.MeshPhongMaterial({ color: skinColor });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.85;
    head.castShadow = true;
    head.receiveShadow = true;
    
    this.currentCharacter.add(head);
    
    // Add eyes
    this.createEyes(head, eyeColor);
  }

  /**
   * Create eyes
   */
  createEyes(head, eyeColor) {
    const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: eyeColor || 0xff69b4 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 0.1, 0.75);
    head.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 0.1, 0.75);
    head.add(rightEye);
  }

  /**
   * Create hair mesh
   */
  createHair(hairColor, hairStyle) {
    const style = this.hairStyles[hairStyle] || this.hairStyles.long;
    
    const hairGeometry = new THREE.SphereGeometry(1.05, style.segments, style.segments);
    const hairMaterial = new THREE.MeshPhongMaterial({ color: hairColor });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    
    hair.scale.set(style.scale.x, style.scale.y, style.scale.z);
    hair.position.y = 2.1;
    hair.castShadow = true;
    hair.receiveShadow = true;
    
    this.currentCharacter.add(hair);
    
    // Add hair shine effect
    const shineGeometry = new THREE.SphereGeometry(1.08, style.segments, style.segments);
    const shineMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1
    });
    const shine = new THREE.Mesh(shineGeometry, shineMaterial);
    shine.scale.set(style.scale.x, style.scale.y, style.scale.z);
    shine.position.y = 2.1;
    hair.add(shine);
  }

  /**
   * Create anime-style ears
   */
  createEars(hairColor) {
    const earGeometry = new THREE.ConeGeometry(0.25, 0.6, 16);
    const earMaterial = new THREE.MeshPhongMaterial({ color: hairColor });
    
    // Left ear
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.8, 2.3, 0);
    leftEar.rotation.z = 0.3;
    leftEar.castShadow = true;
    this.currentCharacter.add(leftEar);
    
    // Right ear
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.8, 2.3, 0);
    rightEar.rotation.z = -0.3;
    rightEar.castShadow = true;
    this.currentCharacter.add(rightEar);
  }

  /**
   * Create tail
   */
  createTail(color) {
    const tailGeometry = new THREE.ConeGeometry(0.2, 1.5, 16);
    const tailMaterial = new THREE.MeshPhongMaterial({ color });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    
    tail.position.set(0, -0.5, -0.6);
    tail.rotation.z = Math.PI / 4;
    tail.castShadow = true;
    this.currentCharacter.add(tail);
  }

  /**
   * Create angel/demon wings
   */
  createWings() {
    const wingGeometry = new THREE.PlaneGeometry(1, 1.5);
    const wingMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x88ff88,
      side: THREE.DoubleSide
    });
    
    // Left wing
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.8, 0.5, -0.3);
    leftWing.rotation.y = Math.PI / 6;
    leftWing.castShadow = true;
    this.currentCharacter.add(leftWing);
    
    // Right wing
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.8, 0.5, -0.3);
    rightWing.rotation.y = -Math.PI / 6;
    rightWing.castShadow = true;
    this.currentCharacter.add(rightWing);
  }

  // ============ PARSING FUNCTIONS ============

  parseHairColor(desc) {
    for (const [color, hex] of Object.entries(this.colorPalette)) {
      if (desc.includes(color)) return hex;
    }
    return this.colorPalette.purple; // default
  }

  parseHairStyle(desc) {
    if (desc.includes('short')) return 'short';
    if (desc.includes('wavy')) return 'wavy';
    if (desc.includes('curly')) return 'curly';
    if (desc.includes('pigtail')) return 'pigtails';
    return 'long';
  }

  parseBodyType(desc) {
    if (desc.includes('slim') || desc.includes('thin')) return 'slim';
    if (desc.includes('athletic') || desc.includes('fit')) return 'athletic';
    if (desc.includes('curvy') || desc.includes('thicc')) return 'curvy';
    if (desc.includes('petite') || desc.includes('small')) return 'petite';
    return 'slim';
  }

  parseOutfit(desc) {
    if (desc.includes('school')) return 'school';
    if (desc.includes('bikini')) return 'bikini';
    if (desc.includes('dress')) return 'dress';
    if (desc.includes('maid')) return 'maid';
    if (desc.includes('angel')) return 'angel';
    if (desc.includes('demon')) return 'demon';
    if (desc.includes('gym')) return 'gym';
    return 'casual';
  }

  parseSkinTone(desc) {
    if (desc.includes('tan')) return 'tan';
    if (desc.includes('pale')) return 'pale';
    if (desc.includes('dark')) return 'dark';
    return 'fair';
  }

  parseEars(desc) {
    return desc.includes('cat') || desc.includes('ears') || desc.includes('fox');
  }

  parseTail(desc) {
    return desc.includes('tail') || desc.includes('fox') || desc.includes('cat');
  }

  parseWings(desc) {
    return desc.includes('wing') || desc.includes('angel') || desc.includes('demon');
  }

  parseEyeColor(desc) {
    for (const [color, hex] of Object.entries(this.colorPalette)) {
      if (desc.includes(`${color} eye`)) return hex;
    }
    return 0xff69b4; // default pink eyes
  }

  getSkinColor(tone) {
    const tones = {
      fair: 0xffd4c4,
      tan: 0xd4a574,
      dark: 0x8b6f47,
      pale: 0xf5e6d3
    };
    return tones[tone] || tones.fair;
  }

  /**
   * Animate character
   */
  animateCharacter(deltaTime = 0) {
    if (this.currentCharacter) {
      // Gentle head rotation
      this.currentCharacter.children[1]?.rotation.set(
        Math.sin(Date.now() * 0.001) * 0.1,
        Math.sin(Date.now() * 0.0008) * 0.15,
        0
      );
      
      // Hair bounce
      if (this.currentCharacter.children[2]) {
        this.currentCharacter.children[2].scale.y = 1.0 + Math.sin(Date.now() * 0.002) * 0.02;
      }
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimeModelGenerator;
}
