import {storiesOf} from '@storybook/vue'
import { withOptions } from '@storybook/addon-options'
import navConfig from './nav.config'
import ElementComponent from './element'

loopConfigs(navConfig['zh-CN'])

// 迭代遍历具有path路径的节点 & 注册story
function loopConfigs(configs) {
    for (let l = configs.length, i = 0; i < l; i++) {
        const config = configs[i]
        if (config.path) {
            registerStory(config)
            continue
        }
        const keys = Object.keys(config)
        for (let j = keys.length, k = 0; k < j; k++) {
            if (Object.prototype.toString.call(config[keys[k]]) === '[object Array]') {
                loopConfigs(config[keys[k]])
            }
        }
    }
}

// 注册story
function registerStory(config) {
    storiesOf('Element', module)
        .addDecorator(
            withOptions({
                showPanel: false,
            })
        )
        .add(config.name || config.title, () => ({
            render: h => h(ElementComponent, {
                props: {
                    src: `http://ui.huisaas.com/element/zh-CN/component${config.path}`,
                },
            }),
        }))
}