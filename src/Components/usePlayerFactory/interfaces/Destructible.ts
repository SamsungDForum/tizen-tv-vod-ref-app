interface Destructible {
  destroy(): Promise<any>;
}

export type { Destructible };