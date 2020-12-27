// const path = require('path');

module.exports = (/* { file } */) => {
  // 默认750， vant的设计稿是375需要特殊处理
  // const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;

  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        viewportWidth: 375, // UI设计稿的宽度
        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
        selectorBlackList: ['ignore'], // 指定不转换为视窗单位的类名，正则匹配
        // unitToConvert: 'px', // 要转换的单位，默认是'px'
        // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        // propList: ['*', '!letter-spacing'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        // viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        // fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        // minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        // mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
        // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
        // landscape: false, // 是否处理横屏情况
      },
    },
  };
};
