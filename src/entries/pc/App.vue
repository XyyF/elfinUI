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
    import './styles/el-theme/index.css'
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
