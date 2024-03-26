declare namespace bitmovin {
  export interface index {
    player: {
      [index: string]: any;
      Player: {
        new(element: HTMLElement, config?: object): BitmovinInstance;
      } 
    } 
  }
}
