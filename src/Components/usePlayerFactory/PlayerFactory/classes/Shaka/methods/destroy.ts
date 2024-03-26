import Shaka from "../";

const destroy = function(this: Shaka): Promise<any> {
  this.player = this.player.then(player => new Promise(res => {
    player.detach()
      .then(() => player.destroy())
      .then(() => res(player));
  }));
  
  return this.player;
}

export default destroy;