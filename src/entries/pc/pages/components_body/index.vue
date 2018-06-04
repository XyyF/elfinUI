<template>
    <div class="page-components" ref="componentScrollBar">
        <side-menu></side-menu>
        <div class="page-components-content slide-scroll-root">
            <div class="page-components-scroll">
                <div class="page-components-wrap">
                    <router-view class="page-components-router"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import SideMenu from './side_menu.vue'

    @Component({
        name: 'component-body',
        components: { SideMenu },
    })
    export default class ComponentsBody extends Vue {
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../../common/pc/basic_const";

    .page-components {
        .page-components-content {
            height: 100%;
            width: 100%;
        }
        .page-components-scroll {
            width: 100vw;
        }
        .page-components-wrap {
            max-width: $mainContentWidth;
            margin: 0 auto;
            position: relative;
        }
        .page-components-router {
            padding-top: 60px;
            margin-left: $sideMenuWidth + 40px;
            padding-bottom: 40px;
        }
    }
</style>
