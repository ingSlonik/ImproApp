
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';

import Icon from '@react-native-vector-icons/material-design-icons';

import { useLang, useDictionary } from '../services/language';

import categoriesCS from "../dictionaries/categoriesCs.json";
import categoriesEN from "../dictionaries/categoriesEn.json"
import { backgroundSecondary } from '../services/colors';
import { loadCategories, toggleCategory } from '../services/db';

export type Category = { name: string, link: string };
type CategoryFavorite = Category & { favorite: boolean };


export default function Categories() {

  const { sections, toggleFavorite } = useFavoriteCategories();

  return <View style={{ flex: 1 }}>
    <SectionList
      stickySectionHeadersEnabled
      sections={sections}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => <Item {...item} onPress={link => Linking.openURL(link)} onFavorite={toggleFavorite} />}
      renderSectionHeader={({ section: { title } }) => (
        <SelectionHeader>{title}</SelectionHeader>
      )}
    />
  </View>;
}

function useFavoriteCategories() {
  const { lang } = useLang();
  const dict = useDictionary();

  const categories = lang === 'cs' ? categoriesCS : categoriesEN;

  const [categoriesFavorite, setCategoriesFavorite] = useState<Category[]>([]);

  const loadFavorites = () => {
    loadCategories().then(setCategoriesFavorite);
  };

  const toggleFavorite = (category: Category) => {
    toggleCategory(category).then(loadFavorites);
  };

  const sections = useMemo(() => {
    const sections: Record<string, CategoryFavorite[]> = {};

    categories.forEach(category => {
      const title = category.name.charAt(0).toUpperCase();
      if (!sections[title]) {
        sections[title] = [];
      }
      const index = categoriesFavorite.findIndex(c => c.name === category.name);
      sections[title].push({ ...category, favorite: index >= 0 });
    });

    return [
      {
        title: dict('source'),
        data: [{ name: dict('sourceUrl'), link: dict('sourceUrl') }],
      },
      ...(categoriesFavorite.length === 0 ? [] : [{
        title: dict('favorite'),
        data: categoriesFavorite.map(category => ({ ...category, favorite: true })).sort((a, b) => a.name.localeCompare(b.name)),
      }]),
      ...sort(
        Object.keys(sections).map(title => ({ title, data: sections[title] })),
      ),
    ];

  }, [categories, categoriesFavorite]);

  return { sections, toggleFavorite };
}

function SelectionHeader({ children }: { children: string }) {
  return <View
    style={{
      paddingVertical: 4,
      paddingHorizontal: 16,
      backgroundColor: backgroundSecondary,
      borderRadius: 4,
    }}>
    <Text style={{ fontWeight: 'bold' }}>{children}</Text>
  </View>;
}

function Item({ name, link, favorite, onPress, onFavorite }: Category & { favorite?: boolean, onPress: (link: string) => void, onFavorite: (category: Category) => void }) {
  return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <TouchableNativeFeedback onPress={() => onPress(link)}>
      <View style={{ padding: 16 }}>
        <Text>{name}</Text>
      </View>
    </TouchableNativeFeedback>
    {typeof favorite === 'boolean' && <TouchableNativeFeedback onPress={() => onFavorite({ name, link })}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <Icon name={favorite ? "star" : "star-outline"} size={22} />
      </View>
    </TouchableNativeFeedback>}
  </View>;
}


const charMap = ' 0123456789AÁBCČDĎEÉĚFGHIÍJKLMNŇOÓPQRŘSŠTŤUÚŮVWXYÝZŽ';
function sort(data: { title: string, data: Category[] }[]) {
  return data.sort((a, b) => {
    const aIndex = charMap.indexOf(a.title);
    const bIndex = charMap.indexOf(b.title);

    return aIndex - bIndex;
  });
}
