/**
 * Created by Caleb123 on 2016/3/18.
 */

var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH  = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEM_PATH = path.resolve(APP_PATH,'templates');
module.exports = {

    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry:{
        app:path.resolve(APP_PATH,'index.js'),
        test: path.resolve(APP_PATH,'index.js')//['react']
    }, //项目文件夹
    devtool: 'eval-source-map',
    output:{ //输出的文件名 合并以后的js会命名为bundle.js
        path:BUILD_PATH,
        filename:'[name]_[hash].js',
        libraryTarget:'umd',
        umdNameDefine:true
    },
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        proxy: {
            '/api/*': { //  ==/api/*的请求都代理到http://localhost:5000去了
                target: 'http://localhost:5000',
                secure: false
            }
        }
    },
    module:{
    perLoaders: [
        {
            test: /\.jsx?$/,
            include: APP_PATH,
            loader: 'jshint-loader'
        }
    ],
      loaders:[
        {
            test:/\.(png|jpg)$/,
            loader:'url?limit=40000'
        },
          {
              test: /\.less$/,
              loaders: ['less'],
              include: APP_PATH
          },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: APP_PATH,
          exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: APP_PATH
        },

          {
          test: /\.css$/,
          loaders: ['style', 'css'], //运行顺序从右到左
          include: APP_PATH
      }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    //配置jshint的选项，支持es6的校验
    jshint: {
        "esnext": true
    },
    plugins:[ //添加我们的插件 会自动生成一个html文件
        new HtmlwebpackPlugin({
            title:'Hello World app ',
            template:path.resolve(TEM_PATH,'index.html'),
            filename: 'index.html',
            chunks:['app'], //引用的entry的入口
            inject:'body' //script插入的标签
        }),
        new HtmlwebpackPlugin({
            title:'Hello test  app ',
            template:path.resolve(TEM_PATH,'test.html'),
            filename: 'test.html',
            chunks:['test'], //引用的entry的入口
            inject:'body' //script插入的标签
        })

        //这个使用uglifyJs压缩你的js代码
        //,new webpack.optimize.UglifyJsPlugin({minimize: true}),
            //把入口文件里面的数组打包成verdors.js
        //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

    ]
};