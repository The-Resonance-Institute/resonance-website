// PROJECT VERUS, the explainer's sound (2026-10-15, on the operator's word): light music and effects, made in the
// browser with the Web Audio API, so there are no audio files to load or license. Nothing plays until the visitor
// turns sound on: browsers block sound before a click, and a page that starts talking is a page people close.

export type Sfx =
  | "pop"
  | "blip"
  | "boing"
  | "whoosh"
  | "tick"
  | "step"
  | "paper"
  | "ding"
  | "chime"
  | "fanfare"
  | "honk"
  | "motor"
  | "winch"
  | "alert"
  | "clunk"
  | "thump"
  | "clack"
  | "rise";

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// four bars in C major pentatonic, eighth notes, -1 a rest; chords C, A minor, F, G
const MELODY = [
  76, 79, 81, 79, 76, -1, 74, -1, 72, 76, 81, -1, 79, 76, -1, -1, 69, 72, 77,
  76, 74, -1, 72, -1, 74, 79, 81, 79, 74, -1, 76, -1,
];
const CHORDS = [
  [48, 60, 64, 67],
  [45, 57, 60, 64],
  [41, 57, 60, 65],
  [43, 55, 59, 62],
];
const EIGHTH = 60 / 104 / 2;

export class Sound {
  private ctx: AudioContext | null = null;
  private music: GainNode | null = null;
  private sfx: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer: number | null = null;
  private next = 0;
  private step = 0;

  /** Call from a click: a browser only lets sound start from one. */
  start(): void {
    if (!this.ctx) {
      const ctx = new AudioContext();
      const master = ctx.createGain();
      master.gain.value = 0.7;
      master.connect(ctx.destination);
      this.music = ctx.createGain();
      this.music.gain.value = 0;
      this.music.connect(master);
      this.sfx = ctx.createGain();
      this.sfx.gain.value = 0.55;
      this.sfx.connect(master);
      const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      this.noise = buf;
      this.ctx = ctx;
    }
    void this.ctx.resume();
  }

  musicOn(): void {
    const ctx = this.ctx;
    if (!ctx || !this.music || this.timer !== null) return;
    this.music.gain.cancelScheduledValues(ctx.currentTime);
    this.music.gain.setTargetAtTime(0.28, ctx.currentTime, 0.3);
    this.next = ctx.currentTime + 0.05;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  musicOff(): void {
    const ctx = this.ctx;
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    if (ctx && this.music)
      this.music.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
  }

  close(): void {
    this.musicOff();
    void this.ctx?.close();
    this.ctx = null;
  }

  private schedule(): void {
    const ctx = this.ctx;
    if (!ctx || !this.music) return;
    while (this.next < ctx.currentTime + 0.15) {
      const t = this.next;
      const bar = Math.floor(this.step / 8);
      const inBar = this.step % 8;
      const chord = CHORDS[bar];
      if (inBar === 0)
        chord
          .slice(1)
          .forEach((n) =>
            this.tone(this.music!, "triangle", midi(n), t, 0.035, 0.08, 2.2),
          );
      if (inBar === 0 || inBar === 4)
        this.tone(this.music, "triangle", midi(chord[0]), t, 0.32, 0.005, 0.45);
      const note = MELODY[this.step];
      if (note > 0) {
        this.tone(this.music, "sine", midi(note), t, 0.22, 0.004, 0.5);
        this.tone(this.music, "sine", midi(note) * 4, t, 0.025, 0.002, 0.12);
      }
      if (inBar % 2 === 1)
        this.hiss(this.music, t, 0.035, 0.04, "highpass", 7000);
      this.next += EIGHTH;
      this.step = (this.step + 1) % MELODY.length;
    }
  }

  private tone(
    out: AudioNode,
    type: OscillatorType,
    freq: number,
    t: number,
    vol: number,
    attack: number,
    decay: number,
    to?: number,
  ): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + decay);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + attack + decay + 0.05);
  }

  private hiss(
    out: AudioNode,
    t: number,
    vol: number,
    dur: number,
    type: BiquadFilterType,
    freq: number,
    to?: number,
    q = 1,
  ): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(freq, t);
    if (to) f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur / 3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(out);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.05);
  }

  private drone(
    type: OscillatorType,
    from: number,
    to: number,
    t: number,
    dur: number,
    vol: number,
    cutoff: number,
  ): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(from, t);
    o.frequency.linearRampToValueAtTime(to, t + dur);
    f.type = "lowpass";
    f.frequency.value = cutoff;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.12);
    g.gain.setValueAtTime(vol, t + dur - 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(this.sfx!);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  play(kind: Sfx, dur = 1.5): void {
    const ctx = this.ctx;
    const out = this.sfx;
    if (!ctx || !out || ctx.state !== "running") return;
    const t = ctx.currentTime + 0.01;
    switch (kind) {
      case "pop":
        return this.tone(out, "sine", 520, t, 0.45, 0.004, 0.12, 1040);
      case "blip":
        return this.tone(out, "sine", 880, t, 0.22, 0.003, 0.08, 1320);
      case "boing": {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        const lfo = ctx.createOscillator();
        const depth = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(170, t);
        o.frequency.exponentialRampToValueAtTime(520, t + 0.12);
        o.frequency.exponentialRampToValueAtTime(240, t + 0.5);
        lfo.frequency.value = 14;
        depth.gain.value = 25;
        lfo.connect(depth).connect(o.frequency);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
        o.connect(g).connect(out);
        o.start(t);
        lfo.start(t);
        o.stop(t + 0.6);
        lfo.stop(t + 0.6);
        return;
      }
      case "whoosh":
        return this.hiss(out, t, 0.35, 0.4, "bandpass", 350, 2600, 1.2);
      case "tick":
        return this.hiss(out, t, 0.22, 0.03, "highpass", 3200);
      case "step":
        return this.tone(out, "sine", 150, t, 0.18, 0.004, 0.07, 80);
      case "paper":
        return this.hiss(out, t, 0.2, 0.22, "bandpass", 1800, 900, 0.8);
      case "ding":
        this.tone(out, "sine", 1318.5, t, 0.22, 0.003, 1.1);
        return this.tone(out, "sine", 1975.5, t, 0.1, 0.003, 0.8);
      case "chime":
        [1046.5, 1318.5, 1568, 2093].forEach((f, i) =>
          this.tone(out, "sine", f, t + i * 0.07, 0.14, 0.003, 0.6),
        );
        return;
      case "fanfare":
        [523.25, 659.25, 783.99].forEach((f, i) =>
          this.tone(out, "triangle", f, t + i * 0.11, 0.25, 0.005, 0.25),
        );
        this.tone(out, "triangle", 1046.5, t + 0.33, 0.3, 0.005, 0.9);
        return this.tone(out, "sine", 1568, t + 0.33, 0.1, 0.005, 0.9);
      case "honk":
        [0, 0.28].forEach((d) => {
          this.drone("sawtooth", 392, 392, t + d, 0.2, 0.09, 1400);
          this.drone("sawtooth", 494, 494, t + d, 0.2, 0.07, 1400);
        });
        return;
      case "motor":
        this.drone("sawtooth", 52, 60, t, dur, 0.16, 380);
        return this.drone("square", 104, 118, t, dur, 0.03, 300);
      case "winch":
        return this.drone("sawtooth", 140, 330, t, dur, 0.09, 900);
      case "alert":
        this.tone(out, "square", 880, t, 0.09, 0.005, 0.14);
        return this.tone(out, "square", 622, t + 0.17, 0.09, 0.005, 0.22);
      case "clunk":
        this.hiss(out, t, 0.4, 0.09, "lowpass", 900);
        return this.tone(out, "sine", 110, t, 0.5, 0.003, 0.18, 50);
      case "thump":
        this.hiss(out, t, 0.18, 0.05, "lowpass", 1200);
        return this.tone(out, "sine", 150, t, 0.55, 0.003, 0.22, 55);
      case "clack":
        this.hiss(out, t, 0.25, 0.04, "bandpass", 2400, undefined, 4);
        return this.tone(out, "sine", 760, t, 0.12, 0.002, 0.04);
      case "rise":
        return this.tone(out, "sine", 440, t, 0.14, 0.01, 0.9, 1320);
    }
  }
}
