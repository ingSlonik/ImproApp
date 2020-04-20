/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';

import {useLang, useDictionary} from '../services/language';

export default function LangSelect() {
  const {lang, langList, setLang} = useLang();
  const dict = useDictionary();
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
      {langList.map(l => (
        <Text
          key={l}
          style={{color: l === lang ? 'white' : 'black', padding: 8}}
          onPress={() => setLang(l)}>
          {dict(l)}
        </Text>
      ))}
    </View>
  );
}
