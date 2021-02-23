const path = require("path");
const webpack = require("webpack");

// required modules to read config yaml file
const yaml = require('js-yaml');
const fs   = require('fs');

try {
  const config = yaml.load(fs.readFileSync('./../config/config.yml', 'utf8'));
  host_ip = config.host.ip; // get IP address from config file
} catch (e) {
  console.log(e);
}


module.exports = {
  externals: {
      'Config': JSON.stringify({
          HostIP: host_ip,
      })
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};