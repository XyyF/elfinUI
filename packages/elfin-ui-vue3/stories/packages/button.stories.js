import { h } from 'vue';
import { action } from '@storybook/addon-actions';
import { ElfinButtons, ElfinButtonsItemType } from '../../packages/buttons';

export default {
  title: 'Example/ElfinButtons',
  component: ElfinButtons,
  argTypes: {
    buttonsConfig: {
      default: [],
      description: '123',
      control: {
        type: 'array',
      },
    },
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

export const Button = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ElfinButtons },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const buttonsConfig = [
      {
        type: ElfinButtonsItemType.BUTTON,
        label: '按钮前缀说明:',
        itemOptions: {
          ...args,
          onClick: ButtonOnClick,
        },
        itemSlots() {
          return '按钮';
        },
      }
    ];
    return () => {
      return (
        <elfin-buttons buttonsConfig={buttonsConfig}></elfin-buttons>
      );
    };
  },
});
const ButtonOnClick = action('click');
Button.argTypes = {
  size: {
    defaultValue: '',
    description: '123',
    options: ['medium', 'small', 'mini'],
    control: {
      type: 'select',
    },
  },
  type: {
    options: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
    control: {
      type: 'select',
    },
  },
  plain: {
    options: [true, false],
    control: {
      type: 'select',
    },
  },
  round: {
    options: [true, false],
    control: {
      type: 'select',
    },
  },
  circle: {
    options: [true, false],
    control: {
      type: 'select',
    },
  },
  loading: {
    options: [true, false],
    control: {
      type: 'select',
    },
  },
  disabled: {
    options: [true, false],
    control: {
      type: 'select',
    },
  },
  icon: {
    control: {
      type: 'input',
    },
  },
  autofocus: {
    options: [true, false],
    control: {
      type: 'select',
    },
  },
};
Button.args = {
  size: '',
  type: 'primary',
  plain: false,
  round: false,
  circle: false,
  loading: false,
  disabled: false,
  icon: 'el-icon-plus',
  autofocus: false,
};
