import { h } from 'vue';
import Render from './_render';

export default class CheckBoxRender extends Render {
    render() {
        const { itemOptions = {}, itemSlots = {} } = this.config;

        return h(<el-checkbox />, itemOptions, itemSlots);
    }
}
