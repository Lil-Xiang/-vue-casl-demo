import { createApp } from 'vue'
import router from './router/index'
import './assets/main.css'

import { abilitiesPlugin } from '@casl/vue';
import { ability } from './services/ability';

import App from './App.vue'

const app = createApp(App)

app
 .use(router)
 .use(abilitiesPlugin, ability)

app.mount('#app')
