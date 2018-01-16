<template>
    <div class="side-menu">
        <el-menu class="el-menu-vertical-demo">
            <template v-for="(item, itemIndex) in vxSideMenu">
                <el-menu-item>{{item}}</el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {Menu, MenuItem} from 'meetin-sass-ui'

    export default {
        name: 'side-menu',
        computed: {
            ...mapState({
                vxSideMenu: state => state.sideMenu,
            })
        },
        components: {
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../../components/pc/styles/basic_const";

    .side-menu {
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
        border-right: 1px solid #e7eef0;
        width: $sideMenuWidth;
        height: 100%;
        padding-top: 24px;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        background-color: #fff;
        display: flex;
        flex-direction: column;

        .logo-line {
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 24px;
            color: $text-hint;
            margin: 0 15px;
            font-size: 14px;
            .campus-button {
                color: #b4c1cc;
                display: inline-block;
                height: 19px;
                padding: 0 0 0 5px;
                margin-top: 3px;
            }
            .campus-name {
                max-width: 120px;
                display: inline-block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .profile {
            flex-shrink: 0;
            text-align: center;
            padding: 36px 0 20px;
            .el-button {
                color: $text-normal;
            }
            .icon-down {
                color: $text-hint;
            }
            .role-names-button {
                display: flex !important;
                border: none !important;
                margin: 0 auto !important;
                padding: 0 !important;
            }
        }
        .avatar {
            width: 64px;
            height: 64px;
            margin: 0 auto;
            border-radius: 50%;
        }
        .name-dropdown {
            // 加个margin，让姓名的点击区域和头像的分开
            margin-top: 8px;
            // 扩大点击区域
            padding: 4px 20px;
        }
        .main-menu {
            $menu-item-height: 48px;

            flex: 1;
            overflow-x: hidden;
            overflow-y: scroll;
            width: $sideMenuWidth;
            min-height: 200px;

            // hide scroll bar
            -ms-overflow-style: none; // IE 10+
            &::-webkit-scrollbar {
                display: none; // Safari and Chrome
            }

            .el-menu {
                background-color: #fff;
            }
            .el-submenu .el-menu {
                background-color: #f1f5f8;
            }
            .el-submenu {
                height: auto !important;
            }
            .el-menu-item, .el-submenu__title {
                transition: none;
            }
            .el-submenu__title {
                height: $menu-item-height;
                line-height: 48px;
                display: flex;
                align-items: center;
                &:hover {
                    background-color: $basic-selected;
                }
            }
            .submenu-item {
                height: $menu-item-height;
                cursor: pointer;
                font-size: 14px;
                li {
                    padding-left: 53px !important;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    color: $text-normal;
                    text-decoration: none;
                    span {
                        height: $menu-item-height;
                    }
                }
                .icon {
                    width: 18px;
                    height: 18px;
                    margin-right: 16px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    float: left;
                    margin-top: 1px;
                }
                .icon-normal {
                    display: inline-block;
                }
                .icon-active {
                    display: none;
                }
            }
            .menu-item {
                display: flex;
                align-items: center;
                height: $menu-item-height;
                cursor: pointer;
                font-size: 14px;
                .icon {
                    width: 18px;
                    height: 18px;
                    margin-right: 16px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    float: left;
                    margin-top: 1px;
                }
                .icon-normal {
                    display: inline-block;
                }
                .icon-active {
                    display: none;
                }
                &.is-active {
                    background-color: $basic-primary;
                    &:hover {
                        background-color: $basic-primary;
                    }
                    a {
                        color: #fff;
                    }
                    .icon-normal {
                        display: none;
                    }
                    .icon-active {
                        display: inline-block;
                    }
                    span {
                        color: #fff;
                    }
                    .badge .el-badge__content {
                        background-color: white;
                        color: $basic-primary;
                    }
                }
                .badge {
                    display: flex;
                    position: absolute;
                    right: 17px;

                    .el-badge__content {
                        background-color: $basic-primary;
                    }
                }
                &:hover {
                    background-color: $basic-selected;
                }
            }
        }
    }

    .side-menu-profile-popover.el-popover {
        min-width: 80px;
        padding: 2px 0;
        li {
            padding: 0 10px;
            &:hover {
                background: $basic-background;
                .popper__arrow::after {
                    border-bottom-color: $basic-background;
                }
            }
        }
        .el-button {
            width: 80px;
            font-size: 14px;
            color: $text-normal;
        }
        .role-names-wrap {
            margin: 5px;
        }
        .role-names {
            margin: 2px 4px 2px 0;
            background-color: rgba(18, 206, 102, .1);
            border-color: rgba(18, 206, 102, .2);
            color: #36B459;
            height: 24px;
            font-size: 12px;
        }
    }

    .side-menu-campus-popover.el-popover {
        width: 132px !important;
        padding: 0 !important;
        min-width: 98px;
        .campus-list {
            width: 132px;
            font-size: 14px;
            color: $text-normal;
            padding: 10px 0;
            li {
                height: 24px;
                white-space: nowrap;
                cursor: pointer;
                padding: 0 10px;
                text-align: center;
                &.current-campus {
                    cursor: default;
                }
                &:hover {
                    background: $basic-background;
                    .popper__arrow::after {
                        border-bottom-color: $basic-background;
                    }
                }
            }
        }
        &:hover .campus-list {
            display: block;
        }
    }
</style>
