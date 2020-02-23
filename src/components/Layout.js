/**
 * @format
 * @flow
 */

import React, {useRef} from 'react';
import {View, StatusBar, DrawerLayoutAndroid} from 'react-native';

import Toolbar from './Toolbar';
import Navigation from './Navigation';

import {primaryDark} from '../services/colors';

export default function Layout({children, onChange}) {
  const drawer = useRef(null);
  return (
    <>
      <StatusBar backgroundColor={primaryDark} barStyle="light-content" />
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={'left'}
        renderNavigationView={() => (
          <Navigation
            onChange={page => {
              drawer.current.closeDrawer();
              if (page) {
                onChange(page);
              }
            }}
          />
        )}>
        <View style={{flex: 1, alignItems: 'stretch'}}>
          <Toolbar
            icon="menu"
            onMenuClick={() => drawer.current.openDrawer()}
          />
          <View style={{flexGrow: 1}}>{children}</View>
        </View>
      </DrawerLayoutAndroid>
    </>
  );
}
