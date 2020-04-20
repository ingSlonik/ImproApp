/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {View, Text, TouchableNativeFeedback, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Content, H1, H2, Button} from '../components/Elements';

import {useDictionary, useLang} from '../services/language';

import {
  getRandomAdjective,
  getRandomGenre,
  getRandomNoun,
  getRandomPlace,
  getCountAdjectives,
  getCountGenres,
  getCountNouns,
  getCountPlaces,
} from '../services/words';

export default function Generator() {
  const {lang} = useLang();
  const dict = useDictionary();

  const [adjective, setAdjective] = useState('...');
  const [genre, setGenre] = useState('...');
  const [noun, setNoun] = useState('...');
  const [place, setPlace] = useState('...');

  return (
    <Content>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flexGrow: 10}}>
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
      <View style={{flexGrow: 1, justifyContent: 'space-around'}}>
        <View>
          <H2>
            {dict('theme')} ({getCountAdjectives(lang)}, {getCountNouns(lang)})
          </H2>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexGrow: 1, flexBasis: 100, alignItems: 'stretch'}}>
              <Button onPress={() => setAdjective(getRandomAdjective(lang))}>
                {dict('adjective')}
              </Button>
              <Word>{adjective}</Word>
            </View>
            <View style={{width: 16}} />
            <View style={{flexGrow: 1, flexBasis: 100, alignItems: 'stretch'}}>
              <Button onPress={() => setNoun(getRandomNoun(lang))}>
                {dict('noun')}
              </Button>
              <Word>{noun}</Word>
            </View>
          </View>
        </View>

        <View>
          <H2>
            {dict('place')} ({getCountPlaces(lang)})
          </H2>
          <Button onPress={() => setPlace(getRandomPlace(lang))}>
            {dict('generatePlace')}
          </Button>
          <Word>{place}</Word>
        </View>

        <View>
          <H2>
            {dict('genre')} ({getCountGenres(lang)})
          </H2>
          <Button onPress={() => setGenre(getRandomGenre(lang))}>
            {dict('generateGenre')}
          </Button>
          <Word>{genre}</Word>
        </View>
      </View>
      <TouchableNativeFeedback
        onPress={() =>
          Linking.openURL('https://github.com/ingSlonik/ImproApp')
        }>
        <Text>
          {dict('infoGenerator')} <Icon name="github-circle" />
        </Text>
      </TouchableNativeFeedback>
    </Content>
  );
}

function Word({children}) {
  return (
    <View style={{height: 30}}>
      <Text style={{fontSize: 25, textAlign: 'center'}}>{children}</Text>
    </View>
  );
}
