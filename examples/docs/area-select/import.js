import areaSelect from 'packages/area-select/index.vue'

export default {
    components: {
        areaSelect
    },
    data() {
        return {
            value: '110101',
            isShowAll: false,
            level: 3,
            addressDetailProp: '',

            value1: '110101',
            isShowAll1: false,
            level1: 4,
            addressDetailProp1: '重庆市荣昌县昌元镇新公安局',

            value2: '',
            isShowAll2: true,
            level2: 4,
            addressDetailProp2: ''
        }
    }
}