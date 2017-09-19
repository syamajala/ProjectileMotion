const path = require('path')
const resolve = require('path').resolve
const webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')

module.exports = (options = {}) => ({
  entry: {
    home: './js/home.js',
    viz: './js/viz.js',
    libs: ['vue/dist/vue.common.js', 'element-ui/lib/element-ui.common.js',
           'socket.io-client/dist/socket.io.js', 'plotly.js/dist/plotly.min.js'],
    cesium: ['cesium/Build/Cesium/Cesium.js', 'dat.gui/build/dat.gui.min.js',
             'ccapture.js/build/CCapture.all.min.js']
  },
  output: {
    path: resolve(__dirname, './static/js'),
    filename: '[name].js',
    publicPath: '/js/'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /Cesium\.js$/,
        loader: 'script-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
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
  ],
  resolve: {
    modules: [
      resolve('./js'),
      resolve('./node_modules')
    ],
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    compress: true,
    contentBase: path.join(__dirname, 'templates'),
    proxy: {
      "/socket.io": "http://127.0.0.1:8081"
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
