import TooltipTag from 'packages/tooltip-tag/index'

export default {
    components: {TooltipTag},
    data() {
        return {
            defaultConfig: {
                tag: {
                    label: 'tag',
                },
                tooltip: {
                    content: '这个是tooltip内容'
                }
            },
            onlyTagConfig: {
                tag: {
                    label: 'tag',
                },
                tooltip: {
                    disabled: true
                }
            }
        }
    }
}