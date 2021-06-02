import { ElfinButtons, ElfinButtonsItemType } from '../../packages/buttons';

export default {
  title: 'Example/ElfinButtons',
  component: ElfinButtons,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    onClick: {},
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ElfinButtons },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<elfin-buttons v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  buttonsConfig: [
    {
      type: ElfinButtonsItemType.BUTTON,
      itemOptions: {
        props: { type: 'primary', icon: 'el-icon-plus' },
        renderSlot() {
          return '基础按钮';
        },
      },
    },
  ],
};
