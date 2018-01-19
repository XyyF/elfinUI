<template>
    <div id="app">
        <router-view class="page-root"></router-view>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import 'highlight.js/styles/color-brewer.css';
    import demo from './pages/demo/demo.vue'
    import router from './router.js';
    import store from './store';

    Vue.use(VueRouter)

    Vue.component(demo.name, demo)

    export default {
        name: 'app',
        data() {
            return {};
        },
        // 通过 router 配置参数注入路由，从而让整个应用都有路由功能
        router,
        store,
    }
</script>

<!-- 全局样式-->
<style lang="scss" src="./styles/basic.scss"></style>
<!--<style src="./styles/iconfont.css"></style>
<style src="./styles/iconfont_all/iconfont.css"></style>-->

<style>
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
    }

    #app {
        overflow-x: hidden;
        width: 100vw;
        height: 100%;

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
}
</style>
