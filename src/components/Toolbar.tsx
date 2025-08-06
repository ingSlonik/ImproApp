import React, { type ReactNode } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

import Icon from '@react-native-vector-icons/material-design-icons';

import LangSelect from './LangSelect';
import { primary, primaryText } from '../services/colors';

export default function ImproToolbar(): ReactNode {
  return (
    <View
      style={{
        height: 50,
        // backgroundColor: primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>

      <Text style={{ color: primaryText, fontSize: 20, fontWeight: 'bold' }}>
        Impro App
      </Text>

      <View style={{ flexGrow: 1 }} />

      <LangSelect />
    </View>
  );
}
