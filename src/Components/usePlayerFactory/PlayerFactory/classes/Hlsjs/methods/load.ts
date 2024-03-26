import { loadScript } from "../../utils/loadScript";
import Hlsjs from "..";

const load = function(this: Hlsjs): Promise<any> {
  return loadScript(this.config.args.src);
}

export default load;