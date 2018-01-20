<template>
    <div class="side-menu">
        <el-menu class="el-menu-vertical-demo">
            <template v-for="(sideMenu, sideIndex) in vxSideMenu">
                <el-submenu :index="String(sideIndex)">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{sideMenu.name}}</span>
                    </template>
                    <template v-for="subItem in sideMenu.childItems">
                        <router-link :to="{name: subItem.routeName}" class="sub-link">
                            <el-menu-item :index="subItem.routeName" class="menu-item" :key="subItem.name">
                                <span>{{subItem.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { Menu, MenuItem, Submenu } from 'meetin-sass-ui'

    export default {
        name: 'side-menu',
        computed: {
            ...mapState({
                vxSideMenu: state => state.sideMenu,
            })
        },
        components: {
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem,
            [Submenu.name]: Submenu
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../../../common/basic_const";

    .side-menu {
        padding-top: 40px;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
        border-right: 1px solid #e7eef0;
        width: $sideMenuWidth;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        top: $topMenuHeight;
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
        ul {
            padding-bottom: 50px;
        }
    }
</style>
