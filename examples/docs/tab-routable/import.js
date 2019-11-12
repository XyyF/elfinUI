import tabRoutable from 'packages/tab-routable/index.vue'

export default {
    components: {
        tabRoutable
    },
    data() {
        return {
            tabFormat: [{
                route: 'upload',
                label: '跳转到upload',
                closable: true,
                disabled: false,
                lazy: false
            },{
                route: 'form',
                label: '跳转到form',
                closable: false,
                disabled: false,
                lazy: true
            },{
                route: 'previewer',
                label: '跳转到previewer',
                closable: false,
                disabled: false,
                lazy: true
            },
            ],
            tabOptions: {
                props: {
                },
                on: {
                    tabClick(val) {
                        console.log(val)
                    }
                }
            }
        }
    }
}