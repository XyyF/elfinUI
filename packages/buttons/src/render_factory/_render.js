import {noop} from '../__utils'

/**
 * Created by rengar on 2018/4/16.
 */

export default class Render {
    constructor(h, config) {
        /**
         *  You may have an infinite update loop in a component render function
         *  render 的时候，会修改 config ，就会包警告
         */
        this.config = Object.assign({}, config)
        this.h = h
    }

    // console.log('need override')
    render() {}

    getRenderSlot() {
        const {itemOptions = {}} = this.config

        return itemOptions.renderSlot || noop
    }
}