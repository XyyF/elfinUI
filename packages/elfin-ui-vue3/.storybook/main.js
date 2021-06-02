module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  babel: async (options) => ({
    ...options,
    plugins: [
      ...(options.plugins || []),
      "@vue/babel-plugin-jsx",
    ],
    // any extra options you want to set
  }),
}