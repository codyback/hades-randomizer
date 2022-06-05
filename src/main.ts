import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { Quasar } from 'quasar';

import 'quasar/src/css/index.sass';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia).use(router).use(Quasar);

app.mount('#app');
