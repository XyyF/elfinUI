import textareaPlus from 'packages/textarea-plus/index.vue'

export default {
    components: {
        textareaPlus
    },
    data() {
        return {
            value: '这是一段长长长长的文字',
            maxlength: 500
        }
    },
    methods: {
        handleTextChange(e) {
            this.value = e
        }
    }
}