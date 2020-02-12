import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TAB_NAVIGATION_BAR_HEIGHT} from '../../constants';
import FeedPage from './feed';
import ExplorePage from './explore';
import MyPage from './mypage';
const TabNavigator = createBottomTabNavigator({
    Feed: {
        screen: FeedPage,
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                const color = focused ? '#1f1f1f' : '#efefef';
                return <Icon name="bell" size={24} color={color} />;
            },
        },
    },
    Explore: {
        screen: ExplorePage,
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                const color = focused ? '#1f1f1f' : '#efefef';
                return <Icon name="search" size={24} color={color} />;
            },
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                const color = focused ? '#1f1f1f' : '#efefef';
                return <Icon name="user-nurse" size={24} color={color} />;
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
            height: TAB_NAVIGATION_BAR_HEIGHT,
        },
    },
});

export default TabNavigator;