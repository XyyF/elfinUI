<template>
    <div class="top-menu">
        <header class="header">
            <div class="xiaojing0-logo-wrap">
                <div class="xiaojing0-logo">
                    <img src="../../images/logo-login.png"/>
                </div>
                <span class="logo-title">xiaojing0</span>
            </div>
            <div class="menu-wrap">
                <nav class="menus--left">
                    <template v-for="menu in vxTopMenu">
                        <router-link
                            :to="{name: menu.routeName}"
                            @click.native="setMenuId(menu.id)"
                            :class="{'is-active': menu.id === menuId}"
                            class="sub-link">
                            <span class="menu__link">{{menu.name}}</span>
                        </router-link>
                    </template>
                </nav>
                <nav class="menus--right">
                    <a class="sub-link" href="https://github.com/XyyF/xiaojing0UI">
                        <span class="menu__link">github</span>
                    </a>
                </nav>
                <!--<el-menu
                    background-color="#C2185B"
                    text-color="#fff"
                    :default-active="String(0)">
                    <template v-for="menu, topIndex in vxTopMenu">
                        <router-link :to="{name: menu.routeName}" class="sub-link">
                            <el-menu-item
                                :key="topIndex"
                                :index="`${topIndex}`">{{menu.name}}
                            </el-menu-item>
                        </router-link>
                    </template>
                </el-menu>-->
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
    import {Menu, MenuItem} from 'meetin-sass-ui'

    interface TopMenu {
        id: string;
        routeName: string;
        name: string,
    }

    @Component({
        name: 'top-menu',
        components: {
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem
        },
    })
    export default class SideMenu extends Vue {
        @State(state => state.topMenu) vxTopMenu: Array<TopMenu>;
        menuId: string = '';

        setMenuId(id: string): void {
            this.menuId = id
        }
        // life
        mounted() {
            const nowRouter = this.vxTopMenu.find((t: TopMenu) => {
                return t.routeName === this.$route.name
            });
            this.menuId = (nowRouter && nowRouter.id) || this.vxTopMenu[0].id
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../../common/pc/basic_const";

    .top-menu {
        width: 100%;
        height: $large-topMenuHeight;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        padding: 40px;
        background-color: #C2185B;
        .header {
            width: 100%;
            margin: 0 auto;
            .xiaojing0-logo-wrap {
                display: flex;
                align-items: center;
                .xiaojing0-logo {
                    background-image: linear-gradient(-229deg, #4EE41A 0%, #1BA7EB 99%);
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 20px;
                        height: 20px;
                    }
                }
                .logo-title {
                    margin-left: 20px;
                    font-size: 24px;
                    color: #fff;
                }
            }
            .menu-wrap {
                position: absolute;
                bottom: 0;
                left: 20px;
                right: 20px;
                height: 64px;
                line-height: 64px;
                .menu__link {
                    color: #fff;
                }
                .menus--left {
                    float: left;
                }
                .menus--right {
                    float: right;
                }
                .sub-link {
                    display: inline-block;
                    font-weight: 500;
                    font-size: 13px;
                    height: 64px;
                    padding: 0 20px;
                    color: #fff;
                    box-sizing: border-box;
                    border-bottom: 3px solid transparent;
                    &.is-active {
                        border-bottom-color: #fff;
                    }
                }
            }
        }
    }
</style>
