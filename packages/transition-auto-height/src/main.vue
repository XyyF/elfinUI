<template>
    <transition
        @before-enter="animationBeforeEnter"
        @enter="animationEnter"
        @after-enter="animationAfterAnimation"

        @before-leave="animationBeforeLeave"
        @leave="animationLeave"
        @after-leave="animationAfterAnimation">
        <slot :trans-style="{transition: `height ${animationDuration}ms`}"
        >
        </slot>

    </transition>
</template>

/*********************************************/

<script type="text/jsx">
    export default {
        name: 'transition-auto-height',
        data() {
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
                el = el.querySelector('.el-dialog')
                console.log(el)
                if (this.listOldHeight === 0) {
                    return
                }
                el.style.height = '0'
            },
            /**
             * animation
             */
            animationEnter(el, done) {
                el = el.querySelector('.el-dialog')
                if (this.listOldHeight === 0) {
                    /**
                     * 初始化的时候   listOldHeight === 0
                     * 立马缓存 el 现在的高度
                     * 然后强制渲染 height = ‘0’，后续才会有展开的动画
                     */
                    this.listOldHeight = el.clientHeight
                    console.log(this.listOldHeight)
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
                el = el.querySelector('.el-dialog')
                this.listOldHeight = el.clientHeight
                el.style.height = `${this.listOldHeight}px`
            },
            /**
             * animation
             */
            animationLeave(el, done) {
                el = el.querySelector('.el-dialog')
                setTimeout(() => {
                    el.style.height = '0'
                }, 20)
                setTimeout(() => {
                    done()
                }, this.animationDuration)
            },
            /**
             * animation
             */
            animationAfterAnimation(el) {
                el = el.querySelector('.el-dialog')
                el.style.height = ''
            },
        },
        watch: {
            // animationDuration: {
            //     immediate: true,
            //     handler(val) {
            //         this.$el.querySelector('.transition-auto-height').style.transition = `height ${val}ms`
            //     }
            // }
        },
    }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">

</style>
