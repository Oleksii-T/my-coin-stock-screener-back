// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always', // fix for prettier
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'no-console': ['warn', {}],
  },
});
