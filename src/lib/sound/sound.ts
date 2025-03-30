type SoundName = string;

class Sound {
  private static instance: Sound;
  private sounds: Map<SoundName, HTMLAudioElement>;
  private shownWarnings: Set<string>;

  private constructor() {
    this.sounds = new Map();
    this.shownWarnings = new Set();
  }

 
  public static getInstance(): Sound {
    if (!Sound.instance) {
      Sound.instance = new Sound();
    }
    return Sound.instance;
  }

  private showWarningOnce(message: string): void {
    if (!this.shownWarnings.has(message)) {
      console.warn(message);
      this.shownWarnings.add(message);
    }
  }

 
  public loadSound<K extends SoundName>(name: K, url: string): void {
    if (this.sounds.has(name)) {
      this.showWarningOnce(`Sound "${name}" is already loaded.`);
      return;
    }
    if (typeof Audio !== 'undefined') {
      const audio = new Audio(url);
      this.sounds.set(name, audio);
    } else {
      this.showWarningOnce('Audio API is not available in this environment.');
    }
  }

  
  public playSound<K extends SoundName>(name: K): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0; 
      sound.play();
    } else {
      this.showWarningOnce(`Sound "${name}" is not loaded.`);
    }
  }

  public stopSound<K extends SoundName>(name: K): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }


  public stopAllSounds(): void {
    this.sounds.forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}

export const sound = Sound.getInstance();















