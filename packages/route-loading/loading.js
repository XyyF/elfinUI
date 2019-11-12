import fairyImg from './fairy.png'

const options = {
    data() {
        return {
            visible: false,
            imgVisible: false,
            fairyImg,
            // 是否显示过
            // 正在初始化div，route-loading-invisible 不能添加到div上，不然会显示动画
            hadShowed: false,
            // 是否禁止用户事件/点击
            disablePointEvent: false,
        }
    },
    methods: {
        show(disablePointEvent) {
            this.disablePointEvent = disablePointEvent
            this.visible = true
        },
        close() {
            this.visible = false
        },
    },
    render(h) {
        const {
            visible,
            imgVisible,
            fairyImg,
            hadShowed,
        } = this

        return h(
            'div',
            {
                class: {
                    'route-loading-root': true,
                    'route-loading-visible': visible,
                    'route-loading-invisible': hadShowed && !visible,
                },
            },
            imgVisible ? [
                h(
                    'span',
                    {
                        class: 'route-loading-tips',
                    },
                    '加载中...',
                ),
                h(
                    'img',
                    {
                        attrs: {
                            src: fairyImg,
                        },
                    },
                    'visible',
                ),
            ] : null,
        )
    },
    watch: {
        /**
         * imgVisible 用来控制图片是否可见
         * 整个加载组件在收起的时候，有一个动画
         * 需要等待动画结束后，才能隐藏图片（imgVisible 重置为 false）
         */
        visible(val) {
            if (val) {
                this.imgVisible = val
                this.hadShowed = true
                if (this.disablePointEvent) {
                    document.querySelector('body').style.pointerEvents = 'none'
                }
            }
            else {
                setTimeout(() => {
                    this.imgVisible = false
                }, 200)
                document.querySelector('body').style.pointerEvents = ''
            }
        },
    },
}

export default class Loading {
    constructor(Vue) {
        this.Vue = Vue
        this.timerToShow = 0
        this.initView()
    }

    initView() {
        const LoadingView = this.Vue.extend(options)
        this.loadingView = new LoadingView().$mount()
        document.querySelector('body').appendChild(this.loadingView.$el)
    }

    show(disablePointEvent) {
        // 一定时间内还没有调用close，才显示加载态
        if (this.timerToShow) return
        this.timerToShow = setTimeout(() => {
            this.loadingView.show(disablePointEvent)
        }, 600)
    }

    close() {
        if (this.timerToShow) {
            clearTimeout(this.timerToShow)
            this.timerToShow = 0
        }
        this.loadingView.close()
    }
}