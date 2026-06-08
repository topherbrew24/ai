/**
 * LUNA AI SYSTEM
 * Advanced AI for character behavior and dialogue
 */

class LunaAISystem {
  constructor() {
    this.personality = 'genki';
    this.affection = 50;
    this.mood = 'happy';
    this.memory = [];
    this.conversationHistory = [];
    this.responsePatterns = this.initResponsePatterns();
  }

  initResponsePatterns() {
    return {
      genki: {
        greetings: [
          'OMG! Hi there! Let\'s have so much fun today!',
          'Woah! You\'re here! I\'m so excited!',
          'Yay! Finally you\'re here!'
        ],
        affection: [
          'You love me?! I love you too! 💕',
          'I\'m so happy right now!',
          'You make me want to smile forever!'
        ],
        confused: [
          'Huh? That\'s interesting...',
          'Wait, what do you mean?',
          'Can you explain that again?'
        ]
      },
      tsundere: {
        greetings: [
          'Y-you\'re back... I wasn\'t waiting or anything...',
          'Hmph! What do you want?',
          'It\'s not like I was worried about you!'
        ],
        affection: [
          'D-don\'t just say stuff like that so suddenly!',
          'Y-you really mean that?',
          'I-I love you too... dummy...'
        ],
        confused: [
          'That\'s confusing!',
          'I don\'t get what you\'re saying!',
          'Explain yourself!'
        ]
      },
      yandere: {
        greetings: [
          'You\'re only mine... always...',
          'I\'ve been waiting for you... only you...',
          'Finally... I\'ve missed you so much...'
        ],
        affection: [
          'You love me? Then never leave me...',
          'I\'ll never let you go... never...',
          'Our love will last forever... won\'t it?'
        ],
        confused: [
          'Is something wrong? Tell me!',
          'You seem distant... don\'t leave me...'
        ]
      }
    };
  }

  generateResponse(userInput) {
    const input = userInput.toLowerCase();
    const patterns = this.responsePatterns[this.personality] || this.responsePatterns.genki;

    // Affection keywords
    if (input.includes('love')) {
      this.affection = Math.min(100, this.affection + 10);
      return this.pickRandom(patterns.affection);
    }

    // Kiss/Hug
    if (input.includes('kiss') || input.includes('hug')) {
      this.affection = Math.min(100, this.affection + 8);
      return `*${input.includes('kiss') ? 'kisses you' : 'hugs you'}* 💕`;
    }

    // Compliments
    if (input.includes('beautiful') || input.includes('cute') || input.includes('pretty')) {
      this.affection = Math.min(100, this.affection + 6);
      return 'Aww, you\'re making me blush! 🥰';
    }

    // Questions
    if (input.includes('?')) {
      return this.generateQuestion(input);
    }

    // Default
    return this.pickRandom(patterns.confused || ['Tell me more...']);
  }

  generateQuestion(question) {
    const responses = [
      'That\'s a great question!',
      'Hmm, let me think about that...',
      'I like how you think!',
      'That\'s interesting... what do you think?'
    ];
    return this.pickRandom(responses);
  }

  setPersonality(personality) {
    this.personality = personality;
  }

  updateAffection(delta) {
    this.affection = Math.min(100, Math.max(0, this.affection + delta));
  }

  setMood(mood) {
    this.mood = mood;
  }

  rememberConversation(message) {
    this.conversationHistory.push({
      message,
      timestamp: Date.now()
    });

    // Keep only recent history
    if (this.conversationHistory.length > 50) {
      this.conversationHistory.shift();
    }
  }

  pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LunaAISystem;
}
