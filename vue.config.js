const path = require('path');
const events = require('events');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

events.EventEmitter.defaultMaxListeners = 0; // Possible EventEmitter memory leak detected 关闭内存泄漏警告

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isDevEnv = process.env.NODE_ENV === 'development';

// const mockServer = () => (isDevEnv ? require('./mock/mock-server.js') : '');

// const target = 'https://dev.shanglike.com';
// const target = 'https://test.shanglike.com';

module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  lintOnSave: isDevEnv, // 开发环境，保存时进行eslint检查
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  outputDir: 'docs', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录

  devServer: {
    hot: true,
    open: true,
    noInfo: false,
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false, // 编译警告
      errors: true,
    },
    // after: mockServer(),
    // proxy: {
    //   '/bnd-uaac': {
    //     target,
    //     changeOrigin: true,
    //   },
    // },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
        resolve('./src/styles/variables.less'),
      ],
    },
  },
  chainWebpack: config => {
    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-source-map')
    );

    if (process.env.NODE_ENV !== 'development') {
      // gzip需要nginx进行配合
      config
        .plugin('compression')
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 超过10k进行压缩
            deleteOriginalAssets: false, // 是否删除源文件
          },
        ]);
    }
  },

  configureWebpack: {
    entry: {
      app: './src/main.js',
    },
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
      extensions: ['.js', '.vue', '.json', '.css', '.node'],
    },
    optimization: {
      // 模块抽离
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minChunks: 1,
        cacheGroups: {
          vant: {
            test: /[\\/]node_modules[\\/]_?vant(.*)/,
            priority: -5,
          },
          libs: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          commons: {
            test: resolve('./src/components'), // can customize your rules
            priority: -15,
          },
          async: {
            chunks: 'async',
            maxAsyncRequests: 10,
            priority: -20,
          },
          default: {
            priority: -25,
            reuseExistingChunk: true,
            minChunks: 2,
          },
        },
      },
    },
  },
};
