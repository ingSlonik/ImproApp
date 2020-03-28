/**
 * @format
 * @flow
 */

import React, {type Node} from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LangSelect from './LangSelect';
import {primary, primaryText} from '../services/colors';

type ImproToolbarProps = {
  icon: 'menu' | 'arrow-left',
  onMenuClick: () => mixed,
};

export default function ImproToolbar({
  icon,
  onMenuClick,
}: ImproToolbarProps): Node {
  return (
    <View
      style={{
        height: 50,
        backgroundColor: primary,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#c3c3c3',
        borderBottomWidth: 1,
      }}>
      <TouchableNativeFeedback
        onPress={onMenuClick}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={{padding: 16}}>
          <Icon name={icon} color={primaryText} size={20} />
        </View>
      </TouchableNativeFeedback>

      <Text style={{color: primaryText, fontSize: 20, fontWeight: 'bold'}}>
        Impro App
      </Text>

      <View style={{flexGrow: 1}} />

      <LangSelect />
    </View>
  );
}
