import {shallowMount} from '@vue/test-utils'
import WaterMarkComponent from 'components/water-mark-component/src/main'

const lifeCycleOrder = ['name', 'directives', 'components', 'mixins', 'data', 'props', 'computed', 'filters', 'methods', 'watch', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'beforeDestroy', 'destroyed', 'errorCaptured']

describe('water-mark-component', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = shallowMount(WaterMarkComponent)

    // 测试msg信息
    it('test component name', () => {
        // eslint-disable-next-line no-unused-vars
        const lifeCycles = Object.keys(WaterMarkComponent)
            .map(e => ({
                label: e,
                value: lifeCycleOrder.indexOf(e)
            }))
            .filter(e => e.value >= 0)

    })
})