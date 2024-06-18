/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace dashjs {
  type MediaPlayerSettingClass = {
    debug?: {
      dispatchEvent?: boolean;
      logLevel?: number;
    };
    errors?: {
      [index: string]: any;
    };
    streaming?: {
      [index: string]: any;
      abandonLoadTimeout?: number;
      abr?: {
        [index: string]: any;
      };
      applyContentSteering?: boolean;
      applyProducerReferenceTime?: boolean;
      applyServiceDescription?: boolean;
      buffer?: {
        avoidCurrentTimeRangePruning?: boolean;
        bufferPruningInterval?: number;
        bufferTimeAtTopQuality?: number;
        bufferTimeAtTopQualityLongForm?: number;
        bufferToKeep?: number;
        enableSeekDecorrelationFix?: boolean;
        fastSwitchEnabled?: boolean;
        flushBufferAtTrackSwitch?: boolean;
        initialBufferLevel?: number;
        longFormContentDurationThreshold?: number;
        reuseExistingSourceBuffers?: boolean;
        setStallState?: boolean;
        stableBufferTime?: number;
        stallThreshold?: number;
        useAppendWindow?: boolean;
        useChangeTypeForTrackSwitch?: boolean;
      };
      cacheInitSegments?: boolean;
      cacheLoadThresholds?: {
        video?: number;
        audio?: number;
      };
      capabilities?: {
        filterUnsupportedEssentialProperties?: boolean;
        useMediaCapabilitiesApi?: boolean;
      };
      cmcd?: {
        [index: string]: any;
        enabled?: boolean;
        enabledKeys?: string[];
        mode?: string;
        rtpSafetyFactor?: number;
      };
      delay?: {
        liveDelay?: number;
        liveDelayFragmentCount?: number;
        useSuggestedPresentationDelay?: boolean;
      };
      enableManifestDurationMismatchFix?: boolean;
      eventControllerRefreshDelay?: number;
      fragmentRequestTimeout?: number;
      gaps?: {
        enableSeekFix?: boolean;
        enableStallFix?: boolean;
        jumpGaps?: boolean;
        jumpLargeGaps?: boolean;
        smallGapLimit?: number;
        stallSeek?: number;
        threshold?: number;
      };
      lastBitrateCachingInfo?: {
        enabled?: boolean;
        ttl?: number;
      };
      lastMediaSettingsCachingInfo?: {
        enabled?: boolean;
        ttl?: number;
      };
      liveCatchup?: {
        enabled?: boolean | null;
        maxDrift?: number;
        mode?: string;
        playbackBufferMin?: number;
        playbackRate?: {
          min?: number;
          max?: number;
        };
      };
      manifestRequestTimeout?: number;
      manifestUpdateRetryInterval?: number;
      metrics?: {
        maxListDepth?: number;
      };
      protection?: {
        detectPlayreadyMessageFormat?: boolean;
        ignoreEmeEncryptedEvent?: boolean;
        keepProtectionMediaKeys?: boolean;
      };
      retryAttempts?: {
        BitstreamSwitchingSegment?: number;
        FragmentInfoSegment?: number;
        IndexSegment?: number;
        InitializationSegment?: number;
        MPD?: number;
        MediaSegment?: number;
        XLinkExpansion?: number;
        license?: number;
        lowLatencyMultiplyFactor?: number;
        other?: number;
      };
      retryIntervals?: {
        BitstreamSwitchingSegment?: number;
        FragmentInfoSegment?: number;
        IndexSegment?: number;
        InitializationSegment?: number;
        MPD?: number;
        MediaSegment?: number;
        XLinkExpansion?: number;
        license?: number;
        lowLatencyMultiplyFactor?: number;
        other?: number;
      };
      scheduling?: {
        defaultTimeout?: number;
        lowLatencyTimeout?: number;
        scheduleWhilePaused?: boolean;
      };
      selectionModeForInitialTrack?: 'highestSelectionPriority' | 'highestBitrate' | 'firstTrack' | 'highestEfficiency' | 'widestRange';
      text?: {
        defaultEnabled?: boolean;
        webvtt?: {
          customRenderingEnabled?: boolean;
        };
      };
      timeShiftBuffer?: {
        calcFromSegmentTimeline?: boolean;
        fallbackToSegmentTimeline?: boolean;
      };
      trackSwitchMode?: {
        audio?: 'alwaysReplace' | 'neverReplace';
        video?: 'alwaysReplace' | 'neverReplace';
      };
      utcSynchronization?: {
        backgroundAttempts?: number;
        defaultTimingSource?: {
          scheme?: string;
          value?: string;
        };
        enableBackgroundSyncAfterSegmentDownloadError?: boolean;
        enabled?: boolean;
        maximumAllowedDrift?: number;
        maximumTimeBetweenSyncAttempts?: number;
        minimumTimeBetweenSyncAttempts?: number;
        timeBetweenSyncAttempts?: number;
        timeBetweenSyncAttemptsAdjustmentFactor?: number;
        useManifestDateHeaderTimeSource?: boolean;
      };
      wallclockTimeUpdateInterval?: number;
    };
  };
}
