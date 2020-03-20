import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BackButton from '../components/BackButton';
import StartPage from '../screen/start';
import TabPage from '../screen/tabs';
import DetailBookInfoPage from '../screen/detail/BookInfo';
import GoogleMapView from '../screen/detail/GoogleMapView';
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
        screen: DetailBookInfoPage,
        navigationOptions: ({navigation}) => ({
            title: navigation.state.params.bookTitle,
            headerLeft: () => {
                return <BackButton navigation={navigation} />;
            },
            headerTitleStyle: {
                width: 250
            }
        })
    },
    GoogleMapView: {
        screen: GoogleMapView,
        navigationOptions: ({navigation}) => ({
            title: 'Map',
            headerLeft: () => {
                return <BackButton navigation={navigation} />;
            },
            headerTitleStyle: {
                width: 250
            }
        })
    }
});

export default createAppContainer(AppRoutes);