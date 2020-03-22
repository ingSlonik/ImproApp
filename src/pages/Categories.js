/**
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  BackHandler,
  SectionList,
  TouchableNativeFeedback,
} from 'react-native';

import {WebView} from 'react-native-webview';

import {parse} from 'fast-html-parser';

type Category = {name: string, link: string};

export default function Categories() {
  const [url, setUrl] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  const categories = useCategoriesList();

  useEffect(() => {
    function backAction() {
      if (url !== null) {
        setUrl(null);
        return true;
      } else {
        return false;
      }
    }

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [url]);

  return (
    <View style={{flexGrow: 1, justifyContent: 'center'}}>
      {(categories === null || (url !== null && loading === true)) && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {categories !== null && url === null && (
        <SectionList
          // With height 50% fixed issues https://stackoverflow.com/questions/49570059/scroll-area-too-small-with-sectionlist-react-native
          style={{flexGrow: 1, height: '50%', position: 'relative', zIndex: 1}}
          stickySectionHeadersEnabled
          sections={getSections(categories)}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({item}) => (
            <Item {...item} onPress={link => setUrl(link)} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <SelectionHeader>{title}</SelectionHeader>
          )}
        />
      )}

      {url !== null && (
        <WebView
          // ref={webView}
          source={{uri: url}}
          style={{flexGrow: 1, position: 'relative', zIndex: 1}}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      )}
    </View>
  );
}

function SelectionHeader({children}: {children: string}) {
  return (
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: '#EEE',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#AAA',
      }}>
      <Text>{children}</Text>
    </View>
  );
}

function Item({name, link, onPress}: Category & {onPress: string => mixed}) {
  return (
    <TouchableNativeFeedback onPress={() => onPress(link)}>
      <View style={{padding: 16}}>
        <Text>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

function getSections(categories: Array<Category>) {
  const sections = {};

  categories.forEach(category => {
    const title = category.name.charAt(0);
    if (!sections[title]) {
      sections[title] = [];
    }
    sections[title].push(category);
  });

  return Object.keys(sections).map(title => ({title, data: sections[title]}));
}

function useCategoriesList(): null | Array<Category> {
  const [categories, setCategories] = useState<null | Array<Category>>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://wiki.improliga.cz/wiki/Kategorie:Seznam_kategori%C3%AD',
      );
      const responseText = await response.text();
      const root = parse(responseText);
      const links = root.querySelectorAll('#mw-pages .mw-category-group li a');

      setCategories(
        links.map(a => ({
          name: a.rawText,
          link: 'https://wiki.improliga.cz' + a.attributes.href,
        })),
      );
    })();
  }, []);

  return categories;
}
