import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import StartPage from '../screen/start';
import TabPage from '../screen/tabs';
import DetailBookInfoPage from '../screen/detail/BookInfo';
const AppRoutes = createStackNavigator({
    StartPage: {
        screen: StartPage,
        navigationOptions: ({navigation}) => ({
            headerShown: false,
        }),
    },
    TabPage: {
        screen: TabPage,
        navigationOptions: ({navigation}) => ({
            headerShown: false,
        }),
    },
    DetailBookInfoPage: {
        screen: DetailBookInfoPage
    }
});

export default createAppContainer(AppRoutes);