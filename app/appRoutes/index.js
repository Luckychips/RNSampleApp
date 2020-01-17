import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import StartPage from '../screen/start';
import TabPage from '../screen/tabs';
const AppRoutes = createStackNavigator({
    StartPage: {
        screen: StartPage,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
    TabPage: {
        screen: TabPage,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
});

export default createAppContainer(AppRoutes);