import { PlayerType } from "./PlayerType";

type PlayerConfig = {
  id: number;
  trackId: number;
  label: string;
  type: PlayerType;
  version: string;
  args: {
    src: string;
  };
  isDefault: boolean;
};

export type { PlayerConfig };