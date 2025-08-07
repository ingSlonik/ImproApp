import React, { useEffect, useState } from 'react';
import { View, Text, TouchableNativeFeedback, Linking, Pressable } from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';

import { Content, H1, H2, Button } from '../components/Elements';

import { useDictionary, useLang } from '../services/language';

import { backgroundSecondary, secondaryText } from '../services/colors';
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

  useEffect(() => {
    setAdjective(getRandomAdjective(lang));
    setNoun(getRandomNoun(lang));
    setPlace(getRandomPlace(lang));
    setGenre(getRandomGenre(lang));
  }, [lang]);

  return <Content>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexGrow: 10 }}>
        <H1>{dict('wordGenerator')}</H1>
      </View>
      <Button
        style={{ alignItems: "center" }}
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
        <H2>
          {dict('theme')}
        </H2>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flexGrow: 1, flexBasis: 100 }}><Word onPress={() => setAdjective(getRandomAdjective(lang))}>{adjective}</Word></View>
          <View style={{ flexGrow: 1, flexBasis: 100 }}><Word onPress={() => setNoun(getRandomNoun(lang))}>{noun}</Word></View>
        </View>
      </View>

      <View>
        <H2>
          {dict('place')}
        </H2>
        <Word onPress={() => setPlace(getRandomPlace(lang))}>{place}</Word>
      </View>

      <View>
        <H2>
          {dict('genre')}
        </H2>
        <Word onPress={() => setGenre(getRandomGenre(lang))}>{genre}</Word>
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

function Word({ children, onPress }: { children: string, onPress: () => void }) {
  return <Pressable onPress={onPress}>
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: backgroundSecondary,
      borderRadius: 8,
      paddingTop: 2,
      paddingBottom: 4,
      marginTop: 8,
    }}>
      <Text style={{ flexGrow: 1, fontSize: 25, textAlign: 'center' }}>{children}</Text>
      <View style={{ paddingHorizontal: 8 }}>
        <Icon name="repeat" size={20} color={secondaryText} />
      </View>
    </View>
  </Pressable>;
}
