declare namespace shaka {
  export interface EventManager {
    [index: string]: any;
    listen(player: ShakaInstance, type: MediaPlayerEvent, callback: (...args: any[]) => void): void;
    removeAll(): void;
  }
}