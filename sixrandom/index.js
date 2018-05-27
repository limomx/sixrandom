import { AppRegistry } from 'react-native';
import React, {Component} from 'react';
import {StyleSheet,View,  Text} from 'react-native';
import { StackNavigator,TabNavigator,NavigationActions,TabBarBottom } from 'react-navigation';

import DvinationPage from './src/DvinationPage';
import SixrandomHistoryPage from './src/SixrandomHistoryPage';
import SixrandomNewPage from './src/SixrandomNewPage';
import SixrandomFullInfoPage from './src/SixrandomFullInfoPage'
import SixrandomMainPage from './src/SixrandomMainPage'
import EightrandomMainPage from './src/EightrandomMainPage'
import EightrandomNewPage from './src/EightrandomNewPage';
import EightrandomHistoryPage from './src/EightrandomHistoryPage'


  const sixrandom = StackNavigator({
    DvinationPage: { screen: DvinationPage },
    SixrandomHistoryPage: { screen: SixrandomHistoryPage },
    SixrandomNewPage: {screen: SixrandomNewPage},
    SixrandomFullInfoPage: {screen: SixrandomFullInfoPage},
    SixrandomMainPage:{screen:SixrandomMainPage},
    EightrandomMainPage:{screen:EightrandomMainPage},
    EightrandomNewPage:{screen:EightrandomNewPage},
    EightrandomHistoryPage:{screen:EightrandomHistoryPage},
  });

AppRegistry.registerComponent('sixrandom', () => sixrandom);
