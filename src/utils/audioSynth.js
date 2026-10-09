// Web Audio API Synthesizer fallback for playing a sweet, soft romantic piano chord loop
// This ensures background music ALWAYS works even before uploading custom MP3 files!

class RomanticSynthEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volumeNode = null;
    this.timer = null;
    this.volume = 0.5;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  playNote(freq, time, duration = 1.5) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Attack & decay envelope for soft piano-like chime sound
      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.2, time + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(noteGain);
      noteGain.connect(this.volumeNode);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      console.warn('Synth playNote error:', e);
    }
  }

  startLoop() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Soft romantic arpeggio notes in F Major / D minor (F4, A4, C5, E5, G5)
    const melodyNotes = [
      349.23, 440.00, 523.25, 659.25,
      349.23, 440.00, 523.25, 587.33,
      329.63, 392.00, 523.25, 659.25,
      293.66, 349.23, 440.00, 523.25
    ];

    let noteIdx = 0;
    const scheduleNext = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freq = melodyNotes[noteIdx % melodyNotes.length];
      this.playNote(freq, now, 2.0);

      // Play soft bass chord on 1st beat
      if (noteIdx % 4 === 0) {
        this.playNote(freq / 2, now, 3.5);
      }

      noteIdx++;
      this.timer = setTimeout(scheduleNext, 600);
    };

    scheduleNext();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export const synthEngine = new RomanticSynthEngine();
