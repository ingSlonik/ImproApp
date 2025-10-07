// @flow

import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  type ReactNode,
  useEffect,
} from 'react';

import { getLocales } from "react-native-localize";
import { loadLang, saveLang } from './db';

export type Lang = 'cs' | 'en';

type LangContextProps = {
  lang: Lang,
  langList: Lang[],
  setLang: (lang: Lang) => void,
};

const langList: Lang[] = ['cs', 'en'];

const LangContext = createContext<LangContextProps>({
  lang: 'en',
  langList,
  setLang: () => { },
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState(getDefaultLang());

  useEffect(() => {
    loadLang().then(lang => {
      if (lang)
        setLang(lang);
    });

    setLang(getDefaultLang());
  }, []);

  const setLangMemo = useMemo(() => (lang: Lang) => {
    saveLang(lang);
    setLang(lang);
  }, []);

  return (
    <LangContext.Provider
      value={{
        lang,
        langList,
        setLang: setLangMemo,
      }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextProps {
  return useContext(LangContext);
}

export function useDictionary(): (word: string) => string {
  const { lang } = useLang();
  return useMemo(
    () => (word: string) => {
      if (word in dictionary) {
        return dictionary[word][lang];
      } else {
        console.error(`Word "${word}" is not in dictionary.`);
        return word;
      }
    },
    [lang],
  );
}

function getDefaultLang(): Lang {
  const deviceLanguage = getLocales()[0]?.languageCode || "en";

  if (
    deviceLanguage.toLocaleLowerCase().includes('cs') ||
    deviceLanguage.toLocaleLowerCase().includes('cz')
  ) {
    return 'cs';
  } else {
    return 'en';
  }
}

const dictionary: { [word: string]: Record<Lang, string> } = {
  cs: {
    cs: 'CZ',
    en: 'CZ',
  },
  en: {
    cs: 'EN',
    en: 'EN',
  },
  wordGenerator: {
    cs: 'Generátor slov',
    en: 'Word generator',
  },
  improvTimer: {
    cs: 'Impro stopky',
    en: 'Impro timer',
  },
  categoriesList: {
    cs: 'Kategorie',
    en: 'Categories',
  },
  aboutApp: {
    cs: 'O Impro App',
    en: 'About Impro App',
  },
  ok: {
    cs: 'Rozumím',
    en: 'O.K.',
  },
  all: {
    cs: 'Vše',
    en: 'All',
  },
  theme: {
    cs: 'Téma',
    en: 'Theme',
  },
  adjective: {
    cs: 'Přídavné jméno',
    en: 'Adjective',
  },
  noun: {
    cs: 'Podstatné jméno',
    en: 'Noun',
  },
  place: {
    cs: 'Prostředí',
    en: 'Place',
  },
  generatePlace: {
    cs: 'Generovat prostředí',
    en: 'Generate place',
  },
  genre: {
    cs: 'Žánr',
    en: 'Genre',
  },
  generateGenre: {
    cs: 'Generovat žánr',
    en: 'Generate genre',
  },
  halfTime: {
    cs: 'Nastav polovinu',
    en: 'Set half time',
  },
  setTime: {
    cs: 'Nastavit čas',
    en: 'Set time',
  },
  start: {
    cs: 'Start',
    en: 'Start',
  },
  source: {
    cs: 'Zdroj',
    en: 'Source',
  },
  favorite: {
    cs: 'Oblíbené',
    en: 'Favorite',
  },
  sourceUrl: {
    cs: 'https://wiki.improliga.cz',
    en: 'http://improvencyclopedia.org',
  },
  urlCategories: {
    cs: 'https://wiki.improliga.cz/wiki/Kategorie:Seznam_kategori%C3%AD',
    en: 'http://improvencyclopedia.org/games/index.html',
  },
  selectorCategories: {
    cs: '#mw-pages .mw-category-group li a',
    en: '.container .details ul li a',
  },
  linkCategories: {
    cs: 'https://wiki.improliga.cz',
    en: '',
  },
  filterCategories: {
    cs: '',
    en: 'http://improvencyclopedia.org/games/',
  },

  infoGenerator: {
    cs:
      'Přátelé, sbírka slov není velká a už vůbec né ucelená. Když mi ji pomůžete dát dohromady, budu Vám velice vděčen.',
    en:
      'Friends, the word collection is not big and not complete at all. If you help me put it together, I will be very grateful.',
  },

  about1: {
    cs:
      'Tato aplikace je na světě díky nejstaršímu nepřejmenovanému nerozpadlému improvizačnímu týmu nejvyšší české improvizační soutěže',
    en:
      'This app is in the world thanks to the oldest unrenamed unbroken up improvisation team of the highest Czech improvisation competition',
  },
  about2: {
    cs:
      'Nejdříve moc děkuji improlize, díky které zde máme seznam kategorií prostřednictvím Impro Wiki.',
    en:
      'As first, thank you very much for improvencyclopedia.org, thanks to which we have a list of categories.',
  },
  about3: {
    cs:
      'Dále bych chtěl poukázat na to, jak jsem cool. Tato applikace je zdarma a zcela bez reklam. Pokud by jste chtěli přispět na vývoj, dát zpětnou vazbu nebo něco doprogramovat, použíjte odkaz níže.',
    en:
      'Next, I would like to point out how cool I am. This application is free and completely free of ads. If you would like to donate to development, give Aala a cute piglet, feedback or program something. Use the link below.',
  },
};
