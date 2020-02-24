/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {View, Text, TouchableNativeFeedback, Linking} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Modal} from './Elements';
import Toolbar from './Toolbar';

export default function Navigation({onChange}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Toolbar icon="arrow-left" onMenuClick={() => onChange(null)} />
      <View style={{flexGrow: 1}}>
        <NavItem
          icon="magnify"
          text="Generátor slov"
          onPress={() => onChange('generator')}
        />
        <NavItem icon="timer" text="Stopky" onPress={() => onChange('timer')} />
        <NavItem
          icon="format-list-bulleted"
          text="Seznam kategorií"
          onPress={() => onChange('categories')}
        />
      </View>

      <View>
        <NavItem
          icon="information"
          text="O applikaci"
          onPress={() => setShowModal(true)}
        />

        <Modal
          show={showModal}
          title="O Impro App"
          onClose={() => setShowModal(false)}
          button="Rozumím"
          onPress={() => setShowModal(false)}>
          <Text>
            Tato aplikace je na světě díky nejstarší, nepřejmenované, nerozpadlé
            improvizační skupině nejvyšší improvizační soutěže v Čechách.
          </Text>
          <Text style={{paddingTop: 16}}>
            Nejdříve moc děkuji improlize, díky které zde máme seznam kategorií
            prostřednictvím Impro Wiki.
          </Text>
          <Text style={{paddingTop: 16}}>
            Dále bych chtěl poukázat na to, jak jsem cool. Tato applikace je
            zdarma a zcela bez reklam. Pokud by jste chtěli přispět na vývoj,
            dát zpětnou vazbu nebo něco doprogramovat, použíjte odkaz níže.
          </Text>
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