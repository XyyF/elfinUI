// 展示示例代码 在webpack.config.js控制
import '@storybook/addon-storysource/register';
// 示例 页面适配 在src/stories/index控制
import '@storybook/addon-viewport/register';
// 示例 props调试 storybook自定义化,在.storybook/config.js控制
import '@storybook/addon-options/register';
// 示例 props调试 参考src/stories/examples/knobs.js
import '@storybook/addon-knobs/register';
// 示例 事件调试 参考src/stories/examples/action-logger.js
import '@storybook/addon-actions/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-notes/register-panel';
