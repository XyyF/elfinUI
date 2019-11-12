<template>
    <div id="app">
        <el-scrollbar class="app__menus" wrapClass="menu-scrollbar">
            <el-menu
                ref="menu"
                :default-active="menuLst[0].name"
                :router="true"
                class="menus">
                <el-menu-item
                    v-for="menu in menuLst"
                    :key="menu.name"
                    :index="menu.name"
                    class="menu__item"
                    :route="{name: menu.router}">
                    {{menu.name}}
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
        <router-view class="app__content"></router-view>
    </div>
</template>

<script>
    import Routers from './routers.json'

    export default {
        name: 'app',
        data() {
            return {
                menuLst: Routers.map(([key]) => {
                    return {
                        name: key,
                        router: key
                    }
                })
            }
        }
    }
</script>

<!-- 全局样式 -->
<style lang="scss">
    // 引用修改主题样式
    @import './assets/scss/theme';

    html, body {
        width: 100vw;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    * {
        box-sizing: border-box;
    }

    #app {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .app__menus {
        flex-shrink: 0;
        height: 100%;
        border-right: solid 1px #E7EEF0;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
    }

    .menu-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    .menus {
        background-color: #FEFEFE;
        border: none;
        border-right: solid 1px #E7EEF0;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
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
        .el-submenu .el-menu-item {
            min-width: unset;
        }
        .el-submenu__title {
            height: 50px;
            line-height: 50px;
            display: flex;
            align-items: center;
            &:hover {
                background-color: #dbebfb;
            }
        }
        .el-submenu__icon-arrow {
            right: 15px;
        }
        .menu__item {
            display: flex;
            align-items: center;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            font-size: 14px;
            &:hover, &.is-active {
                background-color: rgba(54, 180, 89, 0.16) !important;
                a {
                    color: #36B459;
                }
                span, i {
                    color: #36B459;
                }
                .badge .el-badge__content {
                    background-color: white;
                    color: #36B459;
                }
            }
            &:hover {
                background-color: #dbebfb;
            }
        }

        .el-submenu .el-menu-item {
            &:hover, &.is-active {
                background-color: rgba(54, 180, 89, 0.16) !important;
                a {
                    color: #36B459;
                }
                span, i {
                    color: #36B459;
                }
                .badge .el-badge__content {
                    background-color: white;
                    color: #36B459;
                }
            }
        }
    }

    .menu__item {
        cursor: pointer;
        margin: 10px 0;
    }

    .app__content {
        height: 100%;
        flex-grow: 1;
        overflow-y: auto;
        padding: 0 15px;
    }

    /*参数列表的table样式*/
    .app__content > table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 45px;
        line-height: 1.5em;

        strong {
            font-weight: normal;
        }

        td, th {
            border-bottom: 1px solid #d8d8d8;
            padding: 15px;
            max-width: 250px;
        }

        th {
            text-align: left;
            white-space: nowrap;
            color: #666;
            font-weight: normal;
        }

        td {
            color: #333;
        }

        th:first-child, td:first-child {
            padding-left: 10px;
        }
    }
</style>