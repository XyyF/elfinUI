<template>
    <div class="page-index">
        <top-menu></top-menu>
        <router-view class="page-index-router"></router-view>
    </div>
</template>

<script>
    import topMenu from './top_menu.vue'
    import sideMenu from '../components/side_menu.vue'

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
        display: flex;
        flex-flow: row nowrap;
        .page-index-router {
            width: $mainContentWidth;
            margin: $topMenuHeight auto 0;
        }
    }
</style>
