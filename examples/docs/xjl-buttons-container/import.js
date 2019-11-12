import xjlButtonsContainer from 'packages/xjl-buttons-container/index.vue'

export default {
    components: {
        xjlButtonsContainer
    },
    data() {
        return {
            searchable: true,
            searchOptions: [{
                value: 'one',
                label: '一'
            },{
                value: 'two',
                label: '二'
            },{
                value: 'three',
                label: '三'
            }],
            searchTypeProp: '默认搜索值'
        }
    }
}