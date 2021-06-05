import { action } from '@storybook/addon-actions';
import { ElfinButtons, ElfinButtonsItemType } from '../../../packages/buttons';

const OnClick = action('click');
const OnChange = action('change');

const Checkbox = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ElfinButtons },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const { buttonsConfig, ...params } = args;
    const config = [
      Object.assign({}, buttonsConfig[0], {
        itemOptions: {
          ...params,
          onChange: OnChange,
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
Checkbox.argTypes = {
  modelValue: {
    control: {
      type: 'boolean',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  trueLabel: {
    control: {
      type: 'text',
    },
  },
  falseLabel: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  checked: {
    control: {
      type: 'boolean',
    },
  },
  border: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['medium', 'small', 'mini'],
    control: {
      type: 'select',
    },
  },
};
Checkbox.args = {
  modelValue: null,
  label: '选项',
  checked: true,
  falseLabel: '0',
  trueLabel: '1',
  border: false,
  size: '',
  buttonsConfig: [
    {
      type: ElfinButtonsItemType.CHECKBOX,
      label: 'Checkbox前缀说明:',
      itemOptions: {
        modelValue: null,
        label: '选项',
        checked: true,
        falseLabel: '0',
        trueLabel: '1',
        border: false,
        size: '',
      },
    }
  ],
};

export default Checkbox;
