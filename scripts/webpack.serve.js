const path = require("path");
const webpackCommonConfig = require("./webpack.common.js");
const tag = [path.parse(__filename).name];

module.exports = (env) => {
  const config = webpackCommonConfig(env);

  if (env.host) {
    config.devServer.host = env.host;
    delete env.host;
  }

  if (env.port) {
    config.devServer.port = env.port;
    delete env.port;
  }

  return config;
};
