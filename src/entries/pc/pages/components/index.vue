<template>
    <div class="page-components">
        <side-menu></side-menu>
        <router-view class="page-components-router"></router-view>
    </div>
</template>

<script>
    import sideMenu from './side_menu.vue'

    export default {
        name: 'index',
        components: {
            sideMenu,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../components/pc/styles/basic_const";

    .page-components {
        &-router {
            margin-left: $sideMenuWidth + 40px;
            margin-bottom: 40px;
            overflow: auto;
            position: relative;
        }
    }
</style>
