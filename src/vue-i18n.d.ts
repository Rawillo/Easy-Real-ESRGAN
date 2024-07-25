/**
 * global type definitions
 */

import zh from './plugins/locales/zh-CN.json'
import en from './plugins/locales/en.json'

type MessageSchema = typeof zh | typeof en

declare module 'vue-i18n' {
    // define the locale messages schema
    export interface DefineLocaleMessage extends MessageSchema {}
}