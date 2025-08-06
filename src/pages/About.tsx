import React, { useState } from 'react';
import { View, Text, TouchableNativeFeedback, Linking, Pressable } from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';

import { Content, H1, H2, Button } from '../components/Elements';

import { useDictionary, useLang } from '../services/language';

import { version } from '../../package.json';

export default function About() {
  const { lang } = useLang();
  const dict = useDictionary();

  return <Content>
    <H1>{dict('aboutApp')}</H1>
    <View style={{ height: 16 }} />
    <Text>
      {dict('about1')}{' '}
      <Text
        style={{ color: 'blue' }}
        onPress={() => Linking.openURL('https://improliga.cz/')}>
        ImproLiga.cz
      </Text>
      .
    </Text>
    <Text style={{ paddingTop: 16 }}>{dict('about2')}</Text>
    <Text style={{ paddingTop: 16 }}>{dict('about3')}</Text>

    <Pressable onPress={() => Linking.openURL('https://github.com/ingSlonik/ImproApp')} >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
          paddingVertical: 10,
          gap: 5
        }}>
        <View style={{ padding: 1 }}>
          <Icon name="github" size={40} />
        </View>
        <View style={{ padding: 1 }}>
          <Text style={{ fontWeight: 'normal', }}>GitHub</Text>
        </View>
      </View>
    </Pressable>
    <View style={{ flex: 1 }} />
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{ color: '#888' }} onPress={() => Linking.openURL('https://paulu.cz')}>Filip Paulů</Text>
      <Text style={{ color: '#888' }}>v{version}</Text>
    </View>
  </Content>;
}
