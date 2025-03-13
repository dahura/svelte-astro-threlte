type SoundName = string; // You can make this more specific if you prefer, e.g., 'doorOpen' | 'doorClose'

// A class to manage sounds dynamically
class Sound {
  private static instance: Sound;
  private sounds: Map<SoundName, HTMLAudioElement>;

  private constructor() {
    this.sounds = new Map();
  }

  // Singleton pattern to ensure only one instance of Sound
  public static getInstance(): Sound {
    if (!Sound.instance) {
      Sound.instance = new Sound();
    }
    return Sound.instance;
  }

  // Dynamically load a sound by name and URL
  public loadSound<K extends SoundName>(name: K, url: string): void {
    if (this.sounds.has(name)) {
      console.warn(`Sound "${name}" is already loaded.`);
      return;
    }
    if (typeof Audio !== 'undefined') {
      const audio = new Audio(url);
      this.sounds.set(name, audio);
    } else {
      console.warn('Audio API is not available in this environment.');
    }
  }

  // Play the sound by its name with type safety
  public playSound<K extends SoundName>(name: K): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0; // Start from the beginning
      sound.play();
    } else {
      console.warn(`Sound "${name}" is not loaded.`);
    }
  }

  // Stop a sound by name (if needed)
  public stopSound<K extends SoundName>(name: K): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  // Stop all sounds
  public stopAllSounds(): void {
    this.sounds.forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}

export const sound = Sound.getInstance();











