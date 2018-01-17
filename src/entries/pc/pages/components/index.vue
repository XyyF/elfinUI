<template>
    <div class="main-content">
        <side-menu></side-menu>
        <router-view class="main-content-router"></router-view>
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

    .main-content {
        &-router {
            margin-left: $sideMenuWidth;
            overflow: auto;
            position: relative;
        }
    }
</style>
