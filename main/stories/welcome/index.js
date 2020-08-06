/**
 * Created by rengar on 2020/8/6.
 */
import {storiesOf} from '@storybook/vue'
import {withOptions} from '@storybook/addon-options'

storiesOf('Welcome', module)
    .addDecorator(
        withOptions({
            showPanel: false,
        })
    )
    .add('Welcome', () => ({
        render: h => h('div'),
    }))