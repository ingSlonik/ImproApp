

import easyDB from "easy-db-react-native";

import { Lang } from "./language";

const { insert, select, update, remove } = easyDB<{
    lang: { lang: Lang },
}>();

export async function loadLang() {
    const lang = await select("lang", "lang");
    if (!lang) return null;
    return lang.lang;
}

export async function saveLang(lang: Lang) {
    await update("lang", "lang", { lang });
}