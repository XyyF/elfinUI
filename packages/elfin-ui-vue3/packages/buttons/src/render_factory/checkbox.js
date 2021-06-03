import { h } from 'vue';
import Render from './_render';

export default class CheckBoxRender extends Render {
    render() {
        const { itemOptions = {} } = this.config;
        // 获取 defaultSlot
        const defaultSlot = this.getRenderSlot();

        return h(<el-checkbox />, { ...itemOptions }, defaultSlot(h));
    }
}
