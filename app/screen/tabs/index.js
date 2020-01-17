import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FeedPage from './feed';
import ExplorePage from './explore';
import MyPage from './mypage';
const TabNavigator = createBottomTabNavigator({
    Feed: {
        screen: FeedPage,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return <Icon name="bell" size={24} color={'#1f1f1f'} />;
            },
        },
    },
    Explore: {
        screen: ExplorePage,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return <Icon name="search" size={24} color={'#1f1f1f'} />;
            },
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return <Icon name="user-nurse" size={24} color={'#1f1f1f'} />;
            },
        },
    },
},
{
    initialRouteName: 'Feed',
    tabBarOptions: {
        showLabel: false,
        // activeTintColor: '#000000',
        // inactiveTintColor: '#c8c8c8',
        style: {
            height: 50,
        },
    },
});

export default TabNavigator;