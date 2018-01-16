<template>
    <div class="top-menu">
        <header class="header">
            <el-menu :default-active="String(0)">
                <el-menu-item
                    v-for="menu, topIndex in vxTopMenu"
                    :key="topIndex"
                    :index="`${topIndex}`">{{menu}}</el-menu-item>
            </el-menu>
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
        width: 100%;
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
        }
    }
</style>
