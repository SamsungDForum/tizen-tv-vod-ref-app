const devServer = {
  static: false,
  hot: true,
  compress: true,
  host: "0.0.0.0",
  port: 8081,
  client: {
    logging: "info",
    overlay: true,
  },
  server: {
    type: "http",
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

module.exports = {
  devServer: devServer,
};