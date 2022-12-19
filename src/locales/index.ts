import * as zhHans from "./zh-Hans.json";
import * as en from "./en.json";
import { createI18n } from "vue-i18n";
import { getCookie } from "tiny-cookie";
import { LANGUAGE_KEY } from "@/config";

export function getLang() {
  const currentLang = getCookie(LANGUAGE_KEY);
  if (currentLang) return currentLang;
  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return "zh-cn";
}

export const messages = {
  "zh-cn": Object.assign(zhHans).default,
  en: Object.assign(en).default,
};
export const i18n = createI18n({
  locale: getLang() || import.meta.env.VITE_APP_I18N_LOCALE,
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  globalInjection: true,
  legacy: false,
});
