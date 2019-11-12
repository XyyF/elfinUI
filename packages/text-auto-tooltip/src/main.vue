<template>
    <div
        class="text-auto-tooltip-root"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave">
        <div class="slot__wrap">
            <slot></slot>
        </div>
        <!--tips: 这里并不会导致dom浪费，因为tooltip是手动挂载的，默认是不会去渲染dom的-->
        <el-tooltip
            ref="tooltip"
            v-bind="tooltipProps"
            :content="tooltipContent">
        </el-tooltip>
    </div>
</template>

<script>
    import {debounce} from 'lodash'

    export default {
        name: 'text-auto-tooltip',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                tooltipContent: '',
                // 移入事件
                mouseEnter: debounce(this.handleMouseEnter, 300),
                // 移除事件
                mouseLeave: debounce(this.handleMouseLeave, 300),
                // 激活tooltip事件
                activateTooltip: debounce(tooltip => tooltip.handleShowPopper(), 50)
            }
        },
        props: {
            line: {
                type: Number,
                default: 1
            }
        },
        computed: {
            // prop值合并，placement默认展示top，可以由外部修改
            tooltipProps() {
                return Object.assign({}, {
                    placement: 'top',
                    // 打开的延时 500ms
                    openDelay: 500,
                    popperClass: 'text-auto-tooltip-popper-root',
                }, this.$attrs)
            }
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            // 鼠标移入事件
            handleMouseEnter() {
                const tooltip = this.$refs.tooltip
                if (!tooltip) return
                const slotDom = this.$el.querySelector('.slot__wrap')
                // 去描绘一段文本，获取文本实际宽度
                let previewDom = this.$el.querySelector('.slot__preview')
                if (!previewDom) {
                    previewDom = document.createElement('p')
                    previewDom.innerHTML = slotDom.childNodes[0].textContent
                    previewDom.className = 'slot__preview'
                    this.$el.appendChild(previewDom)
                }
                const range = document.createRange()
                range.setStart(previewDom, 0)
                range.setEnd(previewDom, previewDom.childNodes.length)
                // 元素的纯文本实际宽度
                const rangeWidth = range.getBoundingClientRect().width / this.line
                // 内边距,这里要加入padding判断是因为offsetWidth = width + padding
                const paddingLeft = parseInt(this.getStyle(this.$el, 'paddingLeft'), 10) || 0
                const paddingRight = parseInt(this.getStyle(this.$el, 'paddingRight'), 10) || 0
                const padding = paddingLeft + paddingRight
                // 元素的可见宽度
                const offsetWidth = this.$el.offsetWidth
                // 如果超出，展示tooltip
                // +2 是因为中文换行可能出现及像素的偏差
                if (rangeWidth + padding + 2 > offsetWidth) {
                    this.tooltipContent = slotDom.textContent || slotDom.innerText
                    tooltip.referenceElm = slotDom
                    tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
                    tooltip.doDestroy()
                    tooltip.setExpectedState(true)
                    this.activateTooltip(tooltip)
                }
            },
            // 鼠标移除事件
            handleMouseLeave() {
                const tooltip = this.$refs.tooltip
                if (!tooltip) return
                // 设置tooltip的状态
                tooltip.setExpectedState(false)
                // 手动关闭popper
                tooltip.handleClosePopper()
            },
            // 获取元素样式
            getStyle(element, styleName) {
                try {
                    const computed = window.getComputedStyle(element, '')
                    return element.style[styleName] || computed ? computed[styleName] : null
                } catch (e) {
                    return element.style[styleName]
                }
            }
        },
        mounted() {
            this.$el.style['-webkit-line-clamp'] = this.line
        }
    }
</script>


<style lang="scss" rel='stylesheet/scss'>
    .text-auto-tooltip-popper-root {
        max-width: 50%;
    }
</style>
<style lang="scss" rel='stylesheet/scss' scoped>
    .text-auto-tooltip-root /deep/ .slot__preview {
        visibility: hidden;
        position: absolute;
        white-space: nowrap;
    }

    .text-auto-tooltip-root {
        position: relative;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    .slot__wrap {
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
</style>
