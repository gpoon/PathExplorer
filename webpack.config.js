var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    app: "./app/main.js",
    mobile: "./app/mobile.js"
  },
  module: {
    loaders: [
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: debug ? '[name].bundle.js' : '[name].bundle.min.js'
  },
  plugins: debug ? [
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin('[name].bundle.css'),
  ] : [
    new ExtractTextPlugin('[name].bundle.min.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$', 'd3', 'd3_queue', 'exports', 'require']
      },
      sourcemap: false
    }),
  ],
};
