/**
 * Created by rengar on 2020/9/2.
 */
import Vue from 'vue';
import {storiesOf} from '@storybook/vue';
import {withKnobs} from '@storybook/addon-knobs';
import {ElfinActionSheet} from '@packages/action-sheet';
import notes from './index.md';
import {action} from '@storybook/addon-actions/dist/index';

Vue.use(ElfinActionSheet);

storiesOf('组件|elfinActionSheet 动作面板', module)
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
                        - options.props: 动作面板的props内容，详细请查看Notes<br/>
                        - options.on: 动作面板的on内容，可以在Actions面板查看事件<br/>
                    </p>
                    <el-button @click="handleClick">基本使用</el-button>
                    <el-button @click="handleClick1">展示取消按钮</el-button>
                    <el-button @click="handleClick2">展示描述信息</el-button>
                </generic-container>
                <generic-container title="选项状态">
                    <p slot="subDocs">
                        可以通过 loading 和 disabled 将选项设置为加载状态或禁用状态，或者通过color设置选项的颜色
                    </p>
                    <el-button @click="handleClick3">选项状态</el-button>
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
                    on: {
                        select: this.handleSelect.bind(this),
                    },
                });
            },
            handleClick1() {
                this.$actionSheet({
                    props: {
                        actions: [
                            {name: '选项1'},
                            {name: '选项2'},
                        ],
                        cancelText: '取消',
                        closeOnClickAction: true,
                    },
                    on: {
                        select: this.handleSelect.bind(this),
                        cancel: this.handleCancel.bind(this),
                    },
                });
            },
            handleClick2() {
                this.$actionSheet({
                    props: {
                        actions: [
                            {name: '选项1'},
                            {name: '选项2'},
                        ],
                        cancelText: '取消',
                        description: '这是一段描述信息',
                        closeOnClickAction: true,
                    },
                    on: {
                        select: this.handleSelect.bind(this),
                        cancel: this.handleCancel.bind(this),
                    },
                });
            },
            handleClick3() {
                this.$actionSheet({
                    props: {
                        actions: [
                            {name: '着色选项', color: '#ee0a24'},
                            {name: '禁用选项', disabled: true},
                            {name: '加载选项', loading: true},
                        ],
                        cancelText: '取消',
                        closeOnClickAction: true,
                    },
                });
            },
            handleCancel: action('handleCancel'),
            handleSelect: action('handleSelect'),
        },
    }), {notes});
