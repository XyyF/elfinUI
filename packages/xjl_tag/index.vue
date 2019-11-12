<template>
    <div class="xjl-tag-root" :style="sizeItem">
        <svg
            v-if="type === 'arrow'"
            width="12"
            :height="24"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-svg-icon">
            <g>
                <path
                    id="svg_1"
                    stroke="null"
                    :fill="themeItem.borderColor"
                    d="m10.64376,1.35112a3.55334,3.55334 0 0 0 -2.87794,1.29934c-4.34692,5.29743 -6.58137,8.78858 -6.58137,9.95289c0,1.13115 2.21669,4.27763 6.54702,8.93427a3.55334,3.55334 0 0 0 2.60223,1.13352l37.04412,0a3.55334,3.55334 0 0 0 3.55334,-3.55334l0,-14.21334a3.55334,3.55334 0 0 0 -3.55334,-3.55334l-36.73406,0zm-0.13121,-1.18444l36.86527,0a4.73778,4.73778 0 0 1 4.73778,4.73778l0,14.21334a4.73778,4.73778 0 0 1 -4.73778,4.73778l-37.04412,0a4.73778,4.73778 0 0 1 -3.46984,-1.51135c-4.5761,-4.92137 -6.86386,-8.16794 -6.86386,-9.74088c0,-1.57117 2.28361,-5.13931 6.85024,-10.70442a4.73778,4.73778 0 0 1 3.66172,-1.73225l0.00059,0z"/>
                <path
                    id="svg_11"
                    d="m11.973783,1.344569c0,0 -2.134832,0.037453 -2.16105,0.003745c0.026218,0.033708 -1.24719,0.483146 -1.24719,0.483146c0,0 -1.161049,1.273408 -1.161049,1.273408c0,0 -1.64794,1.985019 -1.674158,1.951311c0.026218,0.033708 -2.146067,2.917603 -2.146067,2.917603c0,0 -1.722846,2.846442 -1.722846,2.846442c0,0 -0.749064,1.610487 -0.775281,1.576779c0.026218,0.033708 0.28839,0.932585 0.28839,0.932585c0,0 0.82397,1.573034 0.82397,1.573034c0,0 1.685393,2.284644 1.659175,2.250936c0.026218,0.033708 2.835207,3.329589 2.808989,3.29588c0.026218,0.033709 1.786518,1.756555 1.7603,1.722846c0.026218,0.033709 1.411986,0.483147 1.411986,0.483147c0,0 1.498127,0.074906 1.498127,0.074906c0,0 1.123596,-0.074906 1.097377,-0.108615"
                    opacity="1"
                    fill-opacity="null"
                    stroke-opacity="null"
                    stroke-width="null"
                    stroke="null"
                    :fill="themeItem.backgroundColor"/>
            </g>
        </svg>
        <span class="xjl-tag" :style="xjlTagStyle">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    import {themeConfig, themeName, sizeConfig, sizeName} from './theme'

    /**
     * svg 解决方案
     * */
    export default {
        name: 'xjl-tag',
        data() {
            return {}
        },
        props: {
            /**
             * 支持2种样式 默认为箭头
             * 可选值 arrow | rect (
             * */
            type: {
                type: String,
                default: 'arrow',
            },
            /**
             * 主题请到theme.js中查看配置 默认为蓝色
             * */
            theme: {
                type: String,
                default: themeName.BLUE,
            },
            /**
             * 尺寸请到theme.js中查看配置 默认为正常大小
             * */
            size: {
                type: String,
                default: sizeName.NORMAL,
            },
        },
        computed: {
            /* tag样式 */
            xjlTagStyle() {
                const extraCss = Object.create(null)
                // 箭头则去掉左边框
                if (this.isArrow) {
                    extraCss.borderLeft = 'none'
                }
                else {
                    extraCss.borderRadius = '0'
                    extraCss.fontSize = '12px'
                }
                return {...extraCss, ...this.themeItem}
            },
            // 是否是箭头tag
            isArrow() {
                return this.type === 'arrow'
            },
            // 主题当前配置
            themeItem() {
                return themeConfig[this.theme] || themeConfig[themeName.BLUE]
            },
            // 尺寸当前配置
            sizeItem() {
                return sizeConfig[this.size] || sizeConfig[sizeName.NORMAL]
            },
        },
        methods: {},
        watch: {},
    }
</script>

<style lang="scss" scoped>

    .xjl-tag-root {
        position: relative;
        white-space: nowrap;
        display: inline-block;
        font-size: 0;
        vertical-align: middle;
        margin-right: 10px;
    }

    .xjl-tag {
        font-size: 14px;
        padding: 0 5px;
        height: 24px;
        line-height: 22px;
        border: 1px solid #50BFFE;
        color: #50BFFE;
        background-color: #DCF2FF;
        display: inline-block;
        vertical-align: middle;
        border-radius: 4px;
        position: relative;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

    }

    .arrow-svg-icon {
        display: inline-block;
        vertical-align: middle;
        margin-right: -1px;
        position: relative;
        z-index: 10;
    }
</style>