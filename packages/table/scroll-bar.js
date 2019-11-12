import _ from 'lodash'

// <!--滚动条显示在页面的下方，fixed-->
// <!--这里创建了两个div，承载可视框宽度和table 列表的内容宽度-->
// <!--监听table横向滚动事件-->
function getAbsoluteLeft(dom) {
    let oLeft = dom.offsetLeft
    while (dom.offsetParent != null) {
        const oParent = dom.offsetParent
        oLeft += oParent.offsetLeft
        dom = oParent
    }
    return oLeft || 0
}

function getAbsoluteRight(dom) {
    let oRight = dom.offsetRight
    while (dom.offsetParent != null) {
        const oParent = dom.offsetParent
        oRight += oParent.offsetRight
        dom = oParent
    }
    return oRight || 0
}

export default class {
    constructor(tableDom, scrollDom, referenceDom) {
        // el-table-wrapper dom, table 的 container
        this.tableWrapperDom = null
        this.scrollDom = null
        // 参考dom
        this.referenceDom = null
        // 滚动条可视宽度
        this.width = 0
        // 滚动条实际宽度
        this.contentWidth = 0


        // 调用频率控制
        // 避免 table scroll event 和 self scroll event 循环触发
        this.debouncedEnableTableScrollListener = _.debounce(this.enableTableScrollListener, 500)
        this.debouncedEnableSelfScrollListener = _.debounce(this.enableSelfScrollListener, 500)

        // EventListener 处理函数
        // 便于 removeEventListener
        this.selfScrollHandler = this.selfScrollEventHandler.bind(this)
        this.tableScrollHandler = this.tableScrollEventHandler.bind(this)
        this.windowResizeHandler = _.throttle(this.calculateScrollbarWidth.bind(this), 200)
        this.addWindowResizeListener()

        this.configureDom(tableDom, scrollDom, referenceDom)
    }

    // 组件释放是调用此方法
    destructor() {
        this.removeWindowResizeListener()
        this.enableSelfScrollListener(false)
        this.enableTableScrollListener(false)
    }

    configureDom(tableDom, scrollDom, referenceDom) {
        if (!tableDom || !scrollDom) return
        // el-table dom，table 组件最外层
        this.tableWrapperDom = tableDom.querySelector('.el-table__body-wrapper')
        this.scrollDom = scrollDom || null
        this.referenceDom = referenceDom || null

        this.calculateScrollbarWidth()
        this.enableSelfScrollListener(true)
        this.enableTableScrollListener(true)
    }

    // window 大小变化、数据变化、表头宽度变化 等场景需要触发此方法
    calculateScrollbarWidth() {
        if (!this.tableWrapperDom || !this.scrollDom) {
            // 页面已经关闭了
            return
        }

        // 计算滚动条的绝对位置
        if (this.referenceDom) {
            const offsetLeft = getAbsoluteLeft(this.referenceDom)
            const offsetRight = getAbsoluteRight(this.referenceDom)
            this.scrollDom.setAttribute('style', `left: ${offsetLeft}px; right: ${offsetRight}px`)
        }

        // get width
        this.width = this.scrollDom.clientWidth

        // get conentWidth
        const tableRealWidth = this.tableWrapperDom.querySelector('table').clientWidth
        const rate = tableRealWidth / this.tableWrapperDom.clientWidth
        this.contentWidth = rate > 1 ? this.width * rate : 0
        // set to style
        this.scrollDom.firstElementChild.setAttribute('style', `width: ${this.contentWidth}px`)
    }

    addWindowResizeListener() {
        // 更新 fixed scroll 的宽和内容宽
        window.addEventListener('resize', this.windowResizeHandler)
    }

    removeWindowResizeListener() {
        window.removeEventListener('resize', this.windowResizeHandler)
    }

    enableSelfScrollListener(enable) {
        // 热更新导致报错
        if (!this.scrollDom) return
        if (enable) {
            this.scrollDom.addEventListener('scroll', this.selfScrollHandler)
        }
        else {
            this.scrollDom.removeEventListener('scroll', this.selfScrollHandler)
        }
    }

    enableTableScrollListener(enable) {
        // 热更新导致报错
        if (!this.tableWrapperDom) return
        if (enable) {
            this.tableWrapperDom.addEventListener('scroll', this.tableScrollHandler)
        }
        else {
            this.tableWrapperDom.removeEventListener('scroll', this.tableScrollHandler)
        }
    }

    // 监听自身的滚动事件
    selfScrollEventHandler(e) {
        this.enableTableScrollListener(false)
        this.tableWrapperDom.scrollLeft = e.target.scrollLeft
        this.debouncedEnableTableScrollListener(true)
    }

    // 监听table的滚动事件
    tableScrollEventHandler(e) {
        this.enableSelfScrollListener(false)
        this.scrollDom.scrollLeft = e.target.scrollLeft
        this.debouncedEnableSelfScrollListener(true)
    }
}