var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: [
        __dirname + '/index.ts'
  ],
  target: 'node',
  devtool: 'sourcemap',
  output: {
    path: __dirname,
    filename: 'index.js',
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|sass|html)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
   module : {
        loaders: [
            {
                test: /\.ts?$/,
                loader : 'ts-loader',
                exclude: /node_modules/,
            },
            {
                 test: /\.json$/, loader: 'json-loader'
            }
        ]
    },
    resolve : {
       extensions: ['', '.js', '.webpack.js', '.ts'],
    },

    node: {
     console: true
    },
};
