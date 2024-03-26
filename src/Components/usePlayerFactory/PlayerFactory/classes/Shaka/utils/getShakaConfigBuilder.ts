import { playerConfig } from "../../../../../../../configs/player/shaka";
import configBuilder from "../../../../../../../libs/config-builder/shaka/builder";

const getShakaConfigBuilder = () => configBuilder(playerConfig);

export { getShakaConfigBuilder };