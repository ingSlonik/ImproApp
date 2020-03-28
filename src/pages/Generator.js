/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {View, Text, TouchableNativeFeedback, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Content, H1, H2, Button} from '../components/Elements';

import {useDictionary} from '../services/language';

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
            setAdjective(getRandomAdjective());
            setNoun(getRandomNoun());
            setPlace(getRandomPlace());
            setGenre(getRandomGenre());
          }}>
          {dict('all')}
        </Button>
      </View>
      <View style={{flexGrow: 1, justifyContent: 'space-around'}}>
        <View>
          <H2>
            {dict('theme')} ({getCountAdjectives()}, {getCountNouns()})
          </H2>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexGrow: 1, flexBasis: 100, alignItems: 'stretch'}}>
              <Button onPress={() => setAdjective(getRandomAdjective())}>
                {dict('adjective')}
              </Button>
              <Word>{adjective}</Word>
            </View>
            <View style={{width: 16}} />
            <View style={{flexGrow: 1, flexBasis: 100, alignItems: 'stretch'}}>
              <Button onPress={() => setNoun(getRandomNoun())}>
                {dict('noun')}
              </Button>
              <Word>{noun}</Word>
            </View>
          </View>
        </View>

        <View>
          <H2>
            {dict('place')} ({getCountPlaces()})
          </H2>
          <Button onPress={() => setPlace(getRandomPlace())}>
            {dict('generatePlace')}
          </Button>
          <Word>{place}</Word>
        </View>

        <View>
          <H2>
            {dict('genre')} ({getCountGenres()})
          </H2>
          <Button onPress={() => setGenre(getRandomGenre())}>
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
          Přátelé, sbírka slov není velká a už vůbec né ucelená. Když mi ji
          pomůžete dát dohromady, budu Vám velice vděčen.{' '}
          <Icon name="github-circle" />
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
