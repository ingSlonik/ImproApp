/**
 * @format
 * @flow
 */

import React, {useState, useRef} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {WebView} from 'react-native-webview';

import {Fab} from '../components/Elements';

export default function Categories() {
  const webView = useRef(null);
  const [loading, setLoading] = useState(true);
  return (
    <View style={{flexGrow: 1, justifyContent: 'center'}}>
      {loading && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <WebView
        ref={webView}
        source={{
          uri: 'https://wiki.improliga.cz/wiki/Kategorie:Seznam_kategori%C3%AD',
        }}
        style={{flexGrow: 1, position: 'relative', zIndex: 1}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      <Fab
        icon="arrow-left"
        onPress={() => webView.current && webView.current.goBack()}
      />
    </View>
  );
}
