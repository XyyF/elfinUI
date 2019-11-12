<template>
    <div class="xjl-buttons-container-root">
        <div class="left">
            <div class="buttons">
                <slot></slot>
            </div>
            <div class="filters">
                <slot name="filter"></slot>
            </div>
        </div>
        <div v-if="searchable" class="right">
            <el-select
                v-if="searchOptions.length>0"
                v-model="searchType"
                size="medium"
                class="selectType"
                placeholder="请选择">
                <el-option
                    v-for="item in searchOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-input
                :value="searchText"
                class="search"
                size="medium"
                clearable
                @input="updateSearchText">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'xjl-buttons-container',
        data() {
            return {
                searchText: '',
                searchType: '',
            }
        },
        props: {
            searchable: {
                type: Boolean,
                default: false,
            },
            searchOptions: {
                type: Array,
                default: () => {
                    return []
                },
            },
            searchTypeProp: {
                type: [String, Number],
                default: 1,
            },
        },
        methods: {
            updateSearchText(val) {
                this.searchText = val
                this.$emit('update:searchText', val)
            },
        },
        watch: {
            searchTypeProp: {
                immediate: true,
                handler(val) {
                    this.searchType = val
                },
            },
            searchType: {
                immediate: true,
                handler(val) {
                    this.$emit('update:searchTypeProp', val)
                },
            },
        },
    }
</script>

<style scoped>
    .xjl-buttons-container-root {
        padding: 25px 0;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    .left .buttons, .left .filters {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .left {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        flex-grow: 1;
        flex-shrink: 1;
        margin-bottom: -5px; /* 抵消 .left > * 当中设置的 margin-bottom */
    }

    /* button */
    .left /deep/ .el-button {
        min-width: 115px;
        height: 35px;
        border-radius: 2px;
    }

    .right {
        flex: 0 0 400px;
        display: flex;
    }

    .search {
        flex-shrink: 0;
        width: 240px;
    }

    /* date range*/
    /deep/ .el-date-editor--daterange {
        width: 240px;
    }

    /deep/ .el-date-editor--daterange .el-range-separator {
        width: 20px;
    }
</style>

<style>
    .xjl-buttons-container-root .left .buttons > *, .xjl-buttons-container-root .left .filters > * {
        margin: 0;
        margin-right: 10px;
        margin-bottom: 5px;
    }

    .selectType {
        margin-right: 10px;
    }
</style>