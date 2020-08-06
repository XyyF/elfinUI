import Vue from 'vue'
import {addParameters, configure} from '@storybook/vue'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import './plugins/element'
// import '../main/styles/basic.scss'
// import GenericContainer from '../main/components/generic-container'

// Vue.component('generic-container', GenericContainer)

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
    options: {
        showPanel: true,
        panelPosition: 'bottom',
        // hierarchyRootSeparator: /\|/,
        selectedAddonPanel: 'storybook/stories/stories-panel',
        theme: {
            brandTitle: 'elfin-ui',
        },
    },
})

// 加载story
function loadStories() {
    require('../main/stories')
}

configure(loadStories, module)