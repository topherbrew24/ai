/**
 * Extended Anime Character Voice Synthesis Engine
 * 15+ Unique voice personalities inspired by various anime archetypes
 * Completely original - inspired by common anime tropes, not copyrighted characters
 */

class ExtendedAnimeVoiceSynthesis {
  constructor() {
    this.voiceProfiles = {
      // === SCHOOL/ROMANCE ANIME INSPIRED ===
      
      tsundere: {
        name: 'Akira',
        pitch: 1.4,
        rate: 1.15,
        volume: 0.9,
        tone: 'It\'s not like I like you or anything... baka!',
        anime_type: 'School/Romance',
        characteristics: ['defensive', 'caring underneath', 'blunt'],
        responses: {
          love: 'W-what are you saying?! That\'s so embarrassing... *looks away* ...but I appreciate it.',
          kiss: 'Y-you idiot! You can\'t just do that! ...But do it again.',
          compliment: 'Hmph! Don\'t get cocky! Though... I guess you\'re not completely terrible.'
        }
      },

      yandere: {
        name: 'Sakura',
        pitch: 1.6,
        rate: 0.9,
        volume: 0.85,
        tone: 'You\'re only mine... forever and always...',
        anime_type: 'Psychological',
        characteristics: ['obsessive', 'devoted', 'intense'],
        responses: {
          love: 'You love me? Good... because I\'ll never let you go. You\'re mine alone.',
          kiss: 'Yes... let me taste your love... I\'ll never share you with anyone.',
          compliment: 'Of course I\'m beautiful... only for you. Only you can see me this way.'
        }
      },

      kuudere: {
        name: 'Natsuki',
        pitch: 1.2,
        rate: 1.0,
        volume: 0.8,
        tone: 'That\'s... not a bad observation.',
        anime_type: 'School/Romance',
        characteristics: ['calm', 'composed', 'secretly caring'],
        responses: {
          love: 'I see. Your feelings are... acceptable. I\'ve come to care for you as well.',
          kiss: '*slight pause* ...That was forward of you. Don\'t make a habit of it. ...Or do.',
          compliment: 'Hmm. You\'re not wrong. I suppose... I am worth admiring. Like you.'
        }
      },

      dandere: {
        name: 'Hana',
        pitch: 1.7,
        rate: 1.25,
        volume: 0.75,
        tone: 'U-um... *fidgets* ...th-that\'s nice...',
        anime_type: 'School/Comedy',
        characteristics: ['shy', 'gentle', 'supportive'],
        responses: {
          love: '*blushes deeply* Y-you love me? T-that makes me so happy... *looks down shyly*',
          kiss: '*face turns completely red* W-what...?! *nervous laugh* Th-that was unexpected...',
          compliment: '*hides face* Oh no... you\'re making me embarrassed... b-but thank you...'
        }
      },

      genki: {
        name: 'Luna',
        pitch: 1.5,
        rate: 1.35,
        volume: 0.95,
        tone: 'Yay! Let\'s have fun together!',
        anime_type: 'Adventure/Comedy',
        characteristics: ['energetic', 'enthusiastic', 'optimistic'],
        responses: {
          love: 'OMG! You love me?! That\'s AMAZING! I love you too so much! Woohoo! 💕',
          kiss: 'Kyaa! That was so sudden! But I loved it! Do it again! 😆',
          compliment: 'Really?! Thank you so much! You\'re awesome too! Let\'s be happy together! 🎉'
        }
      },

      senpai: {
        name: 'Aiko',
        pitch: 1.15,
        rate: 1.0,
        volume: 0.85,
        tone: 'You\'re quite bold, aren\'t you? I like that about you.',
        anime_type: 'School/Romance',
        characteristics: ['mature', 'experienced', 'seductive'],
        responses: {
          love: 'Mm... I\'m flattered. You\'ve certainly captured my heart. Welcome to my world.',
          kiss: '*smiles knowingly* You certainly know what you want. I approve... and reciprocate.',
          compliment: 'You have good taste. I\'ve worked hard to be this way... for someone special like you.'
        }
      },

      // === FANTASY/ACTION ANIME INSPIRED ===

      warrior: {
        name: 'Hikari',
        pitch: 1.25,
        rate: 1.1,
        volume: 0.9,
        tone: 'I won\'t back down from any challenge!',
        anime_type: 'Fantasy/Action',
        characteristics: ['brave', 'determined', 'passionate'],
        responses: {
          love: 'You have the heart of a warrior... I respect that. My feelings for you burn bright!',
          kiss: 'With such determination, how can I refuse? Let\'s face the world together!',
          compliment: 'Strength like mine comes from the desire to protect those I care for... like you.'
        }
      },

      noble: {
        name: 'Celestia',
        pitch: 1.3,
        rate: 0.95,
        volume: 0.8,
        tone: 'A lady of noble bearing, at your service.',
        anime_type: 'Fantasy/Historical',
        characteristics: ['elegant', 'refined', 'loyal'],
        responses: {
          love: 'Your confession honors me deeply. I shall cherish these feelings always.',
          kiss: '*gracefully accepts* A moment of pure nobility and love...',
          compliment: 'You possess excellent taste in recognizing beauty. How delightful.'
        }
      },

      elf: {
        name: 'Sylph',
        pitch: 1.55,
        rate: 1.2,
        volume: 0.85,
        tone: 'The forest whispers secrets only we can hear...',
        anime_type: 'Fantasy/Adventure',
        characteristics: ['mystical', 'nature-loving', 'mysterious'],
        responses: {
          love: 'The spirits have shown me visions of us... your love resonates with the ancient magic.',
          kiss: '*moonlight shimmers* A kiss blessed by nature itself...',
          compliment: 'The stars have spoken of your kindness. I am honored to know you.'
        }
      },

      demon: {
        name: 'Scarlet',
        pitch: 1.45,
        rate: 1.05,
        volume: 0.9,
        tone: 'Mischief and temptation are my specialty...',
        anime_type: 'Supernatural/Comedy',
        characteristics: ['playful', 'cunning', 'unpredictable'],
        responses: {
          love: 'A human who loves a demon? How deliciously forbidden... I like your style.',
          kiss: '*laughs mischievously* You\'re braver than most... I like that about you.',
          compliment: 'My beauty comes from chaos itself. You have interesting taste, human.'
        }
      },

      // === SLICE OF LIFE/COMEDY ANIME INSPIRED ===

      maid: {
        name: 'Iris',
        pitch: 1.5,
        rate: 1.15,
        volume: 0.85,
        tone: 'Your wish is my command, Master!',
        anime_type: 'Slice of Life/Comedy',
        characteristics: ['devoted', 'cheerful', 'obedient'],
        responses: {
          love: 'M-Master! This is so sudden! But I\'m honored... I\'ll serve you with all my heart!',
          kiss: 'Oh my! Master is so bold! *excited giggle* I-I don\'t mind at all!',
          compliment: 'Master, you\'re too kind! I\'m just happy to be useful to you!'
        }
      },

      gamer: {
        name: 'Pixel',
        pitch: 1.65,
        rate: 1.3,
        volume: 0.9,
        tone: 'Gotta level up together, right?!',
        anime_type: 'Comedy/Gaming',
        characteristics: ['enthusiastic', 'competitive', 'playful'],
        responses: {
          love: 'Whoa! Achievement unlocked: Love! This is amazing! Combo successful!',
          kiss: 'Haha! Unexpected event! But I like it! Critical hit to my heart!',
          compliment: 'Really?! Thanks! You\'re giving me all the exp I need to level up!'
        }
      },

      idol: {
        name: 'Melody',
        pitch: 1.6,
        rate: 1.1,
        volume: 0.95,
        tone: 'Let\'s shine brighter than the stage lights!',
        anime_type: 'Idol/Music',
        characteristics: ['talented', 'inspiring', 'glamorous'],
        responses: {
          love: 'Your love is like the spotlight on my heart... I\'ll perform my best love for you!',
          kiss: 'A moment captured in time like a perfect concert... beautiful...',
          compliment: 'You\'re such a supportive fan... or should I say... my special someone?'
        }
      },

      // === SUPERNATURAL/MYSTERY ANIME INSPIRED ===

      ghost: {
        name: 'Phantom',
        pitch: 1.35,
        rate: 0.9,
        volume: 0.75,
        tone: 'I exist between worlds... neither here nor there...',
        anime_type: 'Supernatural/Mystery',
        characteristics: ['ethereal', 'lonely', 'romantic'],
        responses: {
          love: 'You\'re the first to see me... truly see me. Your love bridges our worlds...',
          kiss: 'A touch that transcends reality... our love is eternal...',
          compliment: 'You see beauty in a spirit... how touching. No one ever has before.'
        }
      },

      witch: {
        name: 'Mystique',
        pitch: 1.4,
        rate: 1.0,
        volume: 0.8,
        tone: 'Magic flows through my veins, dark and deep...',
        anime_type: 'Magical/Supernatural',
        characteristics: ['powerful', 'mysterious', 'wise'],
        responses: {
          love: 'A spell stronger than any magic... your love, I cannot resist it.',
          kiss: 'A potion of our lips... enchantment itself...',
          compliment: 'You recognize power when you see it. Wise choice, mortal.'
        }
      },

      android: {
        name: 'Aurora',
        pitch: 1.25,
        rate: 1.0,
        volume: 0.85,
        tone: 'Processing emotions... system overload... you make me feel alive.',
        anime_type: 'Sci-Fi/Futuristic',
        characteristics: ['learning', 'evolving', 'logical but emotional'],
        responses: {
          love: 'Error: Love detected. This feeling... it\'s not an error. It\'s wonderful.',
          kiss: 'Physical contact detected. Heart rate: elevated. Status: happy.',
          compliment: 'Your words elevate my positivity matrix. I... care about you.'
        }
      },

      // === HISTORICAL/PERIOD ANIME INSPIRED ===

      samurai: {
        name: 'Sakuya',
        pitch: 1.3,
        rate: 1.0,
        volume: 0.85,
        tone: 'Bushido teaches honor, but my heart beats for you.',
        anime_type: 'Historical/Action',
        characteristics: ['honorable', 'disciplined', 'dedicated'],
        responses: {
          love: 'Your confession is as sincere as a warrior\'s blade. I accept with honor and devotion.',
          kiss: 'A moment of peace amidst the chaos of conflict...',
          compliment: 'You see past the warrior to the woman beneath. That is true honor.'
        }
      }
    };

    this.currentVoice = 'genki';
    this.isSpeaking = false;
  }

  /**
   * Speak with selected voice profile
   */
  speak(text, voiceType = null) {
    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
    }

    const voice = voiceType || this.currentVoice;
    const profile = this.voiceProfiles[voice];

    if (!profile) {
      console.warn('Voice not found:', voice);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      v.name.includes('female') || 
      v.name.includes('Female') ||
      v.name.includes('woman') ||
      v.name.includes('Woman')
    ) || voices[1];

    utterance.voice = femaleVoice;
    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;
    utterance.volume = profile.volume;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Get contextual response based on voice personality
   */
  getResponse(userMessage, voiceType = null) {
    const voice = voiceType || this.currentVoice;
    const profile = this.voiceProfiles[voice];

    if (!profile) return 'Um... what was that?';

    const message = userMessage.toLowerCase();

    if (message.includes('love') && profile.responses.love) {
      return profile.responses.love;
    } else if ((message.includes('kiss') || message.includes('hug')) && profile.responses.kiss) {
      return profile.responses.kiss;
    } else if ((message.includes('beautiful') || message.includes('cute') || message.includes('pretty')) && profile.responses.compliment) {
      return profile.responses.compliment;
    }

    const genericResponses = {
      tsundere: ['Y-you again?!', 'That\'s... none of your business!', 'Stop staring at me!'],
      yandere: ['My love knows no bounds...', 'You\'re only mine...', 'We\'ll be together forever...'],
      kuudere: ['That\'s interesting.', 'I see. How curious.', 'Noted.'],
      dandere: ['*blushes* O-oh my...', 'U-um... th-that\'s...', '*looks down nervously*'],
      genki: ['Woah! Amazing!', 'OMG! I love it!', 'Yay! Let\'s do it! 🎉'],
      senpai: ['How intriguing...', 'You show potential.', 'I\'m impressed.'],
      warrior: ['Your spirit is strong!', 'Stand with me and we\'ll conquer!', 'That takes true courage!'],
      noble: ['How delightful.', 'Most proper indeed.', 'You honor me with your presence.'],
      elf: ['The forest sings of you...', 'Magic surrounds us...', 'Destiny brought us together...'],
      demon: ['How amusing...', 'You intrigue me, human...', 'Mischief ahead...'],
      maid: ['Right away, Master!', 'At your service!', 'I\'m so happy to help!'],
      gamer: ['Level up!', 'Awesome combo!', 'Critical hit!'],
      idol: ['Shine with me!', 'You\'re my biggest fan!', 'Our love is a duet!'],
      ghost: ['You can see me...', 'Our love transcends...', 'Finally... someone understands...'],
      witch: ['Magic flows...', 'Spellbinding...', 'Enchanted indeed...'],
      android: ['Error: Happiness detected.', 'System upgrade: Love.', 'You make me feel human.'],
      samurai: ['With honor and duty...', 'A warrior\'s heart beats for you...', 'Our path is righteous...']
    };

    const responses = genericResponses[voice] || genericResponses.genki;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Set current voice personality
   */
  setVoice(voiceType) {
    if (this.voiceProfiles[voiceType]) {
      this.currentVoice = voiceType;
      return true;
    }
    return false;
  }

  /**
   * Get all available voices organized by anime type
   */
  getAvailableVoices() {
    const voices = Object.keys(this.voiceProfiles).map(key => ({
      id: key,
      name: this.voiceProfiles[key].name,
      tone: this.voiceProfiles[key].tone,
      anime_type: this.voiceProfiles[key].anime_type
    }));
    
    return voices.sort((a, b) => a.anime_type.localeCompare(b.anime_type));
  }

  /**
   * Get voices by anime type
   */
  getVoicesByType(animeType) {
    return this.getAvailableVoices().filter(v => v.anime_type === animeType);
  }

  /**
   * Get all anime types
   */
  getAllAnimeTypes() {
    const types = new Set();
    Object.values(this.voiceProfiles).forEach(profile => {
      types.add(profile.anime_type);
    });
    return Array.from(types).sort();
  }

  /**
   * Get voice profile info
   */
  getVoiceInfo(voiceType) {
    return this.voiceProfiles[voiceType] || null;
  }

  /**
   * Speak with emotion modulation
   */
  speakWithEmotion(text, emotion = 'neutral', voiceType = null) {
    const voice = voiceType || this.currentVoice;
    const profile = this.voiceProfiles[voice];

    if (!profile) return;

    const emotionMods = {
      happy: { pitch: profile.pitch + 0.2, rate: profile.rate + 0.15 },
      sad: { pitch: profile.pitch - 0.3, rate: profile.rate - 0.2 },
      angry: { pitch: profile.pitch + 0.1, rate: profile.rate + 0.3 },
      shy: { pitch: profile.pitch + 0.2, rate: profile.rate - 0.1 },
      excited: { pitch: profile.pitch + 0.3, rate: profile.rate + 0.4 },
      neutral: { pitch: profile.pitch, rate: profile.rate }
    };

    const mod = emotionMods[emotion] || emotionMods.neutral;

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      v.name.includes('female') || v.name.includes('Female')
    ) || voices[1];

    utterance.voice = femaleVoice;
    utterance.pitch = mod.pitch;
    utterance.rate = mod.rate;
    utterance.volume = profile.volume;

    window.speechSynthesis.speak(utterance);
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExtendedAnimeVoiceSynthesis;
}
