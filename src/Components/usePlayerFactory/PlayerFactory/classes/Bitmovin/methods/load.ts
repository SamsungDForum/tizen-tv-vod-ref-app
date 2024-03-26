import { loadScript } from "../../utils/loadScript";
import Bitmovin from "../";

const load = function(this: Bitmovin): Promise<any> {
  return loadScript(this.config.args.src);
}

export default load;