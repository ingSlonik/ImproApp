
import React, { ReactNode } from 'react';
import {
  View,
  Text,
  Modal as ModalNative,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

import Icon, { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';

import {
  primary,
  primaryText,
  secondary,
  secondaryText,
} from '../services/colors';

export function Content({ children }: { children: ReactNode }): ReactNode {
  return (
    <View style={{ position: 'relative', flexGrow: 1, padding: 16 }}>
      {children}
    </View>
  );
}

export function H1({ children }: { children: ReactNode }): ReactNode {
  return (
    <View>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: primaryText }}>
        {children}
      </Text>
    </View>
  );
}

export function H2({ children }: { children: ReactNode }): ReactNode {
  return (
    <View>
      <Text style={{ fontSize: 25, color: primaryText }}>{children}</Text>
    </View>
  );
}

export function Button({ style, children, onPress, }: { style?: ViewStyle, children: ReactNode, onPress: () => void, }): ReactNode {

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={[{
          flexGrow: 1,
          borderRadius: 8,
          backgroundColor: primary,
          justifyContent: 'center',
          alignItems: 'center',
        }, style]}>
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

type FabProps = {
  icon: MaterialDesignIconsIconName,
  onPress: () => void,
};

export function Fab({ icon, onPress }: FabProps) {
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

type ModalProps = {
  show: boolean,
  title: string,
  button: string,
  children: ReactNode,
  onPress: () => void,
  onClose: () => void,
};

export function Modal({
  show,
  title,
  button,
  onPress,
  onClose,
  children,
}: ModalProps) {
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
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <H1>{title}</H1>
          <View style={{ marginTop: 16, marginBottom: 16 }}>{children}</View>
          <Button onPress={onPress}>{button}</Button>
        </View>
      </View>
    </ModalNative>
  );
}
