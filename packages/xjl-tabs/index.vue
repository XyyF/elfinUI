<template>
    <div class="xjl-tabs-root">
        <el-tabs
            :value="selectedTab"
            :beforeLeave="beforeLeave"
            :activeBarWidth="30"
            @input="syncSelectedTab">
            <el-tab-pane
                v-for="option in tabsOptions"
                :key="option.value"
                :label="option.label"
                :name="option.value">
                {{option.content + `hdx添加`}}
            </el-tab-pane>
        </el-tabs>
        <el-input
            v-model.trim="searchValue"
            class="input"
            :placeholder="placeholder">
            <div slot="append" class="append-container">
                <el-button
                    v-show="searchValue.length !== 0"
                    icon="el-icon-close"
                    @click="cleanSearchAction">
                </el-button>
                <div class="seq"></div>
                <el-button
                    icon="el-icon-search"
                    class="search-icon"
                    @click="$emit('start-search')">
                </el-button>
            </div>
        </el-input>
    </div>
</template>

<script>
    /**
     * 代码导读
     *
     * 包含 tab组件 和 搜索框
     *
     * tab 组件切换页面，tab 选中值会同步到url的query中
     * tab 初始选中值 从 url 中获取
     *
     * search 框同上，与 url 的 query 数据互通
     */

    import {setUrlQuery} from '@external/edu-saas-utils/common_utils'

    const TAB_QUERY_KEY = 'tab_section_id'
    const SEARCH_QUERY_KEY = 'search'

    // 赋值给 tab 的初始数据
    const INVALID_VALUE = 'invalid'

    export default {
        name: 'xjl-tabs',
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                selectedTab: INVALID_VALUE,
                searchValue: '',
            }
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            // [{
            //     value: 't1',
            //     label: '用户管理',
            // }, {
            //     value: 't2',
            //     label: '教室管理',
            // }],
            tabsOptions: {
                type: Array,
                default: () => {
                    return []
                },
            },
            placeholder: {
                type: String,
                default: '',
            },
            // 是否显示搜索框
            isShowSearch: {
                type: Boolean,
                default: true,
            },
            // 切换前，可以阻止切换
            beforeLeave: {
                type: Function,
                default: null,
            },
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            // 同步 tab 数据
            syncSelectedTab(val) {
                // @input 返回的是 INVALID_VALUE 初始数据，不处理
                if (val === INVALID_VALUE) return
                if (val) this.selectedTab = val
                setUrlQuery(this.$router, {[TAB_QUERY_KEY]: this.selectedTab})
                this.$emit('update:selectedTab', this.selectedTab)
            },
            // 同步 搜索数据
            syncSearchValue() {
                setUrlQuery(this.$router, {[SEARCH_QUERY_KEY]: this.searchValue})
                this.$emit('update:searchValue', this.searchValue)
            },
            initDataFromUrl() {
                const query = this.$router.currentRoute.query

                // 从 url 初始化 selectedTab
                let selectedTab = ''
                if (query[TAB_QUERY_KEY]) {
                    selectedTab = query[TAB_QUERY_KEY]
                }
                else if (this.tabsOptions.length !== 0) {
                    selectedTab = this.tabsOptions[0].value
                }
                this.selectedTab = selectedTab

                // 从 url 初始化 searchValue
                let searchValue = ''
                if (query[SEARCH_QUERY_KEY]) {
                    searchValue = query[SEARCH_QUERY_KEY]
                }
                this.searchValue = searchValue
            },
            cleanSearchAction() {
                this.searchValue = ''
            },
        },
        watch: {
            /* Notice: 写下说明 */
            searchValue(val, oldVal) {
                if (val === oldVal) return
                this.syncSearchValue()
            },
        },
        mounted() {
            this.initDataFromUrl()
            // 初始化
            this.syncSelectedTab()
        },
    }
</script>

<style lang="scss" scoped>
    // 内容区域 padding
    $content-padding: 24px;
    // 线框-表单框线
    $line-border: #D3D9DE;

    .xjl-tabs-root {
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-bottom: 1px solid #d3dce6;
        padding-left: $content-padding;
        padding-right: $content-padding;
    }

    .input {
        width: 300px;
        border: 1px solid $line-border;
        border-radius: 3px;
        flex-shrink: 0;

        &:hover {
            background-color: #FBFCFD;
        }

        /deep/ & > input {
            height: 32px;
        }
    }

    /deep/ .el-input__inner {
        background-color: transparent;
        border: none;
    }

    /deep/ .el-input-group__append {
        background-color: transparent;
        border: none;
        padding-right: 10px;

        button {
            margin: 0;
            padding: 0;
            width: auto;
            border: none;
        }
    }

    .append-container {
        display: flex;
        align-items: center;
    }

    .seq {
        width: 1px;
        height: 16px;
        background: #DFE7EA;
        margin-right: 10px;
        margin-left: 10px;
    }

    .search-icon {
        i {
            background: url(./images/icon_search.png) no-repeat center;
            background-size: contain;
            width: 14px;
            height: 14px;

            &:before {
                content: '';
            }
        }

        &:hover i {
            background-image: url(./images/icon_search_active.png);
        }
    }

    /deep/ .el-tabs__header {
        height: 56px;
        border: none;
        margin: 0;
    }

    /deep/ .el-tabs__item {
        height: 56px;
        line-height: 56px;
    }
</style>