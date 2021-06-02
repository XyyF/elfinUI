/**
 * Created by rengar on 2020/8/6.
 */
import {storiesOf} from '@storybook/vue';
import {withOptions} from '@storybook/addon-options';

storiesOf('导航|Welcome', module)
    .addDecorator(
        withOptions({
            showPanel: false,
        })
    )
    .add('欢迎页', () => ({
        render: h => h('div'),
    }));
