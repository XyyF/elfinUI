<template>
    <div class="top-menu">
        <header class="header">
            <div class="xiaojing0-logo-wrap">
                <router-link to="/admin/workbench">
                    <div class="xiaojing0-logo">
                        <img src="../../images/logo-login.png"/>
                    </div>
                </router-link>
                <span class="logo-title">xiaojing0</span>
            </div>
            <div class="menu-wrap">
                <el-menu :default-active="String(0)">
                    <template v-for="menu, topIndex in vxTopMenu">
                        <router-link :to="{name: menu.routeName}" class="sub-link">
                            <el-menu-item
                                :key="topIndex"
                                :index="`${topIndex}`">{{menu.name}}
                            </el-menu-item>
                        </router-link>
                    </template>
                </el-menu>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {
        State
    } from 'vuex-class'
    import { Menu, MenuItem } from 'meetin-sass-ui'

    @Component({
        name: 'top-menu',
        components: {
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem
        }
    })
    export default class SideMenu extends Vue {
        @State(state => state.topMenu) vxTopMenu: Array<Object>
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../../../common/pc/basic_const";

    .top-menu {
        width: 100%;
        height: $topMenuHeight;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        line-height: 80px;
        .header {
            border-bottom: 1px solid #e7eef0;
            width: $mainContentWidth;
            margin: 0 auto;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            background: #fff;
            .xiaojing0-logo-wrap {
                width: 54px;
                height: $topMenuHeight;
                display: flex;
                align-items: center;
                .xiaojing0-logo {
                    background-image: linear-gradient(-229deg, #4EE41A 0%, #1BA7EB 99%);
                    width: 54px;
                    height: 54px;
                    border-radius: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
                .logo-title {
                    margin-left: 20px;
                    font-size: 24px;
                }
            }
            .menu-wrap {
                width: 755px;
                height: $topMenuHeight;
                display: flex;
                align-items: center;
                .el-menu {
                    border: none;
                }
            }
        }
    }
</style>
