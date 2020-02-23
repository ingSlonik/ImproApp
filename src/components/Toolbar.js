/**
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {primary, primaryText} from '../services/colors';

export default function ImproToolbar({children, icon, onMenuClick}) {
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
    </View>
  );
}
