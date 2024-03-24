import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import './style.css'

// @ts-ignore
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import {createPinia} from "pinia";
import {i18n} from "./utils/i18n.ts";

const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives
});

createApp(App).use(vuetify).use(pinia).use(i18n).mount('#app')