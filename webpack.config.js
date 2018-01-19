var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCommon = new ExtractTextPlugin({
  filename: '[name][contenthash].css',
  allChunks: true
});
module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pilipa.bundle.js'
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
        test: /\.css$/,
        exclude: /node_modules/,
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
                modules: true,
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'true',
      favicon: null
    }),
    extractCommon
  ]
}