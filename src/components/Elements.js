/**
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  Button as ButtonNative,
  Modal as ModalNative,
  TouchableNativeFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  primary,
  primaryText,
  secondary,
  secondaryText,
} from '../services/colors';

export function Content({children}) {
  return (
    <View style={{position: 'relative', flexGrow: 1, padding: 16}}>
      {children}
    </View>
  );
}

export function H1({children}) {
  return (
    <View>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: primaryText}}>
        {children}
      </Text>
    </View>
  );
}

export function H2({children}) {
  return (
    <View>
      <Text style={{fontSize: 25, color: primaryText}}>{children}</Text>
    </View>
  );
}

export function Button({children, onPress}) {
  // return <ButtonNative onPress={onPress} title={children} />;
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={{
          flexGrow: 1,
          borderRadius: 2,
          backgroundColor: primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: primaryText,
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}>
          {children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

export function Fab({icon, onPress}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          right: 32,
          bottom: 32,
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: secondary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={icon} color={secondaryText} size={25} />
      </View>
    </TouchableNativeFeedback>
  );
}

export function Modal({show, title, button, onPress, onClose, children}) {
  return (
    <ModalNative
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={onClose}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          padding: 32,
        }}>
        <View style={{backgroundColor: 'white', padding: 16, borderRadius: 8}}>
          <H1>{title}</H1>
          <View style={{marginTop: 16, marginBottom: 32}}>{children}</View>
          <Button onPress={onPress}>{button}</Button>
        </View>
      </View>
    </ModalNative>
  );
}
