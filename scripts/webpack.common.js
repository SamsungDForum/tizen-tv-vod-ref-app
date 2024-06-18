/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const devServer = require("./webpack.devserver").devServer;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const webpack = require("webpack");
const tag = [path.parse(__filename).name];

const projectRoot = path.join(__dirname, "..");



module.exports = (env) => {
  console.log(tag, env);

  const config = {
    mode: env.production ? "production" : env.development ? "development" : "none",

    devServer: require("./webpack.devserver").devServer,
    devtool: false,
    context: path.join(projectRoot, "src"),

    entry: "./index.js",

    optimization: {
      minimize: false,
      moduleIds: "named",
      chunkIds: "named",
      usedExports: true,
      providedExports: true,
      mangleExports: false,

      splitChunks: {
        chunks: "all",
        cacheGroups: {
          defaultVendors: {
            // Note the usage of `[\\/]` as a path separator for cross-platform compatibility.
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
          },
        },
      },
    },

    output: {
      assetModuleFilename: "[name][ext]",
      publicPath: "auto",
      path: path.resolve(projectRoot, "dist"),
      clean: true,
      crossOriginLoading: "anonymous",
      asyncChunks: true,
    },

    target: "browserslist:chrome 47",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /\.?js$/,
          include: [
            path.resolve(projectRoot, "node_modules", "react-redux", "es"),
            path.resolve(projectRoot, "node_modules", "d3-array", "src"),
            path.resolve(projectRoot, "node_modules", "d3-brush", "src"),
            path.resolve(projectRoot, "node_modules", "d3-path", "src"),
            path.resolve(projectRoot, "node_modules", "d3-scale", "src"),
            path.resolve(projectRoot, "node_modules", "d3-zoom", "src"),
            path.resolve(projectRoot, "node_modules", "internmap", "src"),
            path.resolve(projectRoot, "node_modules", "swiper"),
            path.resolve(projectRoot, "node_modules", "react-hot-toast", "dist"),
            path.resolve(projectRoot, "node_modules", "goober", "dist"),
          ],
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: { browsers: ["chrome 47"] } }]],
            },
          },
        },
        {
          test: /\.?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(scss|sass|css)$/,
          exclude: /\.module\.(scss|sass|css)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(scss|sass|css)$/,
          include: /\.module\.(scss|sass|css)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: {
                  localIdentName: "[local]--[hash:base64:5]",
                  exportLocalsConvention: "camelCase",
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /assets/,          
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        test: /\.(js|jsx|ts|tsx|scss|sass|css)$/,
      }),

      new HtmlWebpackPlugin({
        template: path.join(projectRoot, "src", "index.html"),
      }),
      new CopyPlugin({
        patterns: [         
          {
            from: path.resolve(projectRoot, "src", "services", "staticPreview"),
            to: "staticPreview/",
          },
          {
            from: path.resolve(projectRoot, "src", "services", "dynamicPreview"),
            to: "dynamicPreview/",
          },
        ],
      }),
      new StylelintPlugin(),
    ],
  };

  return config;
};
