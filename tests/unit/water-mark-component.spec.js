import {shallowMount} from '@vue/test-utils'
import WaterMarkComponent from '@components/water-mark-component/src/main'

describe('water-mark-component', () => {
    // 现在挂载组件，你便得到了这个包裹器
    const wrapper = shallowMount(WaterMarkComponent)

    // 常规测试
    // className、name
    it('test component name', () => {
        expect(wrapper.name()).toBe('water-mark-component')
    })

    it('test root class', () => {
        const classes = wrapper.find('div').classes()
        const isTrue = classes.some(e => {
            return /-root$/g.test(e)
        })
        expect(isTrue).toBe(true);
    })

    // 测试msg信息
    it('test msg', () => {
        wrapper.setProps({msg: 'test'})
        expect(wrapper.props().msg).toBe('test')
        expect(wrapper.html()).toContain('<p>test</p>')
    })

    // 测试img信息
    it('test img', () => {
        wrapper.setProps({img: 'img test'})
        expect(wrapper.props().img).toBe('img test')
        expect(wrapper.html()).toContain('<img src="img test">')
    })
})