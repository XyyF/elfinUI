function getTargetNode(el, binding) {
    let targetNode = null
    if (binding.value) {
        targetNode = el.querySelector(binding.value)
    }
    else {
        targetNode = el
    }
    return targetNode
}


export default {
    update(el, binding) {
        const targetNode = getTargetNode(el, binding)
        targetNode.style.overflow = 'hidden'
        targetNode.style.transition = 'height 0.6s'
    },
    componentUpdated(el, binding) {
        const targetNode = getTargetNode(el, binding)
        targetNode.style.height = el.oldHeight ? `${el.oldHeight}px` : '0'
        setTimeout(() => {
            const newHeight = targetNode.scrollHeight
            targetNode.style.height = `${newHeight}px`
            el.oldHeight = newHeight
        }, 100)
        setTimeout(() => {
            targetNode.style.height = 'auto'
        }, 1000)
    },
}
