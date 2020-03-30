/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {View, Text, TouchableNativeFeedback, Linking} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDictionary} from '../services/language';

import {Modal} from './Elements';
import Toolbar from './Toolbar';

export default function Navigation({
  onChange,
}: {
  onChange: (page: null | string) => mixed,
}) {
  const dict = useDictionary();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Toolbar icon="arrow-left" onMenuClick={() => onChange(null)} />
      <View style={{flexGrow: 1}}>
        <NavItem
          icon="magnify"
          text={dict('wordGenerator')}
          onPress={() => onChange('generator')}
        />
        <NavItem
          icon="timer"
          text={dict('improvTimer')}
          onPress={() => onChange('timer')}
        />
        <NavItem
          icon="format-list-bulleted"
          text={dict('categoriesList')}
          onPress={() => onChange('categories')}
        />
      </View>

      <View>
        <NavItem
          icon="information"
          text={dict('aboutApp')}
          onPress={() => setShowModal(true)}
        />

        <Modal
          show={showModal}
          title={dict('aboutApp')}
          onClose={() => setShowModal(false)}
          button={dict('ok')}
          onPress={() => setShowModal(false)}>
          <Text>
            {dict('about1')}{' '}
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://improliga.cz/')}>
              ImproLiga.cz
            </Text>
            .
          </Text>
          <Text style={{paddingTop: 16}}>{dict('about2')}</Text>
          <Text style={{paddingTop: 16}}>{dict('about3')}</Text>
          <NavItem
            icon="github-circle"
            text="GitHub"
            onPress={() =>
              Linking.openURL('https://github.com/ingSlonik/ImproApp')
            }
          />
        </Modal>

        <Text style={{padding: 16, textAlign: 'right', color: '#888'}}>
          Filip Paulů
        </Text>
      </View>
    </View>
  );
}

function NavItem({icon, text, onPress}) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View
        style={{
          margin: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{padding: 16}}>
          <Icon name={icon} size={26} />
        </View>
        <Text style={{fontWeight: 'bold'}}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
