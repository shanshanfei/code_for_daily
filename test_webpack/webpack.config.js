var path = require('path')
/*var utils = require('./utils')
var config = require('../config')*/
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  entry:  {
    //index: './index',
    help: './help'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js?[chunkhash]',
    publicPath: '/dist'
  },
  resolve: {
    alias: {
      '@': resolve('static'),
    }
  },
  module: {
    rules: [
      /*{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件
      },*/
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        //exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/static/images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.html$/,//要配置这个，因为不配置的话，HtmlWebpackPlugin插件会将模板html原样拷贝到dist目录下，html文件中image相关的不会找到对应的loader进行处理
        loader: 'html-loader',
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
      chunks: [],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: './about',
      template: './about',
      chunks: [],
      inject: true
    }),
    //new webpack.HotModuleReplacementPlugin(),//实时更新相关的，如修改css|js文件，页面实时响应
    //可以手动在plugin中添加，也可以直接在允许webpack-dev-server时，
    //后面加上参数 --hot，该参数会自动添加热更新模块插件，推荐用参数的形式，更简单方便

  ],
  /*devServer: {//感觉配置没起作用 还是要命令行参数指定靠谱
      contentBase: "./",  //以public为根目录提供文件
      historyApiFallback: true,
      inline: true,
      hot: true,
      port: 8080,//默认8080
  },*/
}
