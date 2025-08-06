import React, { useEffect, useState } from 'react';
import { View, Text, TouchableNativeFeedback, Linking } from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';

import { Content, H1, H2, Button } from '../components/Elements';

import { useDictionary, useLang } from '../services/language';

import { backgroundSecondary } from '../services/colors';
import {
  getRandomAdjective,
  getRandomGenre,
  getRandomNoun,
  getRandomPlace,
} from '../services/words';

export default function Generator() {
  const { lang } = useLang();
  const dict = useDictionary();

  const [adjective, setAdjective] = useState(() => getRandomAdjective(lang));
  const [genre, setGenre] = useState(() => getRandomNoun(lang));
  const [noun, setNoun] = useState(() => getRandomPlace(lang));
  const [place, setPlace] = useState(() => getRandomGenre(lang));

  return <Content>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexGrow: 10 }}>
        <H1>{dict('wordGenerator')}</H1>
      </View>
      <Button
        onPress={() => {
          setAdjective(getRandomAdjective(lang));
          setNoun(getRandomNoun(lang));
          setPlace(getRandomPlace(lang));
          setGenre(getRandomGenre(lang));
        }}>
        {dict('all')}
      </Button>
    </View>
    <View style={{ flexGrow: 1, justifyContent: 'space-around' }}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <H2>
            {dict('theme')}
          </H2>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button onPress={() => setAdjective(getRandomAdjective(lang))}>
              {dict('adjective')}
            </Button>
            <Button onPress={() => setNoun(getRandomNoun(lang))}>
              {dict('noun')}
            </Button>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flexGrow: 1, flexBasis: 100 }}><Word>{adjective}</Word></View>
          <View style={{ flexGrow: 1, flexBasis: 100 }}><Word>{noun}</Word></View>
        </View>
      </View>

      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <H2>
            {dict('place')}
          </H2>
          <Button style={{ flexGrow: 0 }} onPress={() => setPlace(getRandomPlace(lang))}>
            {dict('generatePlace')}
          </Button>
        </View>
        <Word>{place}</Word>
      </View>

      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <H2>
            {dict('genre')}
          </H2>
          <Button style={{ flexGrow: 0 }} onPress={() => setGenre(getRandomGenre(lang))}>
            {dict('generateGenre')}
          </Button>
        </View>
        <Word>{genre}</Word>
      </View>
    </View>
    <TouchableNativeFeedback
      onPress={() => Linking.openURL('https://github.com/ingSlonik/ImproApp')}>
      <Text>
        {dict('infoGenerator')} <Icon name="github" />
      </Text>
    </TouchableNativeFeedback>
  </Content >;
}

function Word({ children }: { children: string }) {
  return <View style={{
    backgroundColor: backgroundSecondary,
    borderRadius: 8,
    paddingTop: 2,
    paddingBottom: 4,
    marginTop: 8,
  }}>
    <Text style={{ fontSize: 25, textAlign: 'center' }}>{children}</Text>
  </View>;
}
