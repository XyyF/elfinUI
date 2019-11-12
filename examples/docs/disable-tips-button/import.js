import DisableTipsButton from 'packages/disable-tips-button/src/main'

export default {
    components: {DisableTipsButton},
    data() {
        return {
            tooltip: {
                content: '禁用原因',
                placement: 'top',
            }
        }
    }
}