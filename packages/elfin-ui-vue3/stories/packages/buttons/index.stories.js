import { ElfinButtons } from '../../../packages/buttons';

import Primary_ from './primary';
import Button_ from './button';

export default {
  title: 'Example/ElfinButtons',
  component: ElfinButtons,
  argTypes: {
    buttonsConfig: {
      default: [],
      description: '按钮组配置项',
      control: {
        type: 'array',
      },
    },
  },
};

export const Primary = Primary_;
export const Button = Button_;
