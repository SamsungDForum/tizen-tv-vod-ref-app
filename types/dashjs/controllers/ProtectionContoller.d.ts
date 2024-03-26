declare namespace dashjs {
  export interface ProtectionController {
    [key: string]: any;
    handleKeySystemFromManifest(): void;
    initializeForMedia(mediaInfo: MediaInfo): void;
    setMediaElement(element: HTMLMediaElement): void;
    setRobustnessLevel(level: string): void;
    setServerCertificate(serverCertificate: ArrayBuffer): void;
    setSessionType(value: 'temporary' | 'persistent-license'): void;
    stop(): void;
  }
}