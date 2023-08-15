/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 先禁用vscode的prettier插件 ,format on save 关闭
    'prettier/prettier': [
      'warn',
      {
        singleQupte: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行最大宽度80字符
        trailingComma: 'none', // 不多加,
        endOfLine: 'auto' // 换行无符号限制
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名多单词组成，忽略index
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭props校验
    'no-undef': 'error' // 添加未定义变量使用后的报错
  },
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly'
  }
}
