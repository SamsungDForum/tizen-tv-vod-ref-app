import { loadScript } from "../../utils/loadScript";
import Dashjs from "../";

const load = function(this: Dashjs): Promise<any> {
  return loadScript(this.config.args.src);
}

export default load;