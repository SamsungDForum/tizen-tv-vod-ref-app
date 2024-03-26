const PlayerType = ['shaka', 'bitmovin', 'hlsjs', 'dashjs'] as const;

type PlayerType = typeof PlayerType[number];

export type { PlayerType };