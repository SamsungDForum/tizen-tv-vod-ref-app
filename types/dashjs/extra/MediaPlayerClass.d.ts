/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace dashjs {
  export interface MediaPlayerClass {
    [index: string]: any;
    addABRCustromRule(type: string, rulename: string, rule: { [index: string]: any }): void;
    attachSource(urlOrManifest: string | { [index: string]: any }, startTime?: number | string): void;
    attachTTMLRenderingDiv(div: HTMLDivElement): void;
    attachView(element: HTMLMediaElement): void;
    destroy(): void;
    duration(): number;
    durationAsUTC(): number;
    enableForcedTextStreaming(enable: boolean): void;
    enableText(enable: boolean): void;
    getABRCustomRules(): { [index: string]: any }[];
    getActiveStream(): { [index: string]: any };
    getAutoPlay(): boolean;
    getAverageThroughput(type: MediaType): number;
    getBitrateInfoListFor(type: MediaType): BitrateInfo[];
    getBufferLength(type: MediaType | undefined): number;
    getClassName?(): string;
    getCurrentLiveLatency(): number;
    getCurrentTextTrackIndex(): number;
    getCurrentTrackFor(type: MediaType): MediaInfo | null;
    getDashAdapter(): DashAdapter;
    getDashMetrics(): DashMetrics;
    getDebug(): Debug;
    getInitialMediaSettingsFor(type: MediaType): MediaSettings | null;
    getLowLatencyModeEnabled(): boolean;
    getOfflineController(): OfflineController |  null;
    getPlaybackRate(): number;
    getProtectionController(): ProtectionController | null;
    getQualityFor(type: MediaType): number;
    getSetting(): MediaPlayerSettingClass;
    getSource(): string | null;
    getStreamsFromManifest(manifest: any): StreamInfo[];
    getTargetLiveDelay(): number;
    getTopBitrateInfoFor(type: MediaType): BitrateInfo | null;
    getTracksFor(type: MediaType): MediaInfo[];
    getTracksForTypeFromManifest(type: MediaType, manifest: any, streamInfo: StreamInfo): MediaInfo[];
    getVersion(): string;
    getVideoElement(): HTMLVideoElement;
    getVolume(): number;
    getXHRWithCredentialsForType(type: string): boolean;
    initialize(view: HTMLMediaElement, source: string | null, autoPlay: boolean, startTime?: number | string): void;
    isDynamic(): boolean;
    isMuted(): boolean;
    isPaused(): boolean;
    isReady(): boolean;
    isSeeking(): boolean;
    isTextEnabled(): boolean;
    off(type: MediaPlayerEvent, listener: (e: any) => void, scope?: { [index: string]: any }): void;
    on(type: MediaPlayerEvent, listener: (e: any) => void, scope?: { [index: string]: any }, options?: { [index: string]: any }): void;
    on(type: 'qualityChangeRendered', listener: Events.QualityChangeRenderedCallback, scope?: { [index: string]: any }, options?: { [index: string]: any }): void;
    pause(): void;
    play(): void;
    preload(): void;
    provideThumbnail(time: number, callback: (thumbnail: Thumbnail | null) => void): void;
    registerCustomCapabilitiesFilter(filter: (arg: any) => boolean): void;
    registerLicenseRequestFilter(filter: (arg: any) => Promise<any>): void;
    registerLicenseResponseFilter(filter: (arg: any) => Promise<any>): void;
    removeABRCustomRule(rulename: string): void;
    removeAllABRCustomRule(): void;
    removeUTCTimingSource(schemeIdUri: string, value: string): void;
    reset(): void;
    resetCustomInitialTrackSelectionFunction?(): void;
    resetSettings(): void;
    restoreDefaultUTCTimingSources(): void;
    retrieveManifest(url: string, callback: (manifest: any, error: any) => void): void;
    seek(value: number): void;
    setAutoPlay(value: boolean): void;
    setConfig(config?: { [index: string]: any }): void;
    setCurrentTrack(track: MediaInfo, noSettingsSave?: boolean): void;
    setInitialMediaSettingsFor(type: MediaType, value: MediaSettings): void;
    setMute(value: boolean): void;
    setPlaybackRate(value: number): void;
    setProtectionData(value: { [index: string]: any }): void;
    setQualityFor(type: MediaType, qualityIndex: number, forceReplace?: boolean): void;
    setTextTrack(idx: number): void;
    setVolume(value: number): void;
    setXHRWithCredentialsForType(type: string, value: boolean): void;
    time(streamId?: string): number;
    timeAsUTC(): number;
    unregisterCustomCapabilitiesFilter(filter: (arg: any) => boolean): void;
    unregisterLicenseRequestFilter(filter: (arg: any) => Promise<any>): void;
    unregisterLicenseResponseFilter(filter: (arg: any) => Promise<any>): void;
    updatePortalSize(): void;
    updateSettings(settings: MediaPlayerSettingClass): void;
    updateSource(urlOrManifest: string | { [index: string]: any }): void;
  }
}