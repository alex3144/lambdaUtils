const path = require('path');

const webpack = require('webpack');
const slsw = require('serverless-webpack');

const service = process.env.SERVICE_NAME;
if (!service && 0) {
  throw 'You must specify a SERVICE_NAME env variable';
}

module.exports = {
  entry: slsw.lib.entries,
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  mode: 'development',
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
  ],
};
