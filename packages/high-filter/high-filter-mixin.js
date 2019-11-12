import {cloneDeep} from 'lodash'

export default {
    data() {
        return {
            /**
             * 过滤数据项
             * need to override
             */
            filterData: {},
        }
    },
    computed: {
    },
    methods: {
        // 重置筛选数据
        reset() {
            const filterData = Object.keys(this.filterData)
            filterData.forEach(key => {
                this.filterData[key] = undefined
            })
            const timeFilterData = Object.keys(this.timeFilterData)
            timeFilterData.forEach(key => {
                this.timeFilterData[key] = []
            })
        },
        // 向外发出通知
        emitFilter(val) {
            this.$emit('update:filterData', cloneDeep(val))
        }

    },
    watch: {
    },
}