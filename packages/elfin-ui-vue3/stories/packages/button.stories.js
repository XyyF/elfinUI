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
        type: 'primary',
        icon: 'el-icon-plus',
        slot: () => {
          return '基础按钮';
        },
      },
    },
    {
      type: ElfinButtonsItemType.CHECKBOX,
      itemOptions: {
        renderSlot() {
          return '单选框';
        },
      },
    },
    {
      type: ElfinButtonsItemType.BADGE,
      itemOptions: {
        props: {
          value: 12,
        },
        renderSlot(h) {
          return [
            h(<el-button/>, 'badge按钮'),
          ];
        },
      },
    },
  ],
};
