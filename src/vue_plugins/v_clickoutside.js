/**
 * element组件的点击元素本身外触发事件，总体还是给document绑定事件，但是更加完善
 * 单页应用中，directives引入，v-clickoutside自定义指令调用
 * <div v-clickoutside="handleClose">
 * dom: collaboration-list.vue
 * created by rengar 2017/11/28
 */
const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;

const on = (() => {
    if (document.addEventListener) {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.attachEvent(`on${event}`, handler);
            }
        };
    }
})();

on(document, 'mousedown', e => {
    startClick = e
});
on(document, 'mouseup', e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});

export default {
    /**
     * 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
     * @param el 指令绑定的元素
     * @param binding 一个对象，用来存储传入指令的值,expression传入值的字符串形式，value传入的值
     * @param vnode 一个类，存储节点信息，其中context存储VueComponent的信息
     */
    bind(el, binding, vnode) {
        nodeList.push(el);
        const id = seed++;
        // 该事件绑定在document上,这里只是定义，不执行
        const documentHandler = (mouseup = {}, mousedown = {}) => {
            if (!vnode.context || // 没有绑定VueComponents时
                !mouseup.target || // 没有触发mouseup的事件源
                !mousedown.target || // 没有触发mousedown的事件源
                el.contains(mouseup.target) || // 当事件源在el内部时
                el.contains(mousedown.target) || // 当事件源在el内部时
                el === mouseup.target) { // 当mouseup事件源是el时
                return; // 不触发document事件
            }

            if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
                vnode.context[el[ctx].methodName]();
            } else {
                el[ctx].bindingFn();
            }
        };
        el[ctx] = {
            id,
            documentHandler,
            methodName: binding.expression,
            bindingFn: binding.value
        };
    },
    // 所在组件的 VNode 更新时调用(当绑定v-clickoutside元素增加时)，使用nodeList保存el
    update(el, binding) {
        el[ctx].methodName = binding.expression;
        el[ctx].bindingFn = binding.value;
    },
    // 只调用一次，指令与元素解绑时调用。
    unbind(el) {
        const len = nodeList.length;

        for (let i = 0; i < len; i++) {
            if (nodeList[i][ctx].id === el[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }
    }
};
