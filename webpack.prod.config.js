var path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCommon = new ExtractTextPlugin({
  filename: 'pilipa.min.css',
  allChunks: true
})
module.exports = {
  entry: './index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pilipa.min.js',
    library: 'pilipa',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'source-map-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          'tslint-loader'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: extractCommon.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap=true',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: extractCommon.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[local]-[hash:base64:5]',
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'stylus-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|git)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    extractCommon,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      },
      sourceMap: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/(font-awesome)/)
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.min.js', '.styl', '.css']
  }
}
