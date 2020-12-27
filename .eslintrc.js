const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended', // eslint-plugin-vue
    '@vue/prettier', // @vue/eslint-config-prettier 会用到eslint-plugin-prettier、eslint-config-prettier、eslint-config-prettier/vue
  ],
  rules: {
    'no-console': isProd ? 'warn' : 'off',
    'no-debugger': isProd ? 'warn' : 'off',
    'vue/no-v-html': 'error',
    'no-use-before-define': 'error',
    'no-undef': 'error',
    'no-unused-vars': 'error',
  },
  parserOptions: {
    parser: 'babel-eslint', //解析器
  },
  // 不理会（不解析）以下文件
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
