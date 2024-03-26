import Dashjs from "../";

const destroy = function(this: Dashjs): Promise<any> {
  this.player = this.player.then(player => new Promise(res => {
    player.destroy();
    res(player);
  }));

  return this.player;
}

export default destroy;