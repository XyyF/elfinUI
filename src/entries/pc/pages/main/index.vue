<template>
    <div class="page-index">
        <top-menu></top-menu>
        <div class="main-content">
            <side-menu></side-menu>
            <router-view class="content"></router-view>
        </div>
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
        display: flex;
        flex-flow: row nowrap;
        .main-content {
            width: $mainContentWidth;
            margin: $topMenuHeight auto 0;
        }
        .content {
            margin-left: $sideMenuWidth;
            overflow: auto;
            position: relative;
        }
    }
</style>
