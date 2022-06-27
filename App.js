/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NativeModules } from 'react-native';

const { HttpModule } = NativeModules;

const App = () => {
  React.useEffect(() => {
    HttpModule.get('http://192.168.0.102:8080/ping')
      .then((res) => {
        console.log(res);
      })
  }, [])
  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;
