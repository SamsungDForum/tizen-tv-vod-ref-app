const playerConfig = {
  streaming: {
    bufferingGoal: 120,
  },
  // Have cake and it it too, not exactly can do.
  // https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.PlayerConfiguration
  // https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:AdaptationEvent
  // Either:
  //  - abr with preferred audio/subtitle languages specified in config prior to content startup. Preference parameters
  //    are not runtime changeable.
  //  - audio/subtitle languages and variants set at runtime. No abr. Console logs warns about it disabling abr at first
  //    attempt.
  // Disable abr in config. There'll be no "auto" option for shaka.
  abr: {
    enabled: false,
  },
};

const type = "shaka";

// https://github.com/shaka-project/shaka-player
const version = [
  {
    type: type,
    version: "4.2.1",
    args: {
      src: "https://cdn.jsdelivr.net/npm/shaka-player@4.2.1/dist/shaka-player.compiled.min.js",
    },
  },
  {
    type: type,
    version: "4.2.1 debug",
    args: {
      src: "https://cdn.jsdelivr.net/npm/shaka-player@4.2.1/dist/shaka-player.compiled.debug.js",
    },
    isDefault: true,
  },
];

export { playerConfig, type, version };
