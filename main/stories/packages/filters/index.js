/**
 * Created by rengar on 2020/08/29.
 */
import {storiesOf} from '@storybook/vue'
import {text, withKnobs} from '@storybook/addon-knobs';
import {decorate} from '@storybook/addon-actions'
import {ElfinFilterGroup, ElfinFilterItem, ElfinFilterItemType, ElfinFilters,} from '@packages/filters'
import notes from './index.md'

// 装饰器：返回第一个参数
const firstArgDecorate = decorate([args => {
    return Array.isArray(args[0]) ? args[0] : [args[0]]
}]);

storiesOf('组件|elfinFilters 筛选区', module)
// 注册props knobs插件
    .addDecorator(withKnobs)
    .add('组件介绍', () => ({
        components: {ElfinFilters, ElfinFilterGroup, ElfinFilterItem},
        template: `
            <div>
                <generic-container title="ElfinFilters">
                    <p slot="subDocs">
                        筛选组合功能区域
                    </p>
                </generic-container>
                <generic-container title="适用场景">
                    <p slot="subDocs">
                        低量筛选：直接将所有筛选项放入高频筛选区即可<br/>
                        高量筛选：需要根据业务区分筛选项区域
                    </p>
                </generic-container>
                <generic-container title="组件设计">
                    <p slot="subDocs">
                        区域分为：outer高频筛选区、default默认收缩筛选区<br/>
                        包含：单选下拉框、时间范围筛选、时间筛选
                    </p>
                </generic-container>
                <generic-container title="基本使用">
                    <p slot="subDocs">
                        使用高频筛选区 + 筛选开关按钮
                    </p>
                    <elfin-filters v-model="filterData">
                         <elfin-filter-group slot="outer">
                            <elfin-filter-item
                                v-for="field in outerFields"
                                :key="field.prop"
                                :inline="true"
                                v-bind="field">
                            </elfin-filter-item>
                        </elfin-filter-group>

                        <elfin-filter-group label="选择字段">
                            <elfin-filter-item
                                v-for="field in selectFields"
                                :key="field.prop"
                                v-bind="field">
                            </elfin-filter-item>
                        </elfin-filter-group>
                    </elfin-filters>
                </generic-container>
            </div>
        `,
        data() {
            return {
                filterData: {},
            }
        },
        computed: {
            outerFields() {
                return [
                    {
                        prop: 'highFrequency',
                        label: '高频字段',
                        render: ElfinFilterItemType.SELECT,
                        renderOptions: {
                            props: {
                                placeholder: '请选择',
                                clearable: true,
                            },
                        },
                        extra: {
                            options: [
                                {label: '一月', value: 1},
                                {label: '二月', value: 2},
                                {label: '三月', value: 3},
                            ],
                        },
                    },
                    {
                        prop: 'unClearable',
                        label: '不可清空',
                        render: ElfinFilterItemType.SELECT,
                        renderOptions: {
                            props: {
                                placeholder: '请选择',
                                clearable: false,
                            },
                        },
                        extra: {
                            options: [
                                {label: '一月', value: 1},
                                {label: '二月', value: 2},
                                {label: '三月', value: 3},
                            ],
                        },
                    },
                ]
            },
            selectFields() {
                return [
                    {
                        prop: 'age',
                        label: '年龄',
                        render: ElfinFilterItemType.SELECT,
                        renderOptions: {
                            props: {
                                placeholder: '请选择',
                                clearable: true,
                            },
                        },
                        extra: {
                            options: [
                                {label: '一月', value: 1},
                                {label: '二月', value: 2},
                                {label: '三月', value: 3},
                            ],
                        },
                    },
                    {
                        label: '时间范围',
                        prop: 'timeRange',
                        render: ElfinFilterItemType.DATE_RANGE,
                        renderOptions: {
                            props: {
                                pickerOptions: {
                                    disabledDate(time) {
                                        return time.getTime() > Date.now()
                                    },
                                },
                            },
                        },
                    },
                ]
            },
        },
    }), {notes})
    .add('filter-group', () => ({
        components: {ElfinFilters, ElfinFilterGroup, ElfinFilterItem},
        props: {
            label: {
                type: String,
                default: text('label', 'group1'),
            },
        },
        template: `
            <div>
                <generic-container title="filter-group">
                    <p slot="subDocs">
                        控制筛选分组<br/>
                    </p>
                    <elfin-filters v-model="filterData">
                        <elfin-filter-group :label="label">
                            <elfin-filter-item
                                v-for="field in selectFields"
                                :key="field.prop"
                                v-bind="field">
                            </elfin-filter-item>
                        </elfin-filter-group>
                    </elfin-filters>
                </generic-container>
            </div>
        `,
        data() {
            return {
                filterData: {},
            }
        },
        computed: {
            selectFields() {
                return [
                    {
                        prop: 'age',
                        label: '年龄',
                        render: ElfinFilterItemType.SELECT,
                        renderOptions: {
                            props: {
                                placeholder: '请选择',
                                clearable: true,
                            },
                        },
                        extra: {
                            options: [
                                {label: '一月', value: 1},
                                {label: '二月', value: 2},
                                {label: '三月', value: 3},
                            ],
                        },
                    },
                ]
            },
        },
    }), {notes})
    .add('Select 单选', () => ({
        components: {ElfinFilters, ElfinFilterGroup, ElfinFilterItem},
        template: `
            <div>
                <generic-container title="单选">
                    <p slot="subDocs"></p>
                    <elfin-filters v-model="filterData">
                        <elfin-filter-group label="选择字段">
                            <elfin-filter-item
                                v-for="field in selectFields"
                                :key="field.prop"
                                v-bind="field">
                            </elfin-filter-item>
                        </elfin-filter-group>
                    </elfin-filters>
                </generic-container>
            </div>
        `,
        data() {
            return {
                filterData: {},
            }
        },
        computed: {
            selectFields() {
                return [
                    {
                        prop: 'age',
                        label: '年龄',
                        render: ElfinFilterItemType.SELECT,
                        renderOptions: {
                            props: {
                                placeholder: '请选择',
                                clearable: true,
                            },
                        },
                        extra: {
                            options: [
                                {label: '一月', value: 1},
                                {label: '二月', value: 2},
                                {label: '三月', value: 3},
                            ],
                        },
                    },
                    {
                        prop: 'age',
                        label: '年龄',
                        render: ElfinFilterItemType.SELECT,
                        renderOptions: {
                            props: {
                                placeholder: '请选择',
                                clearable: true,
                            },
                        },
                        extra: {
                            options: [
                                {label: '一月', value: 1},
                                {label: '二月', value: 2},
                                {label: '三月', value: 3},
                            ],
                        },
                    },
                ]
            },
        },
    }), {notes});