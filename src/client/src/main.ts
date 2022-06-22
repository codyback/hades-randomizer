/* eslint-disable import/extensions */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router';

import 'quasar/src/css/index.sass';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia).use(router).use(Quasar);

app.mount('#app');
