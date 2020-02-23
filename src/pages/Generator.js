/**
 * @format
 * @flow
 */

import React, {useState} from 'react';

import {View, Text} from 'react-native';

import {Content, H1, H2, Button} from '../components/Elements';

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
  const [adjective, setAdjective] = useState('...');
  const [genre, setGenre] = useState('...');
  const [noun, setNoun] = useState('...');
  const [place, setPlace] = useState('...');

  return (
    <Content>
      <H1>Generátor slov</H1>
      <View style={{flexGrow: 1, justifyContent: 'space-around'}}>
        <View>
          <H2>
            Téma ({getCountAdjectives()}, {getCountNouns()})
          </H2>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexGrow: 1, alignItems: 'stretch'}}>
              <Button onPress={() => setAdjective(getRandomAdjective())}>
                Přídavné jméno
              </Button>
              <Word>{adjective}</Word>
            </View>
            <View style={{width: 16}} />
            <View style={{flexGrow: 1, alignItems: 'stretch'}}>
              <Button onPress={() => setNoun(getRandomNoun())}>
                Podstatné jméno
              </Button>
              <Word>{noun}</Word>
            </View>
          </View>
        </View>

        <View>
          <H2>Místo ({getCountPlaces()})</H2>
          <Button onPress={() => setPlace(getRandomPlace())}>
            Generovat místo
          </Button>
          <Word>{place}</Word>
        </View>

        <View>
          <H2>Žánr ({getCountGenres()})</H2>
          <Button onPress={() => setGenre(getRandomGenre())}>
            Generovat žánr
          </Button>
          <Word>{genre}</Word>
        </View>
      </View>
      <Text>
        Přátelé, sbírka slov není velká a už vůbec né ucelená. Když mi ji
        pomůžete dát dohromady, budu Vám velice vděčen.
      </Text>
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
