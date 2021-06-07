import { app } from '@storybook/vue3';
import assets1 from './assets/assets1.jpg';
import assets2 from './assets/assets2.jpg';
import assets3 from './assets/assets3.jpg';
import { ElfinPreviewer } from '../../../packages/previewer';

app.use(ElfinPreviewer);

export default {
  title: 'ElfinUI/Previewer',
  argTypes: {},
};

export const Primary = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  // The story's `args` need to be mapped into the template through the `setup()` method
  methods: {
    openPreviewer() {
      this.$previewImages([assets1, assets2, assets3], 1);
    }
  },
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<div @click="openPreviewer">123</div>',
});
Primary.args = {};
