import { MyContext } from "@/types";
import { I18n } from "@grammyjs/i18n";

export const i18n = new I18n<MyContext>({
    defaultLocale: "en",
    directory: "locales/"
})