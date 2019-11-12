import Render from './_render'

export default class ComponentRender extends Render {
    render() {
        const {component, ...options} = this.config
        if (!component) return null

        return this.h(component, options)
    }
}