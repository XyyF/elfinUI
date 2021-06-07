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
    },
    openPreviewer2() {
      this.$previewImages([assets1, assets2], 0);
    },
    openPreviewer3() {
      this.$previewImages([assets1], 0);
    },
  },
  setup() {
    return { args };
  },
  template: `
    <div>
      <el-button @click="openPreviewer">点击打开Previewer</el-button>
      <el-button @click="openPreviewer2">点击打开Previewer2</el-button>
      <el-button @click="openPreviewer3">点击打开Previewer3</el-button>
    </div>
  `,
});
Primary.args = {};
