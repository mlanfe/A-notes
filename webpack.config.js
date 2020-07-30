const path = require('path')  //nodejs语法,path是一个模块
const webpack = require('webpack') //为了使用BannerPlugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: 'dist/'   //在所有url前面加上这个路径, 若引用出口文件的html不在相同目录下,需要设置此项
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader只负责将css文件进行加载
        // style-loader负责将样式添加到DOM中
        // 使用多个loader时, 是从右向左,所以css-loader必须在style-loader后面
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader", // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader", // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片, 小于limit时, 会将图片编译成base64字符串形式.
              // 当加载的图片, 大于limit时, 需要使用file-loader模块进行加载,重新生成图片文件
              // file-loader只需要安装不需要配置
              // 使用file-loader后,会在dist文件夹下自动生成图片文件,图片名字是32为的hash值
              // 利用下面的name属性,可以对生成的图片文件重命名
              limit: 13000, //通常设置为8kb,即limit: 8192
              // 为图片重命名为:原来的名字.8位hash值.图片的后缀名, 并创建img文件夹来存放图片
              name: 'img/[name].[hash:8].[ext]'
            },
          }
        ]
      },
      {
        test: /\.js$/,
        // exclude: 排除
        // include: 包含
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        //更高版本的vue-loader使用时要配合插件使用,详见官方文档
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    // 使js文件、css文件、vue文件的后缀名可以省略
    extensions: ['.js', '.css', '.vue'],
    alias: {
      // 指定要使用的vue的版本
      // import Vue from 'vue'是import Vue from "../node_modules/vue/dist/vue.js"的简写
      // 配置了alias(别名)后,就等价于import Vue from "../node_modules/vue/dist/vue.esm.js"
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
      new webpack.BannerPlugin('最终版权归aaa所有'), //声明版权
      new HtmlWebpackPlugin({         //在dist文件夹中生成html
        template: 'index.html'
      }),
      new UglifyjsWebpackPlugin()   //压缩js文件
  ],
  // 搭建本地服务器
  devServer: {
    contentBase: './dist',
    inline: true
  }
}





