import { h } from 'vue';
import { ElfinButtons, ElfinButtonsItemType } from '../../../packages/buttons';

const Badge = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ElfinButtons },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const { buttonsConfig, ...params } = args;
    const config = [
      Object.assign({}, buttonsConfig[0], {
        itemOptions: {
          ...params,
        },
      }),
    ]
    return () => {
      return (
        <elfin-buttons buttonsConfig={config}></elfin-buttons>
      );
    };
  },
});
Badge.argTypes = {
  value: {
    control: {
      type: 'text',
    },
  },
  max: {
    control: {
      type: 'number',
    },
  },
  isDot: {
    control: {
      type: 'boolean',
    },
  },
  hidden: {
    control: {
      type: 'boolean',
    },
  },
  type: {
    options: ['primary', 'success', 'warning', 'danger', 'info'],
    control: {
      type: 'select',
    },
  },
};
Badge.args = {
  value: 12,
  max: 10,
  isDot: false,
  hidden: false,
  type: '',
  buttonsConfig: [
    {
      type: ElfinButtonsItemType.BADGE,
      label: 'Badge前缀说明:',
      itemOptions: {
        value: 12,
        max: 20,
        isDot: false,
        hidden: false,
        type: '',
      },
      itemSlots() {
        return [
          h(<el-button />, 'badge按钮'),
        ];
      },
    }
  ],
};

export default Badge;
