import transitionAutoHeight from 'packages/transition-auto-height/src/main.vue'

export default {
    components: {
        transitionAutoHeight
    },
    data() {
        return {
            changeText: '当我高度改变时,会根据传入的参数使用动画改变高度哦',
            size: 50,
            itemCount: 40,
            singleDuration: 10
        }
    },
    methods: {
        handleChangeHeight() {
            this.size += this.size
        }
    }
}