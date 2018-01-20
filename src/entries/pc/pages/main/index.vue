<template>
    <div class="page-index">
        <top-menu></top-menu>
        <router-view class="page-index-router"></router-view>
    </div>
</template>

<script>
    import topMenu from './top_menu.vue'

    export default {
        name: 'index',
        components: {
            topMenu,
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../../common/basic_const";

    .page-index {
        height: 100%;
        width: 100vw;
        background: white;
        display: flex;
        flex-flow: row nowrap;
        .page-index-router {
            margin-top: $topMenuHeight;
            width: 100vw;
        }
    }
</style>
