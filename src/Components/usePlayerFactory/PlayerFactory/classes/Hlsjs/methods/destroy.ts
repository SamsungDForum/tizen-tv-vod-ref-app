import Hlsjs from "../";

const destroy = function(this: Hlsjs): Promise<any> {
  this.player = this.player.then(player => new Promise(res => {
    player.detachMedia();
    player.destroy();
    res(player);
  }));

  return this.player; 
}

export default destroy;