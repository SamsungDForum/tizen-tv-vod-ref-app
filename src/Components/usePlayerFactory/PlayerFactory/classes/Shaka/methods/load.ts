import { loadScript } from "../../utils/loadScript";
import Shaka from "../";

const load = function(this: Shaka): Promise<any> {
  return loadScript(this.config.args.src);
}

export default load;