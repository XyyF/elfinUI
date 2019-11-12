import apiOperation from '@external/edu-saas-data-center/api/operation.js'
import {NotifyType, receiverType} from '@external/microserver_common/constant/oss_const.js'

const FE_UI_NOTIFY_CLOSE_TIME = 'FE_UI_NOTIFY_CLOSE_TIME'

function _getToday() {
    const today = new Date()
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
}

// 横幅
const barViewOptions = {
    props: {
        // 提醒内容，横幅只能显示一个
        notify: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        // 关闭提示
        async handleClose() {
            // remove html node
            this.$el.remove()
            // destroy
            this.$destroy()

            try {
                const params = {
                    notifyIds: [this.notify.notifyId],
                }
                await apiOperation.setNoMoreDisplay(params)
            }
            catch (e) {
                throw e
            }
        },
    },
    render(h) {
        const {
            notify,
            handleClose,
        } = this

        return h(
            'div',
            {
                class: 'display-bar-notify-root',
            },
            [
                h(
                    'span',
                    notify.displayContent.content,
                ),
                h(
                    'i',
                    {
                        class: 'display-bar-close el-icon-circle-close',
                        on: {
                            click: handleClose,
                        },
                    },
                ),
            ],
        )
    },
}

// 弹框
const dialogViewOptions = {
    data() {
        return {
            // 是否勾选了不再显示
            noMoreDisplay: false,
            // 设置不再显示的loding态
            loading: false,
        }
    },
    props: {
        // 提醒内容列表
        notifies: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        // 点击图片，打开新页面标签
        async handleJump(notify) {
            window.open(notify.displayContent.jumpLink, 'blank')

            // 已读的通知，设置不再显示
            try {
                const params = {
                    notifyIds: [notify.notifyId],
                }
                await apiOperation.setNoMoreDisplay(params)
            }
            catch (err) {
                throw err
            }
        },
        handleChangeCheckbox(val) {
            this.noMoreDisplay = val
        },
        async handleClose() {
            try {
                if (this.noMoreDisplay) {
                    this.loading = true
                    const params = {
                        notifyIds: this.notifies.map(item => item.notifyId),
                    }
                    await apiOperation.setNoMoreDisplay(params)
                }
                // remove html node
                this.$el.remove()
                // destroy
                this.$destroy()
            }
            catch (e) {
                this.loading = false
                throw e
            }
            this.loading = false
        },
    },
    render(h) {
        const {
            notifies,
            handleJump,
            noMoreDisplay,
            handleChangeCheckbox,
            handleClose,
            loading,
        } = this
        return h(
            'div',
            {
                class: 'display-notify-mask',
            },
            [
                h(
                    'i',
                    {
                        class: 'display-notify-close el-icon-circle-close',
                        on: {
                            click: handleClose,
                        },
                    },
                ),
                h(
                    'el-carousel',
                    {
                        props: {
                            indicatorPosition: 'outside',
                            autoplay: false,
                        },
                        class: 'display-notify-content',
                        directives: [{
                            name: 'loading',
                            value: loading,
                        }],
                    },
                    notifies.map(item => {
                        return h(
                            'el-carousel-item',
                            {
                                key: item.notifyId,
                            },
                            [
                                h(
                                    'img',
                                    {
                                        class: 'carousel-item-img',
                                        attrs: {
                                            src: item.displayContent.picUrl.imgWindow,
                                        },
                                        on: {
                                            click() {
                                                handleJump(item)
                                            },
                                        },
                                    },
                                ),
                            ],
                        )
                    }),
                ),
                h(
                    'el-checkbox',
                    {
                        props: {
                            value: noMoreDisplay,
                        },
                        on: {
                            change: handleChangeCheckbox,
                        },
                        style: {
                            color: 'white',
                        },
                    },
                    '关闭并不再显示',
                ),
            ],
        )
    },
}

export default class Controller {
    constructor(Vue) {
        this.Vue = Vue
        this.notifyList = []
        this.BarView = this.Vue.extend(barViewOptions)
        this.DialogView = this.Vue.extend(dialogViewOptions)
    }

    /**
     * 显示全局通知
     * 不传入 notifyId，自动拉取最新可以显示的数据，显示出来
     * @param notifyId {string} 仅显示 notifyId 的数据，无论是否下架
     */
    async displayNotifyView(notifyId) {
        try {
            // 先同步数据
            if (notifyId) {
                const params = {
                    notifyId,
                    selectArray: [
                        'notifyId',
                        'displayContent',
                        'notifyType',
                    ],
                }
                const result = await apiOperation.fetchDetail(params)
                this.notifyList = [result]
            }
            else {
                const params = {
                    receiverType: receiverType.ORGANIZATION
                }
                this.notifyList = await apiOperation.fetchNewNotifyList(params)
            }
            // 没有需要显示的通知
            if (this.notifyList.length === 0) return
            this._displayBarNotify()
            this._displayDialogNotify()
        }
        catch (e) {
            throw e
        }
    }

    _displayBarNotify() {
        const barNotifies = this.notifyList.filter(item => item.notifyType === NotifyType.TOP_BAR)
        if (barNotifies.length === 0) return

        const barView = new this.BarView({
            propsData: {
                notify: barNotifies[0],
            },
        })
        barView.$mount()
        const appNode = document.querySelector('#app')
        document.querySelector('body').insertBefore(barView.$el, appNode)
    }

    _displayDialogNotify() {
        const lastDisplayDate = localStorage.getItem(FE_UI_NOTIFY_CLOSE_TIME)
        if (lastDisplayDate === _getToday()) return

        const dialogNotifies = this.notifyList.filter(item => item.notifyType === NotifyType.WINDOW)
        if (dialogNotifies.length === 0) return

        const dialogViwe = new this.DialogView({
            propsData: {
                notifies: dialogNotifies,
            },
        })
        dialogViwe.$mount()
        document.querySelector('body').append(dialogViwe.$el)

        // 设置本次显示的时间
        localStorage.setItem(FE_UI_NOTIFY_CLOSE_TIME, _getToday())
    }
}