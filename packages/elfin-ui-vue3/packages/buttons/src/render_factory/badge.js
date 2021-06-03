import { h } from 'vue';
import Render from './_render';

export default class BadgeRender extends Render {
    render() {
        const { itemOptions = {}, itemSlots = {} } = this.config;

        return h(<el-badge />, itemOptions, itemSlots);
    }
}
