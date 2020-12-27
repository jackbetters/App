module.exports = {
    // 继承以下规则
    extends: [
      'stylelint-config-standard',
      'stylelint-config-recess-order', // 依赖 stylelint-order
    ],
    // 自定义的规则
    rules: {
      'at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: ['mixin', 'extend', 'content', 'include', 'for', 'function', 'return'],
        },
      ],
      'selector-pseudo-element-no-unknown': [
        true,
        {
          ignorePseudoElements: ['v-deep'],
        },
      ],
      'selector-pseudo-class-no-unknown': [
        true,
        {
          ignorePseudoClasses: ['export'],
        },
      ],
      indentation: 2,
      'no-descending-specificity': null,
      'declaration-colon-newline-after': null,
    },
    ignoreFiles: ['**/*.js', 'dist/*.*', 'node_modules', '**/*.ts', '**/*.md'],
  };