import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components';
const {width, height} = Dimensions.get('window');
const Container = styled.View`
  width: ${width}px;
  height: ${height}px;
  background-color: #99afd0;
`;
const StartPage = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1500);
    }, []);
    return <Container />;
};

export default StartPage;