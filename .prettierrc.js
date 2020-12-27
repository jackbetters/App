module.exports = {
  printWidth: 100, // 每行到多少长度开始折行
  tabWidth: 2, // tab键长度
  useTabs: false, // 使用tab（制表符）缩进而非空格
  semi: true, // 是否在行尾加分号
  singleQuote: true, // 字符串默认使用单引号
  quoteProps: 'as-needed', //自定义引号配置
  jsxSingleQuote: false, // 在JSX中使用单引号
  trailingComma: 'es5', // 数组、对象最后一个元素的尾逗号
  bracketSpacing: true, // 花括号前后空格
  jsxBracketSameLine: false, //使多行JSX元素最后一行末尾的 > 单独一行
  arrowParens: 'avoid', // 箭头函数当只有一个参数时不带括号
  htmlWhitespaceSensitivity: 'ignore', //为 HTML 文件定义全局空格敏感度
  vueIndentScriptAndStyle: true,
  endOfLine: 'auto', // window和mac换行方式不同，使用auto不报错
};