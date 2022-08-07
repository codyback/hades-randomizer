import { defineComponent, h, normalizeProps } from 'vue';
import { mount } from '@vue/test-utils';
import { QLayout } from 'quasar';

const buildWithLayout = (original) => defineComponent({
  inheritAttrs: false,
  setup(_props, ctx) {
    return () => h(QLayout, null, () => [h(original, normalizeProps(ctx.attrs))]);
  },
});

// eslint-disable-next-line max-len
export const mountQuasar: typeof mount = (original, ...options) => mount(buildWithLayout(original), ...options);
