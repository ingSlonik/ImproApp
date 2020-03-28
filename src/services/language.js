// @flow

import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  type Node,
} from 'react';
import {findBestAvailableLanguage} from 'react-native-localize';

type Lang = 'cs' | 'en';

type LangContextProps = {
  lang: Lang,
  langList: Lang[],
  setLang: Lang => void,
};

const langList = ['cs', 'en'];

const LangContext = createContext<LangContextProps>({
  lang: 'en',
  langList,
  setLang: () => {},
});

export function LangProvider({children}: {children: Node}) {
  const [lang, setLang] = useState(getDefaultLang());
  return (
    <LangContext.Provider
      value={{
        lang,
        langList,
        setLang,
      }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextProps {
  return useContext(LangContext);
}

export function useDictionary(): string => string {
  const {lang} = useLang();
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
  const preferredLang = findBestAvailableLanguage(['en', 'cz']);
  if (langList.includes(preferredLang.languageTag)) {
    return preferredLang.languageTag;
  } else {
    return 'en';
  }
}

const dictionary: {[word: string]: {[lang: Lang]: string}} = {
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
    cs: 'Seznam kategorií',
    en: 'List of categories',
  },
  aboutApp: {
    cs: 'O Impro App',
    en: 'About Impro App',
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
    en: 'Half time',
  },
  setTime: {
    cs: 'Nastavit čas',
    en: 'Set time',
  },
  start: {
    cs: 'Start',
    en: 'Start',
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
};
