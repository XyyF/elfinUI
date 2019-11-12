<template>
    <div class="table-header-picker-dialog">
        <div class="active-area">
            <h5>拖动表单项调整顺序</h5>
            <vuedraggable
                v-model="activedItems"
                :options="{draggable: '.draggable'}"
                class="draggable-list">
                <div
                    v-for="item in activedItems"
                    :key="item.columnId"
                    :class="{draggable:item.draggable, fixed:!item.draggable}">
                    {{ item.label }}
                </div>
            </vuedraggable>
        </div>

        <div class="candidate-area">
            <h5>选择表单项</h5>
            <el-checkbox-group v-model="selectedLabelList" @change="handleCheck">
                <el-checkbox
                    v-for="item in totalItems"
                    :key="item.columnId"
                    :label="item"
                    class="check-box"
                    :title="item.label"
                    :disabled="item.isNecessary">
                    {{ item.label }}
                </el-checkbox>
            </el-checkbox-group>
        </div>

        <!-- review：除了保存，还需要取消 -->
        <div class="btn-line">
            <el-button
                type="primary"
                :icon="loading?'el-icon-loading':''"
                class="submit-button"
                :disabled="loading"
                @click.native="onSubmitClick">
                保存
            </el-button>
        </div>
    </div>
</template>

<script>
    /**
     * totalItems 传入的表头数组
     * [
     *      {
     *          columnId : 1,      // id
     *          label: '1',        // 展示字符串
     *          isNecessary: true, // 是否为必选
     *          draggable: false,  // 是否可以拖动
     *      },
     * ]
     *
     *
     * activedItems 保存时返回根据顺序排列的数组，
     * [
     *      {
     *          columnId: 1      // id
     *          draggable: false // 是否可以拖动
     *          label: "1        // 展示字符串
     *      }
     *
     * ]
     *
     *
     * **/
    import vuedraggable from 'vuedraggable'

    // review： 没有 emit 同步数据

    export default {
        name: 'table-header-picker-dialog',
        title: '选择展示数据',
        components: {
            vuedraggable,
        },
        data() {
            return {
                activedItems: [],  // 已钩选项的表头项列表
                loading: false,
                selectedLabelList: [], // 选择的列表
            }
        },
        props: {
            // review 需要传入两个数据，当前已经选择的表头数据，和完整的表头数据
            totalItems: { // 传进来的数组
                type: Array,
                default: () => {
                    return []
                },
            },
        },
        methods: {
            // 保存按钮
            onSubmitClick() {
                this.$dialog.close(this.activedItems)
            },
            // change
            handleCheck() {
                // 新增时遍历两个数组
                this.selectedLabelList.map((val) => {
                    let flag = true
                    this.activedItems.map(val2 => {
                        if (val.columnId === val2.columnId) {
                            flag = false
                        }
                    })

                    if (flag) {
                        this.activedItems.push({
                            columnId: val.columnId,
                            label: val.label,
                            draggable: val.draggable,
                        })
                    }
                })
                // 减少时遍历
                this.activedItems.map((val, index) => {
                    let flag = true
                    this.selectedLabelList.map(val2 => {
                        if (val.columnId === val2.columnId) {
                            flag = false
                        }
                    })

                    if (flag) {
                        this.activedItems.splice(index, 1)
                    }

                })
            },
        },
        watch: {
            totalItems: {
                immediate: true,
                deep: true,
                handler(val) {
                    val.map((item) => {
                        if (item.isNecessary) {
                            this.activedItems.push(
                                {
                                    columnId: item.columnId,
                                    label: item.label,
                                    draggable: item.draggable,
                                },
                            )
                            this.selectedLabelList.push(item)
                        }
                    })
                },
            },
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .table-header-picker-dialog {
        width: 720px;

        .check-box {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        h5 {
            font-weight: normal;
            margin-top: 0;
            margin-bottom: 17px;
            color: #63737F;
            font-size: 14px;
        }

        .draggable-list {
            padding: 0;
            margin: 0 0 26px;
            $item-space: 10px;
            width: calc(100% + 8px);
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            & > div {
                height: 36px;
                font-size: 14px;
                color: #63737F;
                width: calc(100% / 4 - #{$item-space});
                margin-bottom: $item-space;
                margin-right: $item-space;
                background: rgba(54, 180, 89, 0.05);
                border-radius: 4px;
                border: 1px dashed rgba(54, 180, 89, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;

                &.fixed {
                    cursor: not-allowed;
                    border-color: rgba(0, 0, 0, 0.1);
                    background: rgba(0, 0, 0, 0.1);
                }

                &.draggable {
                    cursor: move;
                }
            }
        }

        .el-checkbox-group {
            padding: 0;
            margin: 0;
            $item-space: 8px;
            width: calc(100% + 8px);
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            label {
                height: 35px;
                padding-top: 6px;
                font-size: 14px;
                color: #63737F;
                width: calc(100% / 4 - #{$item-space});
                margin: 0 $item-space 0 0;
                flex-shrink: 0;
            }
        }

        .btn-line {

        }
    }
</style>
