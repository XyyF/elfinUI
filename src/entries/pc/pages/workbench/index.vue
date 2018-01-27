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
            <p>函数命名->若是student下的list就代表studentList</p>
            <p>提炼：判断、块级中多次引用</p>
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
