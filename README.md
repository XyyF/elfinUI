# home1修改

> xiaojing0 UI

预览地址：[链接](http://www.xyyf.club)

vue + typescript + webpack + markdown

# 组件思想
> 第三方组件
> 项目组件
> 页面组件

拆分/提取组件：

* 具有复用价值
* 降低页面复杂度

#### 第三方组件
业务无关的组件（有复用价值），提取到组件项目，使用`npm`管理
#### 项目组件
业务相关的组件（有复用价值），提取到项目内的 `src/components` 目录下
#### 页面组件
没有复用价值的组件，或仅在该页面下有一定复用价值，提取到该页面层级的 `components` 目录下


# Vue 文件相关规范
```
<template>
    <div>
        <!--Notice: 组件换行格式-->
        <custom-component
            :class="customClass"
            :list="list"
            position="top">
            <div class="avatar"></div>
        </custom-component>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapGetters, mapState} from 'vuex'
    // Notice: 引入的组件实例，使用大驼峰命名法
    import CustomComponent from './custom_component.vue'
    
    // Notice: 注意元素的位置顺序
    export default {
        name:'', // Notice: 写组件的时候需要给一个名字
        directives: {},
        components: {
            CustomComponent
        },
        mixins: [],

        data() {
            return {
                timeRange: [], // Notice: 给data里面的变量留下说明文字
            }
        },
        props: {
            /**
             *  Notice: 写下props数据的描述、用途
             *  学生的年龄，筛选的时候会用到
             */
            age: {  // Notice: props 里面的定义，使用此结构，type、default
                type: Number,
                default: 0
            }
        },
        computed: {
            /*
                Notice: 写下computed数据的描述
            */
            ...mapGetters({
                vxgStudentList: 'student/studentList' // Notice: mapGetters 里面的变量，加 vxg 前缀
            }),
            ...mapState({
               vxStudentCount: state => state.student.count // Notice: mapState, mapActions, mapMutations 里面的变量，加 vx 前缀
            }),
            address() {
                return ''
            }
        },
        filters: {},

        methods: {
            /*
                Notice: 复杂的方法，写下说明
            */
            sayHello() {
            }
        },
        watch: {
            /*
                Notice: 写下说明
            */
            isLaughing() {
            }
        },

        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        activated() {},
        deactivated() {},
        beforeDestroy() {},
        destroyed() {},
        errorCaptured() {}
    }
</script>

<style lang="scss" rel="stylesheet/scss"></style>
```

# Vue 组件
```
<template>
    Notice: 组件元素的class命名规则（参考 BEM）
    
    Block-Element-Modifier
    1. Block 名字给跟节点
    2. 子元素 使用 Element-Modifier 风格
    3. style 标签 加上 scoped 属性

    对外的组件不能加上 scoped 属性，所以命名规则有所调整
    增加前缀 xjl
    比如：xjl-side-bar
    
    
    <div class="side-bar-root">
        <ul class="item-list">
            <li class="item item-active"></li>
        </ul>
    </div>
</template>
<script>
    /**
     *
        Notice: 用法说明，写下你的组件使用用例

        Notice: 写下使用组件时需要注意的事情
        :style="props.transStyle" 必须设置

        <transition-auto-height 
            :singleDuration="singleDuration"
            :itemCount="list.length">
            <template slot-scope="props">
                <div 
                    v-show="isFolded" 
                    class="list-container transition-auto-height" 
                    :style="props.transStyle">
                    <slot v-for="(item, index) in list" name="item" :listItem="item"></slot>
                </div>
            </template>
        </transition-auto-height>
        
     *
     */
     
    /**
     * method:
     *
     * initPagingValue
     * @param index {Number} 起始位置
     * @param limit {Number?} 显示数量限制（可选）
     * @param step {Number=20} 前进步数（可选，默认20）
     * @param school {Object?} 学校信息（可选）
        {
            name: String?, 学校名字
            address: String?, 学校地址
        }
     */
     
    /**
     * event:
     *
     * page-changed
     * @param page {Number}          当前的页数
     * @param startIndex {Number}   数据开始的 index
     *
     * click
     * @param name {String}         学生姓名
     */
     
    /**
     * slot:
     *
     * default 插入子元素
     * 
     * header 在顶部插入元素
     * slot-scope
     * @param title {String} 标题名
     * @param color {String} 标题颜色
     */
     
     export default {
        props: {
            // Notice: 组件当中善用 v-model
            value: {
                type: String,
                default: ''
            },
        }
     }
</script>
<style scoped>
    .side-bar-root {
        .item {
            display: flex;
            &-active: {
                 Notoce: 禁止使用此类用法，不利于搜索查找   
            }
        }
        .item-active {
            background: red;
        }
    }
</style>
```

# Vuex 规范
#### index.js
```javascript
// Notice 为定义的数据注释说明
const state = {
    /**
     * 主页标题
     */
    name: ''
}
```
#### action.js
```javascript
import api from 'api.js'
// Notice 为定义的方法注释说明
// 传递给 api 的参数，封装成对象 params
// 调用action 方法的vue文件，需跳转到API文件查看此方法所需参数
export default {
    // 开始监听后端数据更新
    startSync({commit, params}) {
        return api.doSomething(params)
    },
}
```
#### api.js
```javascript
import httpRequestor from 'httpRequestor'
// Notice 为定义的方法注释说明
// 传递给后台的 body 数据，封装成对象 params
// 同时有传递给后台的 query 数据，封装成 query
export default {
    // Notice 需要对方法有完整的注释
    /**
     * 方法描述说明
     * @param params {Object}
     * {
     *  schoolName: String? 当前学生所在学校名字
     *  schoolId: String 学校的Id
     * }
     */
    doSomething(params) {
    },
    /**
     * 方法描述说明
     * @param query {Object}
     * {
     *  name: String？ 学生名字
     *  student_id: String 学生id
     * }
     * @param params {Object}
     * {
     *  schoolName: String? 当前学生所在学校名字
     *  schoolId: String 学校的Id
     * }
     */
    doAnotherThing(query, params) {
    }
}
```


