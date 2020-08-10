/**
 * Created by rengar on 2020/4/23.
 */

import {storiesOf} from '@storybook/vue'
import {action} from '@storybook/addon-actions'
import {boolean, object, text, withKnobs} from '@storybook/addon-knobs'
import {ElfinButtons, ElfinButtonsItemType} from '@packages/buttons'
import configNotes from './config.md'
import buttonNotes from './button.md'

storiesOf('组件|elfinButtons 按钮区', module)
    .addDecorator(withKnobs)
    .add('组件介绍', () => ({
        components: {ElfinButtons},
        template: `
            <div>
                <generic-container title="xjlButtons">
                    <p slot="subDocs">
                        按钮交互区域<br/>
                    </p>
                </generic-container>
                <generic-container title="组件设计">
                    <p slot="subDocs">
                        通过工厂模式设计，无需自己书写繁琐的代码，只需要通过 ElfinButtonsItemType 指定具体的按钮类型，并提供必要的数据即可<br/>
                    </p>
                </generic-container>
                <generic-container title="基本使用">
                    <elfin-buttons
                        :buttonsConfig="buttonsConfig">
                    </elfin-buttons>
                </generic-container>
            </div>
        `,
        computed: {
            buttonsConfig() {
                return [{
                    type: ElfinButtonsItemType.BUTTON,
                    itemOptions: {
                        props: {type: 'primary', icon: 'el-icon-plus'},
                        on: {
                            click: this.handleClick.bind(this),
                        },
                        scopedSlots: {
                            default() {
                                return '基础按钮'
                            },
                        },
                    },
                }]
            },
        },
        methods: {
            handleClick: action('handleClick'),
        },
    }))
    .add('通用配置', () => ({
        components: {ElfinButtons},
        props: {
            label: {
                type: String,
                default: text('label', '按钮前缀说明:'),
            },
            hidden: {
                type: String,
                default: boolean('hidden', true),
            },
        },
        computed: {
            buttonsConfig() {
                return [
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        label: this.label,
                        itemOptions: {
                            props: {type: 'primary', icon: 'el-icon-plus'},
                            on: {
                                click: this.handleClick.bind(this),
                            },
                            scopedSlots: {
                                default: () => {
                                    return '按钮'
                                },
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            props: {type: 'primary', icon: 'el-icon-plus'},
                            scopedSlots: {
                                default: () => {
                                    return '按钮2'
                                },
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        hidden: this.hidden,
                        itemOptions: {
                            props: {
                                type: 'text',
                            },
                            scopedSlots: {
                                default: () => {
                                    return '文本按钮2'
                                },
                            },
                        },
                    },
                ]
            },
        },
        methods: {
            handleClick: action('handleClick'),
        },
        template: `
            <generic-container title="通用配置">
                <p slot="subDocs">
                    - type 指定按钮的类型<br/>
                    - label 按钮的前缀说明文本<br/>
                    - hidden 按钮是否隐藏<br/>
                    - itemOptions 按钮配置JSX配置项<br/>
                    具体请查看Notes
                </p>
                <elfin-buttons
                    :buttonsConfig="buttonsConfig">
                </elfin-buttons>
            </generic-container>
        `,
    }), {notes: configNotes})
    .add('基础按钮', () => ({
        components: {ElfinButtons},
        props: {
            slotString: {
                type: String,
                default: text('slotString', '按钮'),
            },
            props: {
                type: Object,
                default: object('props', {type: 'primary', icon: 'el-icon-plus'}),
            },
            label: {
                type: String,
                default: text('label', '按钮前缀说明:'),
            },
        },
        computed: {
            buttonsConfig() {
                return [
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        label: this.label,
                        itemOptions: {
                            props: this.props,
                            on: {
                                click: this.handleClick.bind(this),
                            },
                            scopedSlots: {
                                default: () => {
                                    return this.slotString
                                },
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            props: {
                                type: 'text',
                            },
                            scopedSlots: {
                                default: () => {
                                    return '文本按钮'
                                },
                            },
                        },
                    },
                ]
            },
        },
        methods: {
            handleClick: action('handleClick'),
        },
        template: `
            <generic-container title="基础按钮">
                <p slot="subDocs">
                    可以更改props内容，观察按钮的变化;
                </p>
                <elfin-buttons
                    :buttonsConfig="buttonsConfig">
                </elfin-buttons>
            </generic-container>
        `,
    }), {notes: buttonNotes})