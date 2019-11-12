import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import ElementUI from 'meetin-sass-ui'
import UploadFile from './upload-file'

const localVue = createLocalVue()
localVue.use(ElementUI)

beforeEach(() => {
    jest.resetModules()
})

describe('UploadFile', () => {
    // 校验 showFileList 默认值
    it('default props.showFileList is false', () => {
        const wrapper = mount(UploadFile, {
            localVue,
        })
        expect(wrapper.find('[name="el-list"]').exists()).toBe(false)
    })

    // showFileList 赋值被正确的转递给了组件
    it('props.showFileList well done', () => {
        // showFileList: true
        const wrapper = mount(UploadFile, {
            localVue,
            propsData: {
                showFileList: true,
            },
        })
        expect(wrapper.find('[name="el-list"]').exists()).toBe(true)

        // showFileList: false
        const wrapper2 = mount(UploadFile, {
            localVue,
            propsData: {
                showFileList: false,
            },
        })
        expect(wrapper2.find('[name="el-list"]').exists()).toBe(false)
    })

    // 校验 fileList 默认值
    it('default props.fileList is []', () => {
        const wrapper = shallowMount(UploadFile, {
            localVue,
        })
        expect(wrapper.vm.$refs.uploader.fileList).toEqual([])
    })

    // fileList 赋值被正确的传递给了组件
    it('props.fileList well done', () => {
        const fileList = [1, 2, 3]
        const wrapper = shallowMount(UploadFile, {
            localVue,
            propsData: {
                fileList,
            },
        })
        expect(wrapper.vm.$refs.uploader.fileList === fileList).toBe(true)
    })

    // sizeLimit 默认值
    it('default props.sizeLimit is 2G', () => {
        const wrapper = shallowMount(UploadFile, {
            localVue,
        })
        expect(wrapper.vm.uploadManager.customConfig.sizeLimit).toEqual(1024 * 1024 * 1024 * 2)
    })

    // sizeLimit 赋值被正确的使用
    it('props.sizeLimit well done', () => {
        jest.disableAutomock()
        const sizeLimit = 300
        const wrapper = shallowMount(UploadFile, {
            localVue,
            propsData: {
                sizeLimit,
            },
        })
        expect(wrapper.vm.uploadManager.customConfig.sizeLimit).toEqual(sizeLimit)
    })

    // 调用 handleUpload 方法，成功的场景
    it('call handleUpload well done', async () => {
        jest.mock('@utils/qiniu-uploader')
        require('@utils/qiniu-uploader')
        const UploadFile = require('./upload-file').default

        const wrapper = shallowMount(UploadFile, {
            localVue,
        })

        function uploadTester() {
            return new Promise((resolve, reject) => {
                const mockData = {
                    file: true,
                    onSuccess: resolve,
                    onError: reject,
                }
                wrapper.vm.handleUpload(mockData)
            })
        }

        const url = await uploadTester()
        expect(url).toEqual('http://image.xiaojing0.com/mock/picture.png')
    })

    // 调用 handleUpload 方法，失败的场景
    it('call handleUpload failure', async () => {
        jest.mock('../../../utils/qiniu-uploader')
        require('../../../utils/qiniu-uploader')
        const UploadFile = require('./upload-file').default

        const showErrorMessage = jest.fn()
        const wrapper = shallowMount(UploadFile, {
            localVue,
            methods: {
                showErrorMessage,
            },
        })

        function uploadTester() {
            return new Promise((resolve, reject) => {
                const mockData = {
                    onError: reject,
                }
                wrapper.vm.handleUpload(mockData)
            })
        }

        const errMessage = await uploadTester().catch(e => e.message)
        expect(errMessage).toEqual('uploadImage mock fail')
        expect(showErrorMessage).toHaveBeenCalled()
        expect(wrapper.vm.isUploading).toBe(false)
    })

    // refGetUploader 方法
    it('refGetUploader well done', () => {
        const wrapper = shallowMount(UploadFile, {
            localVue,
        })
        expect(wrapper.vm.refGetUploader()).toEqual(wrapper.vm.$refs.uploader)
    })
})
