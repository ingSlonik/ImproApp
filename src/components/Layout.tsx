import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';

import Toolbar from './Toolbar';
import Navigation from './Navigation';

import { backgroundPrimary, primary } from '../services/colors';
import Generator from '../pages/Generator';
import Timer from '../pages/Timer';
import About from '../pages/About';
import Categories from '../pages/Categories';


export default function Layout() {
  const [page, setPage] = useState('generator');
  return <>
    <StatusBar backgroundColor={backgroundPrimary} barStyle="dark-content" />
    <View style={{ flex: 1, alignItems: 'stretch' }}>
      <Toolbar />
      <View style={{ flexGrow: 1 }}>
        {page === 'generator' && <Generator />}
        {page === 'timer' && <Timer />}
        {page === 'categories' && <Categories />}
        {page === 'about' && <About />}
      </View>
      <Navigation active={page} onChange={setPage} />
    </View>
  </>;
}
