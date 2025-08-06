
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  BackHandler,
  SectionList,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';

import { useLang, useDictionary } from '../services/language';

import categoriesCS from "../dictionaries/categoriesCs.json";
import categoriesEN from "../dictionaries/categoriesEn.json"
import { backgroundPrimary, backgroundSecondary } from '../services/colors';

type Category = { name: string, link: string };

export default function Categories() {
  const { lang } = useLang();
  const dict = useDictionary();

  const categories = lang === 'cs' ? categoriesCS : categoriesEN;

  return (
    <View style={{ flexGrow: 1, justifyContent: 'center' }}>

      <SectionList
        // With height 50% fixed issues https://stackoverflow.com/questions/49570059/scroll-area-too-small-with-sectionlist-react-native
        style={{ flexGrow: 1, height: '50%', position: 'relative', zIndex: 1 }}
        stickySectionHeadersEnabled
        sections={getSections(categories, dict)}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <Item {...item} onPress={link => Linking.openURL(link)} />}
        renderSectionHeader={({ section: { title } }) => (
          <SelectionHeader>{title}</SelectionHeader>
        )}
      />

    </View>
  );
}

function SelectionHeader({ children }: { children: string }) {
  return (
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: backgroundSecondary,
      }}>
      <Text style={{ fontWeight: 'bold' }}>{children}</Text>
    </View>
  );
}

function Item({ name, link, onPress }: Category & { onPress: (link: string) => void }) {
  return (
    <TouchableNativeFeedback onPress={() => onPress(link)}>
      <View style={{ padding: 16 }}>
        <Text>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

function getSections(categories: Category[], dict: (word: string) => string) {
  const sections: Record<string, Category[]> = {};

  categories.forEach(category => {
    const title = category.name.charAt(0).toUpperCase();
    if (!sections[title]) {
      sections[title] = [];
    }
    sections[title].push(category);
  });

  return [
    {
      title: dict('source'),
      data: [{ name: dict('sourceUrl'), link: dict('sourceUrl') }],
    },
    ...sort(
      Object.keys(sections).map(title => ({ title, data: sections[title] })),
    ),
  ];
}


const charMap = ' 0123456789AÁBCČDĎEÉĚFGHIÍJKLMNŇOÓPQRŘSŠTŤUÚŮVWXYÝZŽ';
function sort(data: { title: string, data: Category[] }[]) {
  return data.sort((a, b) => {
    const aIndex = charMap.indexOf(a.title);
    const bIndex = charMap.indexOf(b.title);

    return aIndex - bIndex;
  });
}
