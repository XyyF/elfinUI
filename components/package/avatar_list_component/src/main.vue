<template>
    <div class="avatar-list">
        <el-popover
            ref="popover2"
            placement="bottom"
            width="690"
            v-model="showPopover"
            trigger="click">
            <div class="popover-wrap" v-if="relation.length">
                <span class="popover-selected"
                      v-for="item in relation"
                      :class="{'selected': relationChecked(item.groupId)}"
                      @click="changeRelationChecked(item.groupId)">{{item.name}}</span>
            </div>
            <div class="avatar-wraps">
                <template v-if="infoList.length">
                    <div v-for="item in infoList" class="avatar-wrap">
                        <small-avatar :url="item.avatar"
                                      class="avatar clickable"
                                      :gender="item.gender"></small-avatar>
                        <span class="avatar-wrap-name" :title="item.name">{{item.name}}</span>
                        <template v-if="showCheckedWrap">
                            <div
                                :class="{'is-checked': isChecked(item), 'check-one': isChecked(item)}"
                                class="checked-wrap" @click="changeCheck(item)">
                                <transition name="fade" mode="out-in">
                                    <i v-if="isChecked(item)" class="el-icon-check"></i>
                                </transition>
                            </div>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <water-mark
                        :msg="'没有任何内容哦'"
                        class="avatar-water-mark"></water-mark>
                </template>
            </div>
            <div class="check-all">
                <el-checkbox @change="changeRadio" class="check-box" v-model="radio" v-if="showCheckedWrap">全选</el-checkbox>
                <el-button type="primary" class="click-sure" @click="hiddenPopover">确定</el-button>
            </div>
        </el-popover>
        <el-button v-popover:popover2>
            <slot>查看</slot>
        </el-button>
        <span class="info-list-number">共{{showCheckedWrap ? checkedList.length : propInfoList.length}}人</span>
    </div>
</template>

<script>
    import { Popover, Checkbox, Button } from 'meetin-sass-ui'
    import { Gender } from 'common/student_enums'
    import smallAvatar from './small_avatar.vue'
    import waterMark from '../../water_mark_component/src/main.vue'

    export default {
        name: 'avatar-list',
        data () {
            return {
                // 控制显示弹出框
                showPopover: false,
                // 是否全选ing
                radio: false,
                // 选中的列表
                checkedList: [],
                // 关系筛选存储-预留多选需求，数组存储
                relationCheck: ['ALL'],
            }
        },
        props: {
            // 父组件下发的关系数组
            propRelation: {
                type: Array,
                default: () => [],
            },
            // 父组件下发的列表数组
            propInfoList: {
                type: Array,
                default: () => [],
            },
            // 显示选择按钮
            showCheckedWrap: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            // 关系数组-添加ALL(全部)
            relation () {
                return this.propRelation.length ? [
                    {
                        name: '全部',
                        groupId: 'ALL',
                    }, ...this.propRelation] : []
            },
            // 关系筛选后显示的列表
            infoList () {
                if (this.propInfoList && !!this.propInfoList.length) {
                    return this.propInfoList
                        .filter(item => {
                            // 若是选中全部，则不筛选
                            return this.relationCheck.includes('ALL') ? true
                                : item.groupIds.find(group => this.relationCheck.find(relation => relation === group))
                        })
                        .map(e => ({
                            accountId: e.accountId,
                            name: e.name,
                            avatar: e.avatar || '',
                            gender: e.gender || Gender.BOY,
                        }))
                }
                return []
            },
        },
        methods: {
            // 点击改变全选状态
            changeRadio (val) {
                if (val) {
                    this.infoList.forEach(list => {
                        if (!this.checkedList.find(check => check.accountId === list.accountId)) {
                            this.checkedList.push(list)
                        }
                    })
                } else {
                    this.infoList.forEach(list => this.changeCheck(list))
                }
            },
            // 关系筛选模块
            relationChecked (groupId) { // 判断是否是选中该项职位
                return this.relationCheck.includes(groupId)
            },
            changeRelationChecked (groupId) { // 切换关系
                this.relationCheck = [groupId]
            },
            changeCheck (item) { // 选中/取消选中角色
                const index = this.checkedList.findIndex(check => check.accountId === item.accountId)
                if (index === -1) {
                    this.checkedList.push(item)
                } else {
                    this.checkedList.splice(index, 1)
                }
            },
            isChecked (item) { // 判断是否是选中该角色
                return this.checkedList.find(e => e.accountId === item.accountId)
            },
            hiddenPopover () {
                this.showPopover = false
            },
            // 检查判断是否是全选状态
            checkIsAll (infoList, checkedList) {
                let out = false
                this.radio = true
                infoList.forEach(list => {
                    if (!out && !checkedList.find(item => item.accountId === list.accountId)) {
                        this.radio = false
                        out = true
                    }
                })
            },
        },
        components: {
            [Popover.name]: Popover,
            [Button.name]: Button,
            [Checkbox.name]: Checkbox,
            [smallAvatar.name]: smallAvatar,
            [waterMark.name]: waterMark,
        },
        watch: {
            checkedList: function checklist (val) {
                this.checkIsAll(this.infoList, val)
            },
            infoList: function infolist (val) {
                this.checkIsAll(val, this.checkedList)
            },
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../../common/pc/basic_const";

    .avatar-list {
        .info-list-number {
            margin-left: 10px;
        }
    }

    .el-popover {
        .popover-wrap {
            width: 100%;
            padding: 10px 24px;
            display: flex;
            flex-flow: row wrap;
            .popover-selected {
                height: 24px;
                padding: 2px 10px;
                margin-right: 10px;
                margin-bottom: 10px;
                font-size: 14px;
                border-radius: 20px;
                background-color: #DFE7EA;
                text-align: center;
                cursor: pointer;
            }
            .selected {
                background-color: #36B459;
                color: #fff;
            }
        }
        .check-all {
            width: 100%;
            padding: 11px;
            .check-box {
                margin-right: 30px;
            }
        }
        .avatar-wraps {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            max-height: 250px;
            padding: 5px;
            overflow-y: auto;
            .avatar-water-mark {
                min-height: 130px;
                position: relative;
            }
            &::-webkit-scrollbar { /* 滚动条整体部分 */
                width: 10px;
            }
            &::-webkit-scrollbar-button { /* 滚动条两端的按钮 */
                width: 0;
                height: 0;
            }
            &::-webkit-scrollbar-track { /* 外层轨道 */
                border-right: 1px solid transparent;
                border-left: 1px solid transparent;
            }
            &::-webkit-scrollbar-track-piece { /*内层轨道，滚动条中间部分 */
                background-color: #FFF;
                border-radius: 10px;
            }
            &::-webkit-scrollbar-thumb { /* 滑块 */
                border-radius: 8px;
                background: #CBCBCB;
            }
            &::-webkit-scrollbar-corner { /* 边角 */
                display: block;
            }
            &::-webkit-scrollbar-thumb:hover { /* 鼠标移入滑块 */
                background: #909090;
            }
            .avatar-wrap {
                min-width: 70px;
                margin-bottom: 10px;
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                position: relative;
                .avatar-wrap-name {
                    width: 50px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: center;
                }
                .small-avatar {
                    width: 48px;
                    height: 48px;
                    margin-bottom: 5px;
                    cursor: default;
                }
                .checked-wrap {
                    width: 24px;
                    height: 24px;
                    border: 1px solid #B4C1CC;
                    border-radius: 50%;
                    background-color: #fff;
                    position: absolute;
                    top: 30px;
                    left: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    .el-icon-check {
                        color: #fff;
                    }
                }
                .is-checked {
                    border: 2px solid #fff;
                }
                .check-one {
                    background-color: #36B459;
                }
            }
        }
    }
</style>
