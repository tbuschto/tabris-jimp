const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.ts',
    worker: './src-image-worker/index.ts'
  },
  externals: ['tabris', 'tabris-decorators'],
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process'
    }),
  ],
  devtool: 'source-map',
  mode: 'development', // Preserve class names needed in tabris-decorators
  output: {
    libraryTarget: 'commonjs2',
    filename: "[name].js",
    path: __dirname + '/dist',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      querystring: 'querystring-es3',
      http: 'stream-http',
      https: 'https-browserify'
    },
    fallback: {
      fs: false
    },
    plugins: []
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}
