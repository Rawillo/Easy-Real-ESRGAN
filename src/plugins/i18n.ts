import {createApp, isRef, nextTick} from 'vue'
import type {Composer, I18n, I18nMode, I18nOptions, Locale, VueI18n} from 'vue-i18n'
import {createI18n} from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import en from './locales/en.json'
import {globalSettings} from "./settings.ts";
import pinia from "./pinia";

const app = createApp({})
app.use(pinia);
const settings = globalSettings(pinia);
//获取默认语言
const getDefaultLocale = () => {
    //用户指定了默认语言时，使用用户指定的
    if (settings.locale !== '') {
        return settings.locale;
    } else {
        return 'zh-CN';
    }
}

export const SUPPORT_LOCALES = {
    'zh-CN': '中文',
    en: 'English',
}
const i18n = setupI18n({
    legacy: false,
    locale: getDefaultLocale(),
    globalInjection: true,
    fallbackLocale: 'zh-CN',
    messages: {
        'zh-CN': zhCN,
        'en': en,
    },
})

function isComposer(
    instance: VueI18n | Composer,
    mode: I18nMode
): instance is Composer {
    return mode === 'composition' && isRef(instance.locale)
}

export function getLocale(i18n: I18n): string {
    if (isComposer(i18n.global, i18n.mode)) {
        return i18n.global.locale.value
    } else {
        return i18n.global.locale
    }
}

export function setLocale(i18n: I18n, locale: Locale): void {
    if (isComposer(i18n.global, i18n.mode)) {
        i18n.global.locale.value = locale
    } else {
        i18n.global.locale = locale
    }
}

export function setupI18n(options: I18nOptions = {locale: 'zh-CN'}): I18n {
    const i18n = createI18n(options)
    setI18nLanguage(i18n, options.locale!)
    return i18n
}

export function setI18nLanguage(i18n: I18n, locale: Locale): void {
    setLocale(i18n, locale)
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html')!.setAttribute('lang', locale)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getResourceMessages = (r: any) => r.default || r

export async function loadLocaleMessages(i18n: I18n, locale: Locale) {
    // load locale messages
    const messages = await import(`./locales/${locale}.json`).then(
        getResourceMessages
    )

    // set locale and locale message
    i18n.global.setLocaleMessage(locale, messages)

    return nextTick()
}

export default i18n