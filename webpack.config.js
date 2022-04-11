const BoxWebpackPlugin = require('./plugin');
const path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    plugins: [new BoxWebpackPlugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  experiments: {
    // outputModule: true
  },
  output: {
    // Tell the webpack to emit our code as ES6 Modules
    // module: true,
  },


  // node: false
}
