<template>
    <div class="page-components" ref="componentScrollBar">
        <div class="page-components-wrap">
            <side-menu></side-menu>
            <router-view class="page-components-router"></router-view>
        </div>
    </div>
</template>

<script>
    import sideMenu from './side_menu.vue'

    export default {
        name: 'index',
        data() {
            return {
                showBackToTop: false,
                scrollTop: 0,
            }
        },
        components: {
            sideMenu,
        },
        watch: {
            '$route'(val, oldValue) {
                if (val.hash !== oldValue.hash) {
                    const el = document.querySelector(`#${val.hash.slice(1)}`)
                }
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../components/pc/styles/basic_const";

    .page-components {
        &-wrap {
            width: $mainContentWidth;
            margin: 0 auto;
            padding-top: $topMenuHeight;
            position: relative;
        }
        &-router {
            padding-top: 60px;
            margin-left: $sideMenuWidth + 40px;
            padding-bottom: 40px;
            position: relative;
        }
    }
</style>
