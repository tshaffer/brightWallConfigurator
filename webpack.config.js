/* eslint-disable @typescript-eslint/no-var-requires */
var webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    libraryTarget: 'umd',
    publicPath: './build/',
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  mode: 'development',

  target: 'web',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: 'build/bundle.js', to: '../../../Projects/fb1639/bs-device-artifacts/static/brightWallConfigurator/build' },
      ]
    })
  ]
};
