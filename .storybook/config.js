import {addParameters, configure} from '@storybook/vue'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import './plugins/element'
import './plugins/inject-components'

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