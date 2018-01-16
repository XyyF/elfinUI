<template>
    <div class="hello">
        <el-menu>
            <el-menu-item v-for="menu, index in vxTopMenu" :key="index">{{menu}}</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
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
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
