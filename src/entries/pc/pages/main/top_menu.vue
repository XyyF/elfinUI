<template>
    <div class="top-menu">
        <header class="header">
            <div class="xiaojing0-logo-wrap">
                <router-link to="/admin/workbench">
                    <div class="xiaojing0-logo">
                        <img src="../../images/logo-login.png"/>
                    </div>
                </router-link>
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

<script>
    import { mapState } from 'vuex'
    import { Menu, MenuItem } from 'meetin-sass-ui'

    export default {
        name: 'top-menu',
        computed: {
            ...mapState({
                vxTopMenu: state => state.topMenu,
            })
        },
        components: {
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../../components/pc/styles/basic_const";

    .top-menu {
        width: 100vw;
        height: $topMenuHeight;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        background-color: #fff;
        line-height: 80px;
        .header {
            width: $mainContentWidth;
            margin: 0 auto;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
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
            }
            .menu-wrap {
                width: 755px;
                height: 100%;
            }
        }
    }
</style>
