<template>
    <transition
        @before-enter="animationBeforeEnter"
        @enter="animationEnter"
        @after-enter="animationAfterAnimation"

        @before-leave="animationBeforeLeave"
        @leave="animationLeave"
        @after-leave="animationAfterAnimation">
        <slot :trans-style="{transition: `height ${animationDuration}ms`}"></slot>
    </transition>
</template>

/*********************************************/

/**
 *
    用法说明

    :style="props.transStyle" 必须设置

    <transition-auto-height :singleDuration="singleDuration" :itemCount="list.length">
        <template slot-scope="props">
            <div v-show="isFolded" class="list-container transition-auto-height" :style="props.transStyle">
                <slot v-for="(item, index) in list" name="item" :listItem="item"></slot>
            </div>
        </template>
    </transition-auto-height>
 *
 */
<script type="text/jsx">
    export default {
        data () {
            return {
                foldDuration: 300,
                listOldHeight: 0
            };
        },
        props: {
            /**
             * 单个 item 动画时间/ms
             * 如果设置了singleDuration，动画时间将是 item 数量乘以 singleDuration
             */
            singleDuration: {
                type: Number,
                default: 0
            },
            itemCount: {
                type: Number,
                default: 0
            }
        },
        computed: {
            // 动画持续时间 - 固定300ms 或者 item数量乘以singleDuration
            animationDuration() {
                if (!this.singleDuration) {
                    return this.foldDuration
                }
                return this.singleDuration * this.itemCount
            }
        },
        methods: {
            /**
             * animation
             */
            animationBeforeEnter(el) {
                if (this.listOldHeight === 0) {
                    return
                }
                el.style.height = '0'
            },
            /**
             * animation
             */
            animationEnter(el, done) {
                if (this.listOldHeight === 0) {
                    /**
                     * 初始化的时候   listOldHeight === 0
                     * 立马缓存 el 现在的高度
                     * 然后强制渲染 height = ‘0’，后续才会有展开的动画
                     */
                    this.listOldHeight = el.clientHeight
                    el.style.height = '0'
                    this.$forceUpdate()
                }
                setTimeout(() => {
                    el.style.height = `${this.listOldHeight}px`
                }, 20)
                setTimeout(() => {
                    done()
                }, this.animationDuration)
            },
            /**
             * animation
             */
            animationBeforeLeave(el) {
                this.listOldHeight = el.clientHeight
                el.style.height = `${this.listOldHeight}px`
            },
            /**
             * animation
             */
            animationLeave(el, done) {
                setTimeout(() => {
                    el.style.height = '0'
                }, 20)
                // todo 优化:durtion的形式设置动画时间
                setTimeout(() => {
                    done()
                }, this.animationDuration)
            },
            /**
             * animation
             */
            animationAfterAnimation(el) {
                el.style.height = ''
            },
        },
        watch: {
            animationDuration: {
                immediate: true,
                handler(val) {
//                    this.$el.querySelector('.transition-auto-height').style.transition = `height ${val}ms`
                }
            }
        },
    }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">

</style>
