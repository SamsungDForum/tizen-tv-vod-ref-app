import { PlayerConfig } from "../types/PlayerConfig";
import { PlayerInstance } from "./PlayerInstance";

interface Loadable {
  readonly config: PlayerConfig;
  load: () => Promise<any>;
  createPlayer(): Promise<PlayerInstance>;
}

export type { Loadable };