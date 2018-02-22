<template>
    <div class="page-workbench">
        <div class="page-workbench-wrap">
        xiaojing0UI
        <a href="http://xiaojing0.com/#/">官网</a>
        成员：Nate、Butters、Rengar
        </div>
        <div>
            vue编程规范：
            <p>Vue属性顺序:name、mixins、data、props、components、computed、methods、filter、created、mounted、。。。</p>
            <p>表驱动法-减少硬编码</p>
            <p>函数命名->若是student下的list就代表studentList，可减少长度。getters中的命名统一添加g开头</p>
            <p>提炼：判断、块级中多次引用，有两次以上的引用次数的变量，开头提出</p>
        </div>
        <div>
            后端编程规范：
            <p>subtask层分为：check、数据库操作、底层方法</p>
            <p>router层将权限提出展示</p>
            <p>manager层将数据库筛选和变量筛选字段集合提出展示</p>
            <p>数据库model层分为：监听列表、数据库方法、对外接口</p>
            <p>函数的参数：若有可选参数，就用解构赋值</p>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Input } from 'meetin-sass-ui'

    @Component({
        name: 'workbench-page',
        components: {
            [Input.name]: Input,
        }
    })
    export default class Workbench extends Vue {
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../../../common/pc/basic_const";

    .page-workbench {
        height: 100%;
        &-wrap {
            max-idth: $mainContentWidth;
            margin: 0 auto;
            padding-top: $topMenuHeight;
        }
    }
</style>
