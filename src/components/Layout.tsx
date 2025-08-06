import React, { useState } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';

import Toolbar from './Toolbar';
import Navigation from './Navigation';

import { backgroundPrimary, primary } from '../services/colors';
import Generator from '../pages/Generator';
import Timer from '../pages/Timer';
import About from '../pages/About';
import Categories from '../pages/Categories';


export default function Layout() {
  const [page, setPage] = useState('generator');
  return <View style={{ flex: 1, backgroundColor: backgroundPrimary }}>

    <StatusBar barStyle="dark-content" backgroundColor={"transparent"} translucent={true} />
    <View style={{ height: StatusBar.currentHeight }} />

    <SafeAreaView style={{ flex: 1, alignItems: 'stretch' }}>
      <Toolbar />
      <View style={{ flexGrow: 1 }}>
        {page === 'generator' && <Generator />}
        {page === 'timer' && <Timer />}
        {page === 'categories' && <Categories />}
        {page === 'about' && <About />}
      </View>
      <Navigation active={page} onChange={setPage} />
    </SafeAreaView>
  </View>;
}
