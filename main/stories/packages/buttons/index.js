/**
 * Created by rengar on 2020/4/23.
 */

import {storiesOf} from '@storybook/vue'
import {action} from '@storybook/addon-actions'
import {boolean, object, text, withKnobs} from '@storybook/addon-knobs'
import {ElfinButtons, ElfinButtonsItemType} from '@packages/buttons'
import configNotes from './config.md'
import buttonNotes from './button.md'
import checkboxNotes from './checkbox.md'

storiesOf('组件|elfinButtons 按钮区', module)
    .addDecorator(withKnobs)
    .add('组件介绍', () => ({
        components: {ElfinButtons},
        template: `
            <div>
                <generic-container title="elfinButtons">
                    <p slot="subDocs">
                        按钮交互区域<br/>
                        通过高度集中的工厂模式设计，无需关心底层实现，只需要通过 ElfinButtonsItemType 指定具体的按钮类型，并提供必要的数据即可<br/>
                    </p>
                </generic-container>
                <generic-container title="基本使用">
                    <elfin-buttons
                        :buttonsConfig="buttonsConfig">
                    </elfin-buttons>
                </generic-container>
                <generic-container title="兼容向上扩展">
                    <p slot="subDocs">
                        缺点:<br/>
                        由于组件内部高度集中，导致 item 只能横向扩展、向下扩展，向上扩展能力只能兼容<br/>
                    </p>
                    <elfin-buttons
                        :buttonsConfig="buttonsConfig2">
                    </elfin-buttons>
                </generic-container>
            </div>
        `,
        computed: {
            buttonsConfig() {
                return [
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            props: {type: 'primary', icon: 'el-icon-plus'},
                            renderSlot() {
                                return '基础按钮'
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.CHECKBOX,
                        itemOptions: {
                            renderSlot() {
                                return '单选框'
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BADGE,
                        itemOptions: {
                            props: {
                                value: 12,
                            },
                            renderSlot(h) {
                                return [
                                    h('el-button', 'badge按钮'),
                                ]
                            },
                        },
                    },
                ]
            },
            buttonsConfig2() {
                return [
                    {
                        type: ElfinButtonsItemType.BADGE,
                        itemOptions: {
                            props: {
                                value: 12,
                            },
                            renderSlot(h) {
                                return [
                                    h('el-button', 'badge按钮'),
                                ]
                            },
                        },
                    },
                ]
            },
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
                            renderSlot() {
                                return '按钮'
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            props: {type: 'primary', icon: 'el-icon-plus'},
                            renderSlot() {
                                return '按钮2'
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
                            renderSlot() {
                                return '文本按钮2'
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
                            renderSlot: () => {
                                return this.slotString
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            props: {
                                type: 'text',
                            },
                            renderSlot() {
                                return '文本按钮'
                            },
                        },
                    },
                ]
            },
            buttonsConfig2() {
                return [
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            renderSlot() {
                                return '默认'
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            props: {
                                size: 'medium',
                            },
                            renderSlot() {
                                return 'medium'
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            props: {
                                size: 'small',
                            },
                            renderSlot() {
                                return 'small'
                            },
                        },
                    },
                    {
                        type: ElfinButtonsItemType.BUTTON,
                        itemOptions: {
                            props: {
                                size: 'mini',
                            },
                            renderSlot() {
                                return 'mini'
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
            <div>
                <generic-container title="基础按钮">
                    <p slot="subDocs">
                        可以更改props内容，观察按钮的变化;
                    </p>
                    <elfin-buttons
                        :buttonsConfig="buttonsConfig">
                    </elfin-buttons>
                </generic-container>
                <generic-container title="不同尺寸">
                    <p slot="subDocs">
                        按钮未设置固定高度，通过padding撑开，默认padding: 10px 15px; <br/>
                        默认尺寸和 medium 相同 <br/>
                        全部尺寸包含：medium、small、mini，通过设置size属性来配置它们。<br/>
                        整个按钮区的高度由内部按钮撑开，默认居中对齐
                    </p>
                    <elfin-buttons
                        :buttonsConfig="buttonsConfig2">
                    </elfin-buttons>
                </generic-container>
            </div>
        `,
    }), {notes: buttonNotes})
    .add('单选框', () => ({
        components: {ElfinButtons},
        props: {
            slotString: {
                type: String,
                default: text('slotString', '单选框'),
            },
            props: {
                type: Object,
                default: object('props', {disabled: false, border: false}),
            },
            label: {
                type: String,
                default: text('label', '按钮前缀说明:'),
            },
        },
        computed: {
            buttonsConfig() {
                return [{
                    type: ElfinButtonsItemType.CHECKBOX,
                    label: this.label,
                    itemOptions: {
                        props: this.props,
                        on: {
                            change: this.handleChgCheckBox.bind(this),
                        },
                        renderSlot: () => {
                            return this.slotString
                        },
                    },
                }]
            },
        },
        methods: {
            handleChgCheckBox: action('handleChgCheckBox'),
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
    }), {notes: checkboxNotes})