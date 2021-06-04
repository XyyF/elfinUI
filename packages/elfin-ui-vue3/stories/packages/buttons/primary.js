import { h } from 'vue';
import { ElfinButtons, ElfinButtonsItemType } from '../../../packages/buttons';

const Primary = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ElfinButtons },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<elfin-buttons v-bind="args" />',
});
Primary.args = {
  buttonsConfig: [
    {
      type: ElfinButtonsItemType.BUTTON,
      itemOptions: {
        type: 'primary',
        icon: 'el-icon-plus',
      },
      itemSlots() {
        return '基础按钮';
      },
    },
    {
      type: ElfinButtonsItemType.CHECKBOX,
      itemOptions: {
        modelValue: null,
      },
      itemSlots() {
        return '单选框';
      },
    },
    {
      type: ElfinButtonsItemType.BADGE,
      itemOptions: {
        value: 12,
      },
      itemSlots() {
        return [
          h(<el-button />, 'badge按钮'),
        ];
      },
    },
  ],
};

export default Primary;
