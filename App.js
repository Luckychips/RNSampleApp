/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar} from 'react-native';
import AppRoutes from './app/appRoutes';
import StartPage from './app/screen/start';
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppRoutes />
    </>
  );
};

export default App;
