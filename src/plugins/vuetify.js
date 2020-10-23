import Vue from "vue";
import Vuetify, { colors } from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        background: colors.grey.darken4,
      },
    },
    dark: true,
  },
});
