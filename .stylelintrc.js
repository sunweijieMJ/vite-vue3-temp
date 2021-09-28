const { off } = require('process');

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-order'],
  rules: {
    indentation: 2, // 指定缩进
    'max-nesting-depth': 10, // 限制嵌套深度
    'selector-max-id': 6, // 限制选择器中 ID 选择器的数量
    'selector-max-compound-selectors': 10, // 限制选择器中复合选择器的数量
    'selector-class-pattern': '^[a-z][a-zA-Z0-9_-]+$|^el-|^mz-', // 为类选择器指定一个匹配模式
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep'] },
    ], // 禁止未知的伪类选择器

    // "at-rule-empty-line-before": "never", // 在at-rules之前要求或禁止空行(Autofixable)
    // "at-rule-name-case": "lower", // 为at-rules名称指定小写或大写(Autofixable)
    // "at-rule-name-space-after": "always", // 在规则名称后面需要一个空格(Autofixable)
    // // "at-rule-no-unknown": true, // 禁止未知的规则
    // "at-rule-no-vendor-prefix": true, // 禁止at-rules的供应商前缀
    // "at-rule-semicolon-newline-after": "always", // 在at-rules分号后面需要换行符(Autofixable)
    // "at-rule-semicolon-space-before": "never", // 在at-rules的分号前需要单个空格或禁止空格
    // "block-closing-brace-empty-line-before": "never", // 在块的右大括号(Autofixable)之前需要或禁止空行
    // "block-no-empty": true, // 禁止空块
    // "color-hex-case": "lower", // 为十六进制颜色指定小写或大写(自动固定)
    // "color-hex-length": "short", // 为十六进制颜色指定短或长符号(自动固定)
    // "color-named": "never", // 要求(如果可能)或禁止命名颜色
    // "color-no-invalid-hex": true, // 禁止无效的十六进制颜色
    // "comment-no-empty": true, // 禁止空评论
    // "declaration-bang-space-after": "never", // 声明爆炸后需要一个空格或不允许空格(Autofixable)
    // "declaration-block-no-duplicate-properties": true, // 禁止声明块中的重复属性
    // "declaration-block-no-redundant-longhand-properties": true, // 禁止可以合并为一个速记属性的longhand属性
    // "declaration-block-no-shorthand-property-overrides": true, // 禁止覆盖相关的手写属性的速记属性
    // "declaration-block-semicolon-newline-before": "never-multi-line", // 在声明块的分号之前需要换行符或禁止空格
    // "declaration-block-trailing-semicolon": "always", // 在声明块(Autofixable)中要求或禁止使用尾随分号.
    // "declaration-empty-line-before": "never", // 声明前需要或禁止空行(Autofixable)
    // "font-family-no-duplicate-names": true, // 禁止重复的字体系列名称
    // "font-weight-notation": "numeric", // 需要数字或命名(如果可能)font-weight值.此外,当需要命名值时,只需要有效名称.
    // "function-calc-no-invalid": true, // 禁止calc函数内的无效表达式
    // "function-calc-no-unspaced-operator": true, // 禁止calc函数内的未空格运算符
    // "function-linear-gradient-no-nonstandard-direction": true, // 禁用linear-gradient()根据标准语法无效的调用中的方向值
    // "function-max-empty-lines": 0, // 限制函数内的相邻空行数(自动固定)
    // "function-name-case": "lower", // 为函数名称指定小写或大写(Autofixable)
    // "function-url-quotes": "always", // 要求或禁止网址的引号.
    // "function-whitespace-after": "always", // 在函数(Autofixable)之后需要或禁止空格
    // "indentation": 4, // 指定缩进(Autofixable)
    // "length-zero-no-unit": true, // 禁止零长度的单位(自动固定)
    // "linebreaks": "unix", // 指定unix或windows linebreaks(Autofixable)
    // "max-empty-lines": 3, // 限制相邻空行的数量
    // "max-nesting-depth": 10, // 限制嵌套深度
    // "media-feature-name-case": "lower", // 为媒体功能名称指定小写或大写(自动固定)
    // "media-feature-name-no-unknown": true, // 禁止未知的媒体功能名称
    // "media-feature-name-no-vendor-prefix": true, // 禁止媒体功能名称的供应商前缀.
    // "no-descending-specificity": true, // 不允许选择具有较低特异性的选择子来覆盖更高特异性的选择者
    // "no-duplicate-at-import-rules": true, // 禁止@import样式表中的重复规则
    // "no-duplicate-selectors": true, // 禁止样式表中的重复选择器
    // "no-empty-source": true, // 禁止空来源
    // "no-extra-semicolons": true, // 禁止使用额外的分号(Autofixable)
    // "no-unknown-animations": true, // 禁止未知的动画
    // "number-leading-zero": "always", // 要求或禁止小于1的小数的前导零(自动固定)
    // "number-max-precision": 3, // 限制数字中允许的小数位数
    // "number-no-trailing-zeros": true, // 禁止数字尾随零(自动固定)
    // "property-case": "lower", // 为属性指定小写或大写(Autofixable)
    // "property-no-unknown": true, // 禁止未知属性
    // "property-no-vendor-prefix": true, // 禁止属性的供应商前缀
    // "selector-no-vendor-prefix": true, // 禁止选择器的供应商前缀
    // "selector-pseudo-class-case": "lower", // 为伪类选择器指定小写或大写(Autofixable)

    // "selector-pseudo-element-case": "lower", // 为伪元素选择器指定小写或大写
    // "selector-pseudo-element-no-unknown": true, // 禁止未知的伪元素选择器
    // "selector-type-case": "lower", // 为类型选择器指定小写或大写(Autofixable)
    // "selector-type-no-unknown": true, // 禁止未知类型选择器
    // "shorthand-property-no-redundant-values": true, // 禁止速记属性中的冗余值(自动固定)
    // "string-no-newline": true, // 禁止(未转义)字符串中的换行符
    // "unit-case": "lower", // 为单位指定小写或大写(自动固定)
    // // "unit-no-unknown": true, // 禁止未知单位
    // "value-keyword-case": "lower", // 为关键字值指定小写或大写(自动固定)
    // "value-list-max-empty-lines": 0, // 限制值列表中相邻空行的数量(自动固定)
    // "value-no-vendor-prefix": true // 禁止值的供应商前缀
  },
};
