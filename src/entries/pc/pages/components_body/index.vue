<template>
    <div class="page-components" ref="componentScrollBar">
        <side-menu></side-menu>
        <div class="page-components-content">
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
            width: 100vw;
            overflow: scroll;
            overflow-x: hidden;
            &::-webkit-scrollbar { /* 滚动条整体部分 */
                width: 10px;
            }
            &::-webkit-scrollbar-button { /* 滚动条两端的按钮 */
                width: 0;
                height: 0;
            }
            &::-webkit-scrollbar-track { /* 外层轨道 */
                border-right: 1px solid transparent;
                border-left: 1px solid transparent;
            }
            &::-webkit-scrollbar-track-piece { /*内层轨道，滚动条中间部分 */
                background-color: #FFF;
                border-radius: 10px;
            }
            &::-webkit-scrollbar-thumb { /* 滑块 */
                border-radius: 8px;
                background: #CBCBCB;
            }
            &::-webkit-scrollbar-corner { /* 边角 */
                display: block;
            }
            &::-webkit-scrollbar-thumb:hover { /* 鼠标移入滑块 */
                background: #909090;
            }
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
