import { app } from '@storybook/vue3';
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
      // console.log(123, this.$previewImages)
      this.$previewImages([], 0);
    }
  },
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<div @click="openPreviewer">123</div>',
});
Primary.args = {};
