<template>
    <div id="app">
        <router-view class="page-root"></router-view>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component'
    import VueRouter from 'vue-router';
    import 'highlight.js/styles/color-brewer.css';
    /* todo 无法导入样式问题 */
    // import './styles/el-theme/index.css'
    import 'element-ui/lib/theme-chalk/index.css';
    import DemoPc from './pages/demo/demo-pc.vue'
    import DemoMobile from './pages/demo/demo-mobile.vue'
    import router from './router';
    import store from './store/index';

    Vue.use(VueRouter)

    Vue.component('demo-pc', DemoPc)
    Vue.component('demo-mobile', DemoMobile)

    @Component({
        name: 'app',
        router,
        store,
    })
    export default class App extends Vue {
    }
</script>

<!-- 全局样式-->
<style lang="scss" src="./styles/basic.scss"></style>
<!--<style src="./styles/iconfont.css"></style>
<style src="./styles/iconfont_all/iconfont.css"></style>-->

<style lang="scss" rel="stylesheet/scss">
    @import "../../../common/pc/basic_const";

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
    }

    #app {
        overflow-x: hidden;
        width: 100%;
        height: 100%;
        min-width: 320px;

        @when component {
            overflow-y: hidden;

            .main-cnt {
                padding: 0;
                margin-top: 0;
                height: 100%;
                min-height: auto;
            }

            .headerWrapper {
                position: fixed;
                width: 100%;
                left: 0;
                top: 0;
                z-index: 1500;

                .container {
                    padding: 0;
                }
            }
        }

        .slide-scroll-root {
            overflow: scroll;
            overflow-x: hidden;
            &::-webkit-scrollbar { /* 滚动条整体部分 */
                width: 6px;
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
        .bottom-scroll-root {
            overflow: scroll;
            overflow-y: hidden;
            &::-webkit-scrollbar { /* 滚动条整体部分 */
                height: 4px;
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
    }

    @media screen and (max-width: 1024px) {
        #app {
            // top_menu.vue
            .top-menu {
                padding: 0 40px;
                height: $small-topMenuHeight;
                .header {
                    display: flex;
                    flex-flow: row nowrap;
                    .menu-wrap {
                        position: relative;
                        flex-grow: 1;
                    }
                }
            }
            // main/index.vue
            .page-index-router {
                margin-top: $small-topMenuHeight;
            }
            // side_menu.vue
            .side-menu-root {
                top: $small-topMenuHeight;
            }
        }
    }

    @media screen and (max-width: 850px) {
        #app {
            // main/index.vue
            .page-index-router {
                margin-top: $large-topMenuHeight;
            }
            // side_menu.vue
            .side-menu-root {
                width: 100%;
                height: 80px;
                padding-top: 0;
                box-shadow: rgba(0, 0, 0, 0.137255) 0 4px 5px 0, rgba(0, 0, 0, 0.117647) 0 1px 10px 0, rgba(0, 0, 0, 0.2) 0 2px 4px -1px;
                overflow: initial;
                .side-menus--horizontal {
                    display: flex;
                    flex-flow: row nowrap;
                }
                .side-menus--vertical {
                    display: none;
                }
            }
            .page-components-router {
                padding: 10px;
                margin: 0;
            }
        }
    }
</style>
