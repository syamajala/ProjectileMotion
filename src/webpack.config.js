var path = require('path')
var webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    home: 'home.js',
    viz: 'viz.js',
    libs: ['vue/dist/vue.common.js', 'element-ui/lib/element-ui.common.js',
           'socket.io-client/dist/socket.io.min.js', 'plotly.js/dist/plotly.min.js'],
    cesium: ['cesium/Build/Cesium/Cesium.js', 'dat.gui/build/dat.gui.min.js']
  },
  output: {
    path: path.resolve(__dirname, './static/js'),
    publicPath: '/js/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },
      { test: /Cesium\.js$/,
        loader: 'script-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./js'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  watch: true,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'libs',
      minChunks: Infinity,
      chunks: ["viz", "cesium", "home"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'cesium',
      minChunks: Infinity,
      chunks: ["viz"]
    }),
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        sourceMap: false
      }
    })
  ])
}
