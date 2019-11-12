import TextAutoTooltip from './src/main';

TextAutoTooltip.install = function (Vue) {
    Vue.component(TextAutoTooltip.name, TextAutoTooltip)
}

export default TextAutoTooltip
