<template>
    <div class="page-index">
        31231
        <top-menu></top-menu>
        <side-menu></side-menu>
        <router-view class="content"></router-view>
    </div>
</template>

<script>
    import topMenu from './top_menu.vue'
    import sideMenu from './side_menu.vue'

    export default {
        name: 'index',
        components: {
            topMenu,
            sideMenu,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../components/pc/styles/basic_const";

    .page-index {
        height: 100%;
        width: 100%;
        background: white;
        .content {
            margin-left: $sideMenuWidth;
            overflow: auto;
            position: relative;
        }
        &.hidden-scroll {
            overflow: hidden;
        }
    }
</style>
