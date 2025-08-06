import React from 'react';
import { View, Text } from 'react-native';

import { useLang, useDictionary } from '../services/language';
import { primaryText, secondaryText } from '../services/colors';

export default function LangSelect() {
  const { lang, langList, setLang } = useLang();
  const dict = useDictionary();
  return (
    <View style={{ flexDirection: 'row' }}>
      {langList.map(l => (
        <Text
          key={l}
          style={{ color: l === lang ? primaryText : secondaryText, padding: 8 }}
          onPress={() => setLang(l)}>
          {dict(l)}
        </Text>
      ))}
    </View>
  );
}
