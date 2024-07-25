import {createApp} from "vue";
import App from "./App.vue";
import i18n from "./plugins/i18n.ts";
// Vuetify
import vuetify from "./plugins/vuetify";

// pinia
import pinia from './plugins/pinia';


const app = createApp(App)
app.use(pinia);
app.use(i18n)
app.use(vuetify)

app.mount("#app");