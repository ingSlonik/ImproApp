import { resolve } from "path";
import { fetch, Agent } from 'undici';
import { parse } from 'fast-html-parser';
import { writeFile } from "fs/promises";

const webs = {
    cs: 'https://wiki.improliga.cz/wiki/Kategorie:Seznam_kategori%C3%AD',
    en: 'https://improvencyclopedia.org/games/index.html',
};

const baseUrls = {
    cs: 'https://wiki.improliga.cz',
    en: '',
};

const selectorCategories = {
    cs: '#mw-pages .mw-category-group li a',
    en: '.container .details ul li a',
};

const dictionariesPath = resolve(import.meta.dirname, "..", "src", "dictionaries");

// Client portal has old TLS certificate
const unsafeAgent = new Agent({
    connect: {
        rejectUnauthorized: false
    }
});

async function main() {
    for (const lang of ["cs", "en"] as const) {
        const res = await fetch(webs[lang], { dispatcher: unsafeAgent });
        const html = await res.text();

        const root = parse(html);
        const links = root.querySelectorAll(selectorCategories[lang]);

        const categories = links
            .map(l => ({ name: l.rawText, link: `${baseUrls[lang]}${l.attributes.href}` }))
            .filter(l => l.name && l.link.includes("/"));

        console.log(`For ${lang} found ${categories.length} categories`);

        await writeFile(resolve(dictionariesPath, `categories${lang.charAt(0).toUpperCase() + lang.slice(1)}.json`), JSON.stringify(categories, null, 2), "utf-8");
    }
}

main();