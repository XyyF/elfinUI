import Render from './render'

export default class ComponentRender extends Render {
    render() {
        if (!this.component) return null

        return this.h(this.component, this.options)
    }
}