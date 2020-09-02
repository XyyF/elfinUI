/**
 * Created by rengar on 2020/9/2.
 */
import Vue from 'vue'
import {storiesOf} from '@storybook/vue'
import {withKnobs} from '@storybook/addon-knobs'
import {ElfinActionSheet} from '@packages/action-sheet'
import notes from './index.md'

Vue.use(ElfinActionSheet)

storiesOf('组件|actionSheet 动作面板', module)
    .addDecorator(withKnobs)
    .add('组件介绍', () => ({
        template: `
            <div>
                <generic-container title="actionSheet">
                    <p slot="subDocs">
                        统一的动作面板调用方式<br/>
                        actionSheet以单例模式进行设计，通过Vue.use()在prototype注册实例属性$actionSheet<br/>
                        在第一次使用前不会进行任何的DOM操作<br/>
                    </p>
                </generic-container>
                <generic-container title="适用场景">
                    <p slot="subDocs">
                        需要通过动作面板，展示相关的列表信息，如电话列表等信息
                    </p>
                </generic-container>
                <generic-container title="基本使用">
                    <p slot="subDocs">
                        this.$actionSheet(options)<br/>
                        - options: 动作面板的jsx渲染内容，详细请查看Notes<br/>
                    </p>
                    <el-button @click="handleClick">点击调起动作面板</el-button>
                </generic-container>
            </div>
        `,
        methods: {
            handleClick() {
                this.$actionSheet({
                    props: {
                        actions: [
                            {name: '选项1'},
                            {name: '选项2'},
                        ],
                    },
                })
            },
        },
    }), {notes})