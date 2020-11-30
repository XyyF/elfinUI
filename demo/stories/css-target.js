/**
 * Created by rengar on 2020/8/6.
 */
import { storiesOf } from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';
import CssTarget from './css-target.vue';

storiesOf('Demo|css', module)
  .addDecorator(
    withOptions({
      showPanel: false,
    })
  )
  .add(':target', () => ({
    components: {CssTarget},
    template: `
      <div>
        <generic-container title="CSS:target">
          <p slot="subDocs">
            :target伪类 代表当元素id与hash值相匹配时触发<br/>
            侧边栏功能 结合hash + css:target属性，实现左侧点击侧边栏，右侧对应的锚点内容抖动提示效果<br/>
          </p>
        </generic-container>
        <generic-container>
          <css-target></css-target>
        </generic-container>
      </div>
    `,
  }));
