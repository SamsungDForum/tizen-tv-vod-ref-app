import Bitmovin from "../";

const destroy = function(this: Bitmovin): Promise<any> {
  this.player = this.player.then(player => new Promise(res => {
    player.unload();
    player.destroy();
    res(player);
  }));

  return this.player;
}

export default destroy;