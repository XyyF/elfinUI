<template>
    <div class="side-menu-root">
        <el-menu class="side-menus--horizontal bottom-scroll-root" mode="horizontal">
            <template v-for="(sideMenu, sideIndex) in vxSideMenu">
                <el-submenu :index="String(sideIndex)">
                    <template slot="title">
                        <img :src="sideMenu.icon" />
                        <span>{{sideMenu.name}}</span>
                    </template>
                    <template v-for="subItem in sideMenu.childItems">
                        <router-link :to="{name: subItem.routeName}" class="sub-link">
                            <el-menu-item :index="subItem.routeName" class="menu-item" :key="subItem.name">
                                <img :src="subItem.icon" />
                                <span>{{subItem.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
        <el-menu class="side-menus--vertical slide-scroll-root" mode="vertical">
            <template v-for="(sideMenu, sideIndex) in vxSideMenu">
                <el-submenu :index="String(sideIndex)">
                    <template slot="title">
                        <img :src="sideMenu.icon" />
                        <span>{{sideMenu.name}}</span>
                    </template>
                    <template v-for="subItem in sideMenu.childItems">
                        <router-link :to="{name: subItem.routeName}" class="sub-link">
                            <el-menu-item :index="subItem.routeName" class="menu-item" :key="subItem.name">
                                <img :src="subItem.icon" />
                                <span>{{subItem.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { State } from 'vuex-class'
    // import { Menu, MenuItem, Submenu } from 'meetin-sass-ui'
    import { Menu, MenuItem, Submenu } from 'element-ui'

    @Component({
        name: 'side-menu',
        components: {
            [Menu.name]: Menu,
            [Submenu.name]: Submenu,
            [MenuItem.name]: MenuItem
        }
    })
    export default class SideMenu extends Vue {
        @State(state => state.sideMenu) vxSideMenu: Array<Object>
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
    @import "../../../../../common/pc/basic_const";

    .side-menu-root {
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
        border-right: 1px solid #e7eef0;
        width: $sideMenuWidth;
        flex-grow: 1;
        position: fixed;
        top: $large-topMenuHeight;
        bottom: 0;
        z-index: 100;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .el-menu {
            border: none !important;
        }
        .el-submenu__title {
            padding: 0 !important;
        }
        .side-menus--horizontal {
            height: 100%;
            display: none;
        }
        .side-menus--vertical {
            display: block;
        }
        .side-menus--horizontal {
            .el-submenu + .el-submenu {
                margin-left: 20px;
            }
            .el-menu-item {
                padding: 0 25px !important;
            }
        }
        .side-menus--vertical {
            .el-menu-item {
                padding: 0 !important;
            }
        }
    }
</style>
