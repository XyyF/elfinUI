<template>
    <div class="popup-board">
        <div class="popup-board-wrap">
            <div class="header-bar">
                <div class="header-bar-title">
                    <span class="title">{{title}}</span>
                    <span class="subtitle">{{subTitle}}</span>
                    <slot name="navButton"></slot>
                </div>
                <el-button type="text" icon="el-icon-close" @click.native="closePopup" class="popup-board-close"></el-button>
            </div>
            <div class="subview__content">
                <div class="sub-left-menu">
                    <el-menu :default-active="defaultActivedId.toString()"
                             @select="onMenuSelected">
                        <el-menu-item v-for="item in menuItems" :index="item.id.toString()" :key="item.id">
                            {{item.name}}
                        </el-menu-item>
                    </el-menu>
                </div>
                <div class="subview-slot-wrapper">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {Button, Menu, MenuItem} from 'meetin-sass-ui'

    export default {
        name: 'counsel-profile',
        components: {
            [Button.name]: Button,
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem,
        },
        props: {
            defaultActivedId: [String, Number],
            menuItems: {type: Array, default: () => []},
            title: {type: String},
            subPageId: {type: String},
            subTitle: {type: String},
        },
        methods: {
            onBackClick() {
                if (!this.isOpenedInNewWindow) {
                    this.$router.back()
                } else if (this.$route.name === 'enrollmentProfile') {
                    this.$router.push({name: 'enrollment'})
                } else if (this.$route.name === 'classStudentProfile') {
                    this.$router.push({name: 'class'})
                } else {
                    this.$router.push({name: 'student'})
                }
            },
            onMenuSelected(id) {
                this.$emit('select', id);
            },
            closePopup() {
                this.$emit('close')
            },
        },
        computed: {
            isOpenedInNewWindow() {
                return this.$route.query.window === 'new'
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../../common/mobile/basic_const";

    $panel-padding: 25px;
    $sidebar-width: 200px;

    .popup-board {
        background-color: #f4f8f9;
        padding: 30px 35px;
        .popup-board-wrap {
            box-shadow: 0 4px 8px #e7eef0;
            min-height: calc(100vh - 60px);
            background-color: #fff;
            display: flex;
            flex-direction: column;
            .header-bar {
                display: flex;
                padding: 0 $panel-padding;
                height: 36px;
                line-height: 36px;
                margin: 15px 0;
                justify-content: space-between;
                button {
                    float: right;
                    padding-top: 3px;
                    color: $text-normal;
                    &:hover {
                        color: $basic-primary-highlight;
                    }
                }
                .popup-board-close {
                    float: right;
                }
                &-title {
                    display: flex;
                }
            }
            .subtitle {
                color: $text-hint;
                font-size: 14px;
                margin-left: 16px;
                display: inline-block;
                width: 80px;
            }

            .subview__content {
                min-height: 300px;
            }
            .sub-left-menu {
                position: absolute;
                background-color: transparent;
                width: 180px;
                flex-shrink: 0;
                border-right: 1px solid $line-separator;
            }
            .el-menu {
                background-color: transparent;
                padding: 0;
                margin: 0;
            }
            .el-menu-item {
                padding-left: 25px !important;
                color: $text-normal;
                height: 44px;
                line-height: 44px;
                &:hover {
                    background-color: $basic-body;
                }
                &.is-active {
                    color: $basic-primary;
                    background-color: #F1F5F8;
                }
                &.is-active:after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 4px;
                    background-color: $basic-primary;
                }
            }
            .subview-slot-wrapper {
                margin-left: 180px;
                background-color: transparent;
            }
        }
    }
</style>
