import { ElfinButtons } from '../../../packages/buttons';

import Primary_ from './primary';
import Button_ from './button';
import Checkbox_ from './checkbox';
import Badge_ from './badge';

export default {
  title: 'ElfinUI/ElfinButtons',
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
export const Checkbox = Checkbox_;
export const Badge = Badge_;
