/**
 * Created by arvin on 2019/3/21.
 */
import Render from './render'
import TextareaPlus from '../../textarea-plus/index'

export default class TextareaRender extends Render {
    render() {
        return this.h(TextareaPlus, this.options)
    }
}