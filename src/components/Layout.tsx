import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, SafeAreaView, Animated, useWindowDimensions } from 'react-native';

import Toolbar from './Toolbar';
import Navigation from './Navigation';

import { backgroundPrimary, primary } from '../services/colors';
import Generator from '../pages/Generator';
import Timer from '../pages/Timer';
import About from '../pages/About';
import Categories from '../pages/Categories';


export default function Layout() {
  const { width } = useWindowDimensions();

  const [page, setPage] = useState('generator');

  const animatedGenerator = useRef(new Animated.Value(1)).current;
  const animatedTimer = useRef(new Animated.Value(0)).current;
  const animatedCategories = useRef(new Animated.Value(0)).current;
  const animatedAbout = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedGenerator, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    Animated.timing(animatedTimer, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    Animated.timing(animatedCategories, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    Animated.timing(animatedAbout, { toValue: 0, duration: 300, useNativeDriver: true }).start();

    if (page === 'generator')
      Animated.timing(animatedGenerator, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    if (page === 'timer')
      Animated.timing(animatedTimer, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    if (page === 'categories')
      Animated.timing(animatedCategories, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    if (page === 'about')
      Animated.timing(animatedAbout, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, [page, width]);

  return <View style={{ flex: 1, backgroundColor: backgroundPrimary }}>

    <StatusBar barStyle="dark-content" backgroundColor={"transparent"} translucent={true} />
    <View style={{ height: StatusBar.currentHeight }} />

    <SafeAreaView style={{ flex: 1, alignItems: 'stretch' }}>
      <Toolbar />
      <View style={{ position: "relative", flexGrow: 1 }}>
        <Animated.View style={{ transform: [{ translateX: animatedGenerator.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) }], opacity: animatedGenerator, zIndex: page === "generator" ? 2 : 1, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: backgroundPrimary }}><Generator /></Animated.View>
        <Animated.View style={{ transform: [{ translateX: animatedTimer.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) }], opacity: animatedTimer, zIndex: page === "timer" ? 2 : 1, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: backgroundPrimary }}><Timer /></Animated.View>
        <Animated.View style={{ transform: [{ translateX: animatedCategories.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) }], opacity: animatedCategories, zIndex: page === "categories" ? 2 : 1, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: backgroundPrimary }}><Categories /></Animated.View>
        <Animated.View style={{ transform: [{ translateX: animatedAbout.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) }], opacity: animatedAbout, zIndex: page === "about" ? 2 : 1, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: backgroundPrimary }}><About /></Animated.View>
      </View>
      <Navigation active={page} onChange={setPage} />
    </SafeAreaView >
  </View >;
}
