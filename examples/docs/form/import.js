import XjlForm from 'packages/form/index'
import formItemType from 'packages/form/item-type'

export default {
    data() {
        return {
            formData: {
                input: null,
                textarea: null,
                selection: '',
                date: null,
                radio: null,
                switch: null,
                number: null,
                uploadImage: null
            },
            formOptions: {
                props: {
                    labelPosition: 'left',
                    labelWidth: '100px'
                }
            }
        }
    },
    components: {
        XjlForm,
    },
    computed: {
        formFormat() {
            return [{
                prop: 'input',
                label: 'input',
                type: formItemType.INPUT
            }, {
                prop: 'textarea',
                label: 'textarea',
                type: formItemType.TEXTAREA
            }, {
                prop: 'selection',
                label: 'selection',
                type: formItemType.SELECTION,
                compOptions: {
                    options: [{
                        value: 1,
                        label: '选项1'
                    }, {
                        value: 2,
                        label: '选项2'
                    }],
                }
            }, {
                prop: 'date',
                label: 'date',
                type: formItemType.DATE
            }, {
                prop: 'radio',
                label: 'radio',
                type: formItemType.RADIO,
                compOptions: {
                    options: [
                        {value: true, label: '是'},
                        {value: false, label: '否'},
                    ]
                }
            }, {
                prop: 'switch',
                label: 'switch',
                type: formItemType.SWITCH
            }, {
                prop: 'number',
                label: 'number',
                type: formItemType.NUMBER
            }, {
                prop: 'uploadImage',
                label: 'uploadImage',
                type: formItemType.UPLOAD_IMAGE
            }]
        },
    }
}