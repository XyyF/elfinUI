import { h } from 'vue';
import Render from './_render';

export default class ButtonRender extends Render {
    render() {
        const { itemOptions = {}, itemSlots = {} } = this.config;

        return h(<el-button />, itemOptions, itemSlots);
    }
}
