import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';

import Icon, { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';

import { useDictionary } from '../services/language';

import { backgroundSecondary, primary } from '../services/colors';

export default function Navigation({ active, onChange, }: {
  active: string,
  onChange: (page: string) => any,
}) {
  const dict = useDictionary();

  return <>
    <View style={{
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: backgroundSecondary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 5,
    }}>
      <NavItem
        active={active === 'generator'}
        icon="magnify"
        text={dict('wordGenerator')}
        onPress={() => onChange('generator')}
      />
      <NavItem
        active={active === 'timer'}
        icon="timer"
        text={dict('improvTimer')}
        onPress={() => onChange('timer')}
      />
      <NavItem
        active={active === 'categories'}
        icon="format-list-bulleted"
        text={dict('categoriesList')}
        onPress={() => onChange('categories')}
      />
      <NavItem
        active={active === "about"}
        icon="information"
        text={dict('aboutApp')}
        onPress={() => onChange('about')}
      />
    </View>
  </>;
}

function NavItem({ active, icon, text, onPress }: { active: boolean, icon: MaterialDesignIconsIconName, text: string, onPress: () => void }) {

  const animatedWidth = useRef(new Animated.Value(active ? 50 : 0)).current;

  // Efekt, který se spustí při každé změně `active` prop
  useEffect(() => {
    // Vytvoříme animaci
    Animated.timing(animatedWidth, {
      // Cílová hodnota šířky: 50, pokud je active, jinak 0
      toValue: active ? 50 : 0,
      // Délka animace v milisekundách
      duration: 300,
      // Umožní použití nativního driveru pro lepší výkon
      useNativeDriver: false,
    }).start();
  }, [active, animatedWidth]);

  return <Pressable onPress={onPress} >
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
      }}>
      <View style={{
        padding: 1,
        backgroundColor: backgroundSecondary,
        borderRadius: 13,
        width: 50,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Animated.View style={{
          backgroundColor: primary,
          width: animatedWidth, // Tady používáme animovanou šířku
          height: 26, // Výška je pevná
          borderRadius: 13,
          position: 'absolute', // Absolutní pozice, aby byla pod ikonkou
        }} />
        <Icon name={icon} size={26} />
      </View>
      <View style={{ padding: 1 }}>
        <Text style={{ fontWeight: active ? "bold" : 'normal', fontSize: 12 }}>{text}</Text>
      </View>
    </View>
  </Pressable>;
}
