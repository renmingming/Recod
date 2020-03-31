# Webpack4

1、新增sideEffects(减小打包大小)
    
    在package.json中添加
    "sideEffects": false,表示所有的代码都不包含副作用，就可以删除未用到的export导出
    "sideEffects": ["*/**/*.js","*.css"] 表示有副作用的文件

2、clean-webpack-plugin插件

    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    new CleanWebpackPlugin() // 清除指向的文件是output.path
    
3、mode为production切换为压缩输出

4、提取公共依赖模块，原来的CommonsChunkPlugin改为下面的

    optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              name: 'commons',
              chunks: 'initial', //initial \ all \ async
              minChunks: 2
            }
          }
        }
      },
      
5、webpack懒加载

    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        var print = module.default;
        print();
    })
    
6、外部化

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-lib.js',
        library: 'webpackLib.js',
        libraryTarget: 'umd'
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    }
    
7、providePlugin插件：通过访问一个变量来获取package包，移除import语句

    new webpack.ProvidePlugin({
        _: 'lodash' // 不用使用import导入lodash，可直接使用_
    })
    new webpack.ProvidePlugin({
        join: ['lodash', 'join'] // 所有地方的join方法都是lodash的join
    })