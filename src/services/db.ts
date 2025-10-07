

import easyDB from "easy-db-react-native";

import { Lang } from "./language";
import { Category } from "../pages/Categories";

const { insert, select, selectArray, update, remove } = easyDB<{
    lang: { lang: Lang },
    category: Category,
}>();

export async function loadLang() {
    const lang = await select("lang", "lang");
    if (!lang) return null;
    return lang.lang;
}

export async function saveLang(lang: Lang) {
    await update("lang", "lang", { lang });
}

export async function loadCategories() {
    return await selectArray("category");
};

export async function toggleCategory(category: Category) {
    const categories = await loadCategories();
    const index = categories.findIndex(c => c.name === category.name);

    if (index < 0) {
        await insert("category", category);
    } else {
        await remove("category", categories[index]._id);

    }
};
