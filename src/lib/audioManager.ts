/**
 * Audio Management Module
 * Handles Web Audio API procedural synthesis for book interactions:
 * - Page flip sound
 * - Book open sound
 * - Book close sound
 * Completely decoupled from book navigation logic and UI state.
 */

class AudioManager {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.35;

  constructor() {
    // Only initialize in browser environment
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("resume_audio_muted");
      if (savedMute !== null) {
        this.isMuted = savedMute === "true";
      }
    }
  }

  private initContext() {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("resume_audio_muted", String(this.isMuted));
    }
    return this.isMuted;
  }

  public setMute(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("resume_audio_muted", String(this.isMuted));
    }
  }

  /**
   * Generates a crisp paper page-turn sound using filtered noise envelope
   */
  public playPageFlip(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.22; // 220ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate pink/brownish noise for paper rustle
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Lowpass pink noise filter
        lastOut = (lastOut * 0.85) + (white * 0.15);
        // Fade in and out envelope
        const t = i / bufferSize;
        const envelope = Math.sin(t * Math.PI) * Math.pow(1 - t, 0.4);
        data[i] = lastOut * envelope;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to give realistic dry paper texture
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.2);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.9, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Generates a soft leather/cloth book opening sound
   */
  public playBookOpen(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.4; // 400ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        const t = i / bufferSize;
        const envelope = Math.pow(Math.sin(t * Math.PI), 1.5);
        data[i] = white * envelope;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(1100, ctx.currentTime + 0.2);
      filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Generates a cushioned book closing thud sound
   */
  public playBookClose(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      // Gentle bass thump
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(95, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.18);

      oscGain.gain.setValueAtTime(this.volume * 0.8, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.19);

      // Cushioned slap
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        const t = i / bufferSize;
        data[i] = white * (1 - t) * (1 - t);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(500, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(this.volume * 0.5, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start();
    } catch {
      // AudioContext fallback
    }
  }
}

export const audioManager = new AudioManager();
