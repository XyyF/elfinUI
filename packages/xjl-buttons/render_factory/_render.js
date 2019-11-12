/**
 * Created by gukong on 2018/4/16.
 */
import {cloneDeep} from 'lodash'

export default class Render {
    static DefaultClassName = 'xjl-button-item'

    constructor(h, config, delegate = null) {
        /**
         *  You may have an infinite update loop in a component render function
         *  render 的时候，会修改 config ，就会包警告
         */
        this.config = cloneDeep(config)
        this.h = h
        if (delegate) {
            this.delegate = delegate
        }
    }

    render() {
        console.log('need override')
    }

    appendClass(options, className) {
        if (!options.class) {
            options.class = className
        }
        else if (typeof options.class === 'string') {
            options.class = `${options.class} ${className}`
        }
        else if (typeof options.class === 'object') {
            options.class[className] = true
        }
        else {
            throw new Error('class should string or object')
        }
    }
}