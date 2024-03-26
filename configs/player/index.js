import * as bitmovin from "./bitmovin";
import * as hlsjs from "./hlsjs";
import * as shaka from "./shaka";
import * as dashjs from "./dashjs";

const PlayerType = {
  Shaka: shaka.type,
  Bitmovin: bitmovin.type,
  Hlsjs: hlsjs.type,
  Dashjs: dashjs.type,
};

function playerSelection() {
  return playerSelection.selection
    ? playerSelection.selection
    : (playerSelection.selection = [...bitmovin.version, ...hlsjs.version, ...shaka.version, ...dashjs.version].map(
        (versionEntry, index) => ({
          id: index,
          trackId: index,
          label: `${versionEntry.type} ${versionEntry.version}`,
          // TODO: Review inconsistant use.
          // playerSelection mimics track entry, {id, trackId, label}, however, versionEntry
          // is embedded directly into resulting object, bypassing track's trackData.
          ...versionEntry,
        })
      ));
}

function getPlayerData() {
  const playerData = [...bitmovin.version, ...hlsjs.version, ...shaka.version, ...dashjs.version];
  const transformedData = [];

  playerData.forEach((player) => {
    const index = transformedData.findIndex((item) => item.category === player.type);
    if (index === -1) {
      transformedData.push({
        category: player.type,
        options: [player.version],
      });
    } else {
      transformedData[index].options.push(player.version);
    }
  });

  return transformedData;
}

function loadPlayer() {
  const savedState = localStorage.getItem("recentPlayer");
  if (savedState !== "undefined") {
    return JSON.parse(savedState);
  }
}

function defaultPlayer() {
  return defaultPlayer.default
    ? defaultPlayer.default
    : (defaultPlayer.default = loadPlayer()
        ? loadPlayer()
        : playerSelection().find((choice) => choice.isDefault == true) ?? playerSelection()[0]);
}
export { PlayerType, playerSelection, defaultPlayer, getPlayerData };
