import {createApp} from 'vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {globalSettings} from "./settings.ts";
import pinia from "./pinia";

const app = createApp({})
app.use(pinia);
const settings = globalSettings(pinia);
const lightTheme = {
    dark: false,
    colors: {
        primary: settings.color.light.primary,
        secondary: settings.color.light.secondary,
        background: settings.color.light.background,
    }
};
const darkTheme = {
    dark: false,
    colors: {
        primary: settings.color.dark.primary,
        secondary: settings.color.dark.secondary,
        background: settings.color.dark.background,
    }
};

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        variations: {
            colors: ['primary', 'secondary', 'background'],
            lighten: 5,
            darken: 5,
        },
        themes: {
            light: lightTheme,
            dark: darkTheme
        }
    },
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
})
export default vuetify;